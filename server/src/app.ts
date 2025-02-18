import express, { Request, Response } from "express";
import eventRouter from "./routers/event-router";
import OrderRouter from "./routers/order-router";
import walletRouter from "./routers/wallet-router";
import userRouter from "./routers/user-router";
import authorization from "../src/routers/authorization-router";
import cors from "cors";
import cookieParser from "cookie-parser";
import eventStatistic from "../src/routers/event-statistic-router";

const app = express();
const PORT = 8000;

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

app.get(`/api/v1`, (req: Request, res: Response) => {
  res.status(200).json({ message: "Hello" });
});

app.use("/api/v1/events", eventRouter);
app.use("/api/v1/order", OrderRouter);
app.use("/api/v1/wallet", walletRouter);
app.use("/api/v1/user", userRouter);

app.use("/api/v1/", authorization);
app.use("/api/v1/", eventStatistic);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
