import { useState } from "react";
import { Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Trash2, ShoppingBag, Plus, Minus, Check, ArrowRight, AlertCircle } from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function Cart() {
  const { items, updateQty, removeItem, total } = useCart();
  const [promo, setPromo] = useState("");
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);
  const [discount, setDiscount] = useState(0);
  const [promoError, setPromoError] = useState("");
  const [, setLocation] = useLocation();

  const shipping = total > 300 ? 0 : 40.00;
  const tax = total * 0.05;
  const grandTotal = total - discount + shipping + tax;

  function handleApplyPromo() {
    setPromoError("");
    const code = promo.toUpperCase().trim();
    if (code === "SWEETHOUSE") {
      setDiscount(total * 0.2); // 20% Off
      setAppliedPromo("SWEETHOUSE (20% OFF)");
      setPromo("");
    } else if (code === "SUMMERSPLASH") {
      setDiscount(50.00); // ₹50 Off
      setAppliedPromo("SUMMERSPLASH (₹50.00 OFF)");
      setPromo("");
    } else {
      setPromoError("Invalid discount code");
    }
  }

  async function handleCheckout() {
    const token = localStorage.getItem("scoops_token");
    if (!token) {
      alert("Please sign in to complete your checkout.");
      setLocation("/login");
      return;
    }

    sessionStorage.setItem(
      "scoops_checkout",
      JSON.stringify({
        promo: appliedPromo,
        totals: { subtotal: total, discount, shipping, tax, grandTotal },
      }),
    );
    setLocation("/checkout");
  }

  if (items.length === 0) {
    return (
      <main className="min-h-screen pt-20 flex flex-col items-center justify-center px-6" style={{ background: "hsl(40,60%,97%)" }}>
        <div className="text-center">
          <div className="text-6xl mb-6">🍦</div>
          <h1 className="font-serif text-3xl font-bold mb-3" style={{ color: "hsl(20,25%,18%)" }}>Your cart is empty</h1>
          <p className="text-sm max-w-sm mx-auto mb-8 font-sans" style={{ color: "hsl(20,15%,45%)" }}>
            Looks like you haven't added any handcrafted dreams to your cart yet.
          </p>
          <Link href="/menu">
            <motion.button 
              className="px-8 py-3.5 rounded-full text-sm font-bold text-white flex items-center gap-2 mx-auto shadow"
              style={{ background: "linear-gradient(135deg, hsl(340,65%,60%), hsl(340,65%,50%))", boxShadow: "0 4px 15px hsla(340,65%,60%,0.25)" }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Explore Our Menu <ArrowRight size={16} />
            </motion.button>
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen pt-20 pb-16" style={{ background: "hsl(40,60%,97%)" }}>
      <div className="max-w-6xl mx-auto px-6 py-6">
        <h1 className="font-serif text-4xl font-bold mb-10" style={{ color: "hsl(20,25%,18%)" }}>Your Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
          
          {/* Items List */}
          <div className="lg:col-span-2 space-y-4">
            <AnimatePresence>
              {items.map((item, idx) => (
                <motion.div 
                  key={item.product.id + item.selectedFlavor + idx}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="p-5 rounded-3xl border shadow-sm flex flex-col sm:flex-row items-center gap-5 bg-white"
                  style={{ borderColor: "hsl(30,25%,92%)" }}
                >
                  <img src={item.product.image} alt={item.product.name} className="w-20 h-20 rounded-2xl object-cover" />
                  <div className="flex-1 text-center sm:text-left">
                    <h3 className="font-serif font-bold text-base" style={{ color: "hsl(20,25%,18%)" }}>{item.product.name}</h3>
                    <div className="flex flex-wrap items-center justify-center sm:justify-start gap-1.5 mt-1.5">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                        style={{ background: "hsla(340,65%,60%,0.1)", color: "hsl(340,65%,50%)" }}>{item.selectedFlavor}</span>
                      {item.selectedToppings.map(t => (
                        <span key={t} className="text-[10px] px-2 py-0.5 rounded-full bg-stone-100 text-stone-600 font-medium">{t}</span>
                      ))}
                    </div>
                  </div>
                  
                  {/* Quantity Actions */}
                  <div className="flex items-center gap-3 px-3 py-1.5 rounded-full border" style={{ borderColor: "hsl(30,25%,88%)" }}>
                    <button 
                      onClick={() => updateQty(item.product.id, item.quantity - 1, item.selectedFlavor)}
                      className="text-stone-500 hover:text-rose-500 transition-colors p-1"
                    >
                      <Minus size={12} />
                    </button>
                    <span className="text-sm font-bold w-6 text-center" style={{ color: "hsl(20,25%,18%)" }}>{item.quantity}</span>
                    <button 
                      onClick={() => updateQty(item.product.id, item.quantity + 1, item.selectedFlavor)}
                      className="text-stone-500 hover:text-rose-500 transition-colors p-1"
                    >
                      <Plus size={12} />
                    </button>
                  </div>

                  <div className="text-right flex sm:flex-col items-center sm:items-end justify-between sm:justify-center w-full sm:w-auto gap-4 sm:gap-1">
                    <span className="font-bold text-sm" style={{ color: "hsl(20,25%,18%)" }}>
                      ₹{(item.product.price * item.quantity).toFixed(2)}
                    </span>
                    <button 
                      onClick={() => removeItem(item.product.id, item.selectedFlavor)}
                      className="p-2 rounded-full text-stone-400 hover:text-rose-500 hover:bg-rose-50 transition-all active:scale-90"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Checkout Panel */}
          <div className="space-y-6">
            
            {/* Promo Code Input */}
            <div className="p-6 rounded-3xl border shadow-sm" style={{ background: "hsl(38,55%,99%)", borderColor: "hsl(30,25%,92%)" }}>
              <h3 className="font-serif font-bold text-lg mb-4" style={{ color: "hsl(20,25%,18%)" }}>Promo Code</h3>
              {appliedPromo ? (
                <div className="p-3 rounded-2xl flex items-center justify-between border text-xs"
                  style={{ background: "hsla(165,50%,50%,0.08)", borderColor: "hsl(165,50%,70%)", color: "hsl(165,50%,35%)" }}>
                  <div className="flex items-center gap-1.5 font-semibold">
                    <Check size={14} /> Code Applied: {appliedPromo}
                  </div>
                  <button 
                    onClick={() => {
                      setAppliedPromo(null);
                      setDiscount(0);
                    }}
                    className="underline text-stone-500 hover:text-rose-500 font-bold"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <div className="space-y-2">
                  <div className="flex gap-2">
                    <input 
                      type="text" 
                      placeholder="SWEETHOUSE / SUMMERSPLASH" 
                      value={promo} 
                      onChange={e => {
                        setPromo(e.target.value);
                        setPromoError("");
                      }}
                      className="flex-1 px-4 py-2.5 rounded-xl text-xs outline-none border bg-stone-50 uppercase font-mono"
                      style={{ borderColor: "hsl(30,25%,88%)" }}
                    />
                    <button 
                      onClick={handleApplyPromo}
                      className="px-4 py-2.5 rounded-xl text-xs font-bold text-white shadow-sm"
                      style={{ background: "linear-gradient(135deg, hsl(340,65%,60%), hsl(340,65%,50%))" }}
                    >
                      Apply
                    </button>
                  </div>
                  {promoError && (
                    <div className="text-[10px] text-rose-500 font-semibold flex items-center gap-1">
                      <AlertCircle size={10} /> {promoError}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Price Calculations */}
            <div className="p-6 rounded-[32px] border shadow-sm bg-white" style={{ borderColor: "hsl(30,25%,92%)" }}>
              <h3 className="font-serif font-bold text-xl mb-6" style={{ color: "hsl(20,25%,18%)" }}>Order Summary</h3>
              
              <div className="space-y-4 text-sm mb-6 border-b pb-6" style={{ borderColor: "hsl(30,25%,94%)" }}>
                <div className="flex justify-between" style={{ color: "hsl(20,15%,45%)" }}>
                  <span>Subtotal</span>
                  <span className="font-semibold text-stone-800">₹{total.toFixed(2)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-emerald-600 font-medium">
                    <span>Discount</span>
                    <span>-₹{discount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between" style={{ color: "hsl(20,15%,45%)" }}>
                  <span>Estimated Shipping</span>
                  <span className="font-semibold text-stone-800">
                    {shipping === 0 ? "FREE" : `₹${shipping.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between" style={{ color: "hsl(20,15%,45%)" }}>
                  <span>Estimated GST (5%)</span>
                  <span className="font-semibold text-stone-800">₹{tax.toFixed(2)}</span>
                </div>
              </div>

              <div className="flex justify-between items-baseline mb-8">
                <span className="font-serif text-base font-bold text-stone-800">Total Price</span>
                <span className="text-2xl font-black" style={{ color: "hsl(340,65%,55%)" }}>
                  ₹{grandTotal.toFixed(2)}
                </span>
              </div>

              <motion.button 
                onClick={handleCheckout}
                className="w-full py-4 rounded-full text-sm font-bold text-white shadow-lg flex items-center justify-center gap-2"
                style={{ 
                  background: "linear-gradient(135deg, hsl(340,65%,60%), hsl(340,65%,50%))", 
                  boxShadow: "0 8px 25px hsla(340,65%,60%,0.3)" 
                }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <ShoppingBag size={16} /> Continue to Checkout
              </motion.button>
            </div>

          </div>

        </div>
      </div>
    </main>
  );
}
