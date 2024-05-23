import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import authRouter from "./routes/authRoute.js";
import userRouter from "./routes/userRoute.js";

const app = express();

// MIDDLEWARES
app.use(cors());
app.use(express.json());
app.use(cookieParser());

// ROUTES
app.use("/api", authRouter);
app.use("/api/users", userRouter);

// GLOBAL ERROR HANDLING MIDDLEWARE
app.use((err, req, res, next) => {
  err.stausCode = err.statusCode || 500;
  err.status = err.status || "error";

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
});

export default app;
