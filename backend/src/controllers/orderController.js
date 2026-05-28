import crypto from "crypto";
import Razorpay from "razorpay";
import { pool } from "../config/db.js";
import { redis } from "../config/redis.js";
import { orderQueue } from "../config/queue.js";

const hasRazorpayConfig = Boolean(process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET);
const razorpay = hasRazorpayConfig
  ? new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    })
  : null;

const parseCart = (cart) => {
  if (!cart) return {};
  if (typeof cart === "string") return JSON.parse(cart);
  return cart;
};

const normalizeRequestItems = (items = []) =>
  items.map((item) => ({
    productId: String(item.productId || ""),
    name: String(item.name || "Ice cream item"),
    price: Number(item.price),
    quantity: Number(item.quantity),
    selectedFlavor: item.selectedFlavor || null,
    selectedToppings: Array.isArray(item.selectedToppings) ? item.selectedToppings : [],
  }));

const normalizeRedisItems = (cart) =>
  Object.values(cart).map((item) => ({
    productId: String(item.productId || ""),
    name: "Ice cream item",
    price: 100,
    quantity: Number(item.quantity),
    selectedFlavor: null,
    selectedToppings: [],
  }));

const calculateTotalPaise = (items, providedGrandTotal) => {
  if (Number.isFinite(Number(providedGrandTotal)) && Number(providedGrandTotal) > 0) {
    return Math.round(Number(providedGrandTotal) * 100);
  }

  return Math.round(
    items.reduce((sum, item) => sum + Number(item.price) * Number(item.quantity), 0) * 100
  );
};

const buildOrderPayload = ({ items, delivery, paymentMethod, totals }) => ({
  items,
  delivery: delivery || null,
  paymentMethod: paymentMethod || "razorpay",
  totals: totals || null,
});


// 🛒 CREATE ORDER
export const createOrder = async (req, res) => {
  try {
    const userId = req.user.id;
    const requestItems = Array.isArray(req.body.items)
      ? normalizeRequestItems(req.body.items)
      : [];

    let items = requestItems;

    if (items.length === 0) {
      const cart = parseCart(await redis.get(`cart:${userId}`));
      items = normalizeRedisItems(cart);
    }

    if (items.length === 0) {
      return res.status(400).json({ error: "Cart is empty" });
    }

    for (let item of items) {
      if (!item.productId || !Number.isFinite(item.price) || item.price <= 0) {
        return res.status(400).json({ error: "Invalid cart item" });
      }

      if (!Number.isInteger(item.quantity) || item.quantity <= 0) {
        return res.status(400).json({ error: "Invalid cart item" });
      }
    }

    const total = calculateTotalPaise(items, req.body.totals?.grandTotal);

    if (total <= 0) {
      return res.status(400).json({ error: "Invalid cart total" });
    }

    const paymentMethod = req.body.paymentMethod === "cod" ? "cod" : "razorpay";
    const orderPayload = buildOrderPayload({
      items,
      delivery: req.body.delivery,
      paymentMethod,
      totals: req.body.totals,
    });

    const result = await pool.query(
      `INSERT INTO orders (user_id, items, total)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [userId, JSON.stringify(orderPayload), total]
    );

    const order = result.rows[0];

    if (paymentMethod === "cod" || !razorpay) {
      return res.status(201).json({
        order,
        razorpayOrder: null,
        razorpayKeyId: null,
      });
    }

    const razorpayOrder = await razorpay.orders.create({
      amount: total,
      currency: "INR",
      receipt: `order_${order.id}`,
    });

    await pool.query(
      `UPDATE orders
       SET razorpay_order_id = $1
       WHERE id = $2`,
      [razorpayOrder.id, order.id]
    );

    res.json({
      order,
      razorpayOrder,
      razorpayKeyId: process.env.RAZORPAY_KEY_ID,
    });

  } catch (err) {
    res.status(500).json({ error: err.message || "Failed to create order" });
  }
};



// 🔐 VERIFY PAYMENT
export const verifyPayment = async (req, res) => {
  try {
    const userId = req.user.id;

    if (!process.env.RAZORPAY_KEY_SECRET) {
      return res.status(500).json({ error: "Razorpay secret is not configured" });
    }

    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    } = req.body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({ error: "Missing payment verification fields" });
    }

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({ error: "Invalid payment" });
    }

    const result = await pool.query(
      `UPDATE orders 
       SET status = 'paid', payment_id = $1 
       WHERE razorpay_order_id = $2
       AND user_id = $3
       AND status = 'pending'
       RETURNING id`,
      [razorpay_payment_id, razorpay_order_id, userId]
    );

    if (result.rows.length === 0) {
      return res.status(400).json({ error: "Order not found or already paid" });
    }

    const orderId = result.rows[0].id;

    await redis.del(`cart:${userId}`);

    // Offload post-checkout tasks (emails, etc) to BullMQ if configured
    if (orderQueue) {
      await orderQueue.add("sendOrderConfirmation", {
        userId,
        orderId,
      });
    } else {
      console.warn(`[orderController] orderQueue is null/unconfigured. Skipping background job for order ${orderId}`);
    }

    res.json({ message: "Payment successful" });

  } catch (err) {
    res.status(500).json({ error: "Payment verification failed" });
  }
};
