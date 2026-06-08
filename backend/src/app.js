import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

import healthCheckRouter from "./route/healthCheck/healthCheck.route.js";
import userRouter from "./route/user/user.route.js";
import customerRouter from "./route/customer/customer.route.js";
import addressRouter from "./route/customer/address.route.js";
import wishlistRouter from "./route/customer/wishlist.route.js";
import cartRouter from "./route/customer/cart.route.js";
import cardRouter from "./route/customer/card.route.js";

const app = express();

//basic configuration----------------------------------------------------------------------------------------
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));

// cookie configuration --------------------------------------------------------------------------------------
app.use(cookieParser());

// cors configuration --------------------------------------------------------------------------------------
const allowedOrigins = ["http://localhost:5173", "http://localhost:5174/"];
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

app.use("/api/v1/health-check", healthCheckRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/customer", customerRouter);
app.use("/api/v1/customer/address", addressRouter);
app.use("/api/v1/customer/wishlist", wishlistRouter);
app.use("/api/v1/customer/cart", cartRouter);
app.use("/api/v1/customer/card", cardRouter);

export default app;
