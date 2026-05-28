import { useMemo, useState } from "react";
import { Link, useLocation } from "wouter";
import { motion } from "framer-motion";
import { ArrowLeft, Check, CreditCard, Home, MapPin, ShieldCheck, Truck } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { apiFetch } from "@/lib/api";

declare global {
  interface Window {
    Razorpay?: new (options: RazorpayOptions) => { open: () => void };
  }
}

interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  order_id: string;
  prefill: {
    name: string;
    email: string;
    contact: string;
  };
  notes: Record<string, string>;
  theme: {
    color: string;
  };
  handler: (response: RazorpayPaymentResponse) => void;
  modal: {
    ondismiss: () => void;
  };
}

interface RazorpayPaymentResponse {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}

interface CreateOrderResponse {
  order: {
    id: number;
    total: number;
  };
  razorpayOrder: {
    id: string;
    amount: number;
    currency: string;
  } | null;
  razorpayKeyId?: string;
}

type PaymentMethod = "razorpay" | "cod";

const loadRazorpay = () =>
  new Promise<boolean>((resolve) => {
    if (window.Razorpay) {
      resolve(true);
      return;
    }

    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });

function getSavedCheckoutTotals(total: number) {
  try {
    const saved = JSON.parse(sessionStorage.getItem("scoops_checkout") || "{}");
    if (saved?.totals) return saved.totals;
  } catch {
    // Ignore malformed session state and recalculate below.
  }

  const shipping = total > 300 ? 0 : 40;
  const tax = total * 0.05;
  return {
    subtotal: total,
    discount: 0,
    shipping,
    tax,
    grandTotal: total + shipping + tax,
  };
}

