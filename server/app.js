import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import router from "./routes/userRoute.js";

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.use("/api", router);

export default app;
