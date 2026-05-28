import express from "express";
import { createOrder, verifyPayment } from "../controllers/orderController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/create", authMiddleware, createOrder);
router.post("/verify", authMiddleware, verifyPayment);

export default router;