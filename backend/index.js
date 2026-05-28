// index.js
import "./src/config/env.js";   // ← FIRST
import "./src/config/db.js";
import "./src/config/redis.js";
import "./src/workers/orderWorker.js"; // Initialize background queue worker
import express from "express";
import cors from "cors";
import authRoutes from "./src/routes/auth.js";
import productRoutes from "./src/routes/products.js";
import cartRoutes from "./src/routes/cart.js";
import orderRoutes from "./src/routes/order.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);

app.get("/", (req, res) => res.send("API is running 🚀"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));