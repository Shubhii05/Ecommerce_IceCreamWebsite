import { redis } from "../config/redis.js";

// 🔹 Helper (DRY fix for all)
const parseCart = (cart) => {
  if (!cart) return {};
  if (typeof cart === "string") return JSON.parse(cart);
  return cart;
};

// ADD TO CART
export const addToCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId, quantity } = req.body;

    const key = `cart:${userId}`;

    let cart = parseCart(await redis.get(key));

    if (cart[productId]) {
      cart[productId].quantity += quantity;
    } else {
      cart[productId] = { productId, quantity };
    }

    await redis.set(key, JSON.stringify(cart));

    res.json(cart);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET CART
export const getCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const key = `cart:${userId}`;

    let cart = parseCart(await redis.get(key));

    res.json(cart);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// REMOVE ITEM
export const removeFromCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId } = req.body;

    const key = `cart:${userId}`;

    let cart = parseCart(await redis.get(key));

    delete cart[productId];

    await redis.set(key, JSON.stringify(cart));

    res.json(cart);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// CLEAR CART
export const clearCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const key = `cart:${userId}`;

    await redis.del(key);

    res.json({ message: "Cart cleared" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// SYNC CART
export const syncCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const { items } = req.body;
    const key = `cart:${userId}`;

    await redis.set(key, JSON.stringify(items));
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};