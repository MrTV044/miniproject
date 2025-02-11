import { Response, Request, NextFunction } from "express";
import prisma from "../configs/prisma";

export async function GetDummyTransactions(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const userId = Number(req.params.userId);
    const transactions = await prisma.dummytransactions.findMany({
      where: {
        userId,
      },
    });

    res.status(200).json({ ok: true, data: transactions });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "general error" });
  }
}
