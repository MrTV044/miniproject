import express, { Request, Response } from "express";
import prisma from "./configs/prisma";
import authorization from "../src/routers/authorization-router";
import cors from "cors";

const app = express();
const PORT = 8000;

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
app.use(express.json());

app.get(`/api/v1`, (req: Request, res: Response) => {
  res.status(200).json({ message: "Hello" });
});

app.post("/testing", (req, res) => {
  console.log(req.body);
  res.json({ message: "Hello" });
});

app.use("/api/v1/", authorization);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
