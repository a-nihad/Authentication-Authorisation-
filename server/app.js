import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import authRouter from "./routes/authRoute.js";
import userRouter from "./routes/userRoute.js";

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.use("/api", authRouter);
app.use("/api/users", userRouter);

export default app;