export default function Checkout() {
  const { items, total, clearCart } = useCart();
  const [, setLocation] = useLocation();
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("razorpay");
  const [submitting, setSubmitting] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    pincode: "",
    landmark: "",
    instructions: "",
  });

  const totals = useMemo(() => getSavedCheckoutTotals(total), [total]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm((current) => ({ ...current, [e.target.name]: e.target.value }));
    setError("");
  }

  async function verifyPayment(response: RazorpayPaymentResponse) {
    await apiFetch("/api/orders/verify", {
      method: "POST",
      auth: true,
      body: JSON.stringify(response),
    });
    clearCart();
    sessionStorage.removeItem("scoops_checkout");
    setOrderSuccess(true);
    setSubmitting(false);
  }

  async function handlePlaceOrder(e: React.FormEvent) {
    e.preventDefault();

    if (items.length === 0) {
      setLocation("/cart");
      return;
    }

    setSubmitting(true);
    setError("");

    try {
      const response = await apiFetch<CreateOrderResponse>("/api/orders/create", {
        method: "POST",
        auth: true,
        body: JSON.stringify({
          items: items.map((item) => ({
            productId: item.product.id,
            name: item.product.name,
            price: item.product.price,
            quantity: item.quantity,
            selectedFlavor: item.selectedFlavor,
            selectedToppings: item.selectedToppings,
          })),
          totals,
          delivery: form,
          paymentMethod,
        }),
      });

      if (paymentMethod === "cod" || !response.razorpayOrder) {
        clearCart();
        sessionStorage.removeItem("scoops_checkout");
        setOrderSuccess(true);
        setSubmitting(false);
        return;
      }

      if (!response.razorpayKeyId) {
        throw new Error("Razorpay test key is missing on the backend");
      }

      const loaded = await loadRazorpay();
      if (!loaded || !window.Razorpay) {
        throw new Error("Unable to load Razorpay checkout");
      }

      const checkout = new window.Razorpay({
        key: response.razorpayKeyId,
        amount: response.razorpayOrder.amount,
        currency: response.razorpayOrder.currency,
        name: "Scoops & Dreams",
        description: "Ice cream order payment",
        order_id: response.razorpayOrder.id,
        prefill: {
          name: form.fullName,
          email: form.email,
          contact: form.phone,
        },
        notes: {
          orderId: String(response.order.id),
          address: form.address,
        },
        theme: {
          color: "#e14d76",
        },
        handler: (paymentResponse) => {
          verifyPayment(paymentResponse).catch((err) => {
            setSubmitting(false);
            setError(err instanceof Error ? err.message : "Payment verification failed");
          });
        },
        modal: {
          ondismiss: () => {
            setSubmitting(false);
          },
        },
      });

      checkout.open();
    } catch (err) {
      setSubmitting(false);
      setError(err instanceof Error ? err.message : "Unable to place order");
    }
  }

  if (orderSuccess) {
    return (
      <main className="min-h-screen pt-20 flex items-center justify-center px-6" style={{ background: "hsl(40,60%,97%)" }}>
        <motion.div
          initial={{ scale: 0.94, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="max-w-md w-full rounded-[32px] border bg-white p-8 text-center shadow-xl"
          style={{ borderColor: "hsl(30,25%,92%)" }}
        >
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full text-white shadow-lg"
            style={{ background: "linear-gradient(135deg, hsl(165,50%,50%), hsl(165,50%,42%))" }}>
            <Check size={36} />
          </div>
          <h1 className="mb-3 font-serif text-3xl font-bold text-stone-850">Order Placed!</h1>
          <p className="mb-8 text-sm leading-relaxed text-stone-600">
            Your delivery details and payment status were sent to the backend. Your scoops are on the way.
          </p>
          <Link href="/menu">
            <button className="w-full rounded-full px-6 py-3.5 text-sm font-bold text-white shadow"
              style={{ background: "linear-gradient(135deg, hsl(340,65%,60%), hsl(340,65%,50%))" }}>
              Order More Scoops
            </button>
          </Link>
        </motion.div>
      </main>
    );
  }

  if (items.length === 0) {
    return (
      <main className="min-h-screen pt-20 flex items-center justify-center px-6" style={{ background: "hsl(40,60%,97%)" }}>
        <div className="text-center">
          <h1 className="mb-4 font-serif text-3xl font-bold text-stone-850">Your cart is empty</h1>
          <Link href="/menu">
            <span className="cursor-pointer text-sm font-bold text-rose-500">Back to menu</span>
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen pt-20 pb-16" style={{ background: "hsl(40,60%,97%)" }}>
      <div className="mx-auto max-w-6xl px-6 py-6">
        <Link href="/cart">
          <span className="mb-8 inline-flex cursor-pointer items-center gap-2 text-sm font-bold text-rose-500">
            <ArrowLeft size={16} /> Back to cart
          </span>
        </Link>

        <div className="mb-10">
          <span className="mb-3 inline-flex items-center gap-2 rounded-full border border-rose-200 bg-rose-50 px-3 py-1.5 text-xs font-bold uppercase tracking-widest text-rose-500">
            <ShieldCheck size={14} /> Secure Checkout
          </span>
          <h1 className="font-serif text-4xl font-bold text-stone-850">Delivery & Payment</h1>
        </div>

        <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_380px]">
          <div className="space-y-6">
            <section className="rounded-[28px] border bg-white p-6 shadow-sm" style={{ borderColor: "hsl(30,25%,92%)" }}>
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-rose-50 text-rose-500">
                  <MapPin size={20} />
                </div>
                <div>
                  <h2 className="font-serif text-xl font-bold text-stone-850">Where should we deliver?</h2>
                  <p className="text-xs text-stone-500">Add the details your delivery partner needs.</p>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <input name="fullName" value={form.fullName} onChange={handleChange} required placeholder="Full name"
                  className="rounded-2xl border bg-stone-50 px-4 py-3 text-sm outline-none" />
                <input name="phone" value={form.phone} onChange={handleChange} required placeholder="Phone number"
                  className="rounded-2xl border bg-stone-50 px-4 py-3 text-sm outline-none" />
                <input name="email" type="email" value={form.email} onChange={handleChange} required placeholder="Email"
                  className="rounded-2xl border bg-stone-50 px-4 py-3 text-sm outline-none sm:col-span-2" />
                <textarea name="address" value={form.address} onChange={handleChange} required placeholder="House number, street, area"
                  className="min-h-24 rounded-2xl border bg-stone-50 px-4 py-3 text-sm outline-none sm:col-span-2" />
                <input name="city" value={form.city} onChange={handleChange} required placeholder="City"
                  className="rounded-2xl border bg-stone-50 px-4 py-3 text-sm outline-none" />
                <input name="pincode" value={form.pincode} onChange={handleChange} required placeholder="PIN code"
                  className="rounded-2xl border bg-stone-50 px-4 py-3 text-sm outline-none" />
                <input name="landmark" value={form.landmark} onChange={handleChange} placeholder="Nearby landmark"
                  className="rounded-2xl border bg-stone-50 px-4 py-3 text-sm outline-none sm:col-span-2" />
                <textarea name="instructions" value={form.instructions} onChange={handleChange} placeholder="Delivery instructions"
                  className="min-h-20 rounded-2xl border bg-stone-50 px-4 py-3 text-sm outline-none sm:col-span-2" />
              </div>
            </section>

            <section className="rounded-[28px] border bg-white p-6 shadow-sm" style={{ borderColor: "hsl(30,25%,92%)" }}>
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-rose-50 text-rose-500">
                  <CreditCard size={20} />
                </div>
                <div>
                  <h2 className="font-serif text-xl font-bold text-stone-850">Payment method</h2>
                  <p className="text-xs text-stone-500">Razorpay test mode is supported.</p>
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                {[
                  { id: "razorpay", title: "Razorpay Test", body: "Cards, UPI, wallet, netbanking" },
                  { id: "cod", title: "Cash on Delivery", body: "Pay when your order arrives" },
                ].map((method) => (
                  <button
                    key={method.id}
                    type="button"
                    onClick={() => setPaymentMethod(method.id as PaymentMethod)}
                    className="rounded-2xl border p-4 text-left transition"
                    style={{
                      borderColor: paymentMethod === method.id ? "hsl(340,65%,60%)" : "hsl(30,25%,88%)",
                      background: paymentMethod === method.id ? "hsla(340,65%,60%,0.08)" : "hsl(38,55%,99%)",
                    }}
                  >
                    <div className="mb-1 font-bold text-stone-850">{method.title}</div>
                    <div className="text-xs text-stone-500">{method.body}</div>
                  </button>
                ))}
              </div>
            </section>
          </div>

          <aside className="space-y-6">
            <section className="rounded-[28px] border bg-white p-6 shadow-sm" style={{ borderColor: "hsl(30,25%,92%)" }}>
              <div className="mb-5 flex items-center gap-3">
                <Truck size={20} className="text-rose-500" />
                <h2 className="font-serif text-xl font-bold text-stone-850">Order review</h2>
              </div>

              <div className="max-h-64 space-y-3 overflow-auto pr-1">
                {items.map((item) => (
                  <div key={`${item.product.id}-${item.selectedFlavor}`} className="flex gap-3">
                    <img src={item.product.image} alt={item.product.name} className="h-14 w-14 rounded-2xl object-cover" />
                    <div className="min-w-0 flex-1">
                      <div className="truncate text-sm font-bold text-stone-850">{item.product.name}</div>
                      <div className="text-xs text-stone-500">Qty {item.quantity} / {item.selectedFlavor}</div>
                    </div>
                    <div className="text-sm font-bold text-stone-850">₹{(item.product.price * item.quantity).toFixed(0)}</div>
                  </div>
                ))}
              </div>

              <div className="mt-6 space-y-3 border-t pt-5 text-sm" style={{ borderColor: "hsl(30,25%,92%)" }}>
                <div className="flex justify-between text-stone-500"><span>Subtotal</span><span>₹{totals.subtotal.toFixed(2)}</span></div>
                <div className="flex justify-between text-stone-500"><span>Discount</span><span>-₹{totals.discount.toFixed(2)}</span></div>
                <div className="flex justify-between text-stone-500"><span>Delivery</span><span>{totals.shipping === 0 ? "FREE" : `₹${totals.shipping.toFixed(2)}`}</span></div>
                <div className="flex justify-between text-stone-500"><span>GST</span><span>₹{totals.tax.toFixed(2)}</span></div>
                <div className="flex justify-between pt-3 font-serif text-xl font-black text-stone-850">
                  <span>Total</span><span className="text-rose-500">₹{totals.grandTotal.toFixed(2)}</span>
                </div>
              </div>

              {error && (
                <div className="mt-5 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-xs font-semibold text-rose-600">
                  {error}
                </div>
              )}

              <motion.button
                type="submit"
                disabled={submitting}
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-full px-6 py-4 text-sm font-bold text-white shadow-lg disabled:opacity-70"
                style={{
                  background: "linear-gradient(135deg, hsl(340,65%,60%), hsl(340,65%,50%))",
                  boxShadow: "0 8px 25px hsla(340,65%,60%,0.3)",
                }}
                whileHover={{ scale: submitting ? 1 : 1.03 }}
                whileTap={{ scale: submitting ? 1 : 0.97 }}
              >
                <Home size={16} />
                {submitting ? "Processing..." : paymentMethod === "razorpay" ? "Pay with Razorpay" : "Place Order"}
              </motion.button>
            </section>
          </aside>
        </form>
      </div>
    </main>
  );
}
