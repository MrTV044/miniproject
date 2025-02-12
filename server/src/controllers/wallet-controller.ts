import { Request, Response, NextFunction } from "express";
import prisma from "../configs/prisma";

export async function GetWallet(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const wallet = await prisma.wallet.findUnique({
      where: { id: +req.params.id },
    });

    res.status(200).json({ ok: true, data: wallet });
  } catch (error) {
    next(error);
  }
}

export async function TopUpWallet(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { credit, userId } = req.body;

    const CreateWallet = await prisma.wallet.update({
      where: { userId: userId },
      data: {
        credit: +credit,
        userId: +userId,
      },
    });

    res.status(200).json({ ok: true, data: credit });
  } catch (error) {
    next(error);
  }
}
