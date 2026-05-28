import express from "express";
import {
  addToCart,
  getCart,
  removeFromCart,
  clearCart,
  syncCart,
} from "../controllers/cartController.js";

import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/add", authMiddleware, addToCart);
router.get("/", authMiddleware, getCart);
router.post("/remove", authMiddleware, removeFromCart);
router.delete("/clear", authMiddleware, clearCart);
router.post("/sync", authMiddleware, syncCart);

export default router;