import express, { Request, Response } from "express";
import eventRouter from "./routers/event-router";
import orderRouter from "./routers/order-router";
import walletRouter from "./routers/wallet-router";
import authorization from "../src/routers/authorization-router";
import cors from "cors";
import cookieParser from "cookie-parser";
import eventStatistic from "../src/routers/event-statistic-router";
import coupon from "../src/routers/coupon-router";
// import transactiondummy from "../src/routers/transaction-dummy-router";

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
app.use("/api/v1/order", orderRouter);
app.use("/api/v1/wallet", walletRouter);

app.use("/api/v1/", authorization);
app.use("/api/v1/", eventStatistic);
app.use("/api/v1/", coupon);
// app.use("/api/v1/", transactiondummy);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
