import express, { Request, Response } from "express";
import prisma from "./configs/prisma";

const app = express();
const PORT = 8000;

app.use(express.json());

app.get(`/api/v1`, (req: Request, res: Response) => {
  res.status(200).json({ message: "Hello" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
