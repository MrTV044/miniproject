import express, { Request, Response } from "express";
import eventRouter from "./routers/event-router";

const app = express();
const PORT = 8000;

app.use(express.json());

app.get(`/api/v1`, (req: Request, res: Response) => {
  res.status(200).json({ message: "Hello" });
});

app.use("/api/v1/events", eventRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
