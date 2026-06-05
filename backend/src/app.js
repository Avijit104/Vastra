import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

import healthCheckRouter from "./route/healthCheck/healthCheck.route.js";
import userRouter from "./route/user/user.route.js";

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

export default app;
