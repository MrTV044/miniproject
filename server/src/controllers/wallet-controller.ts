import { Request, Response, NextFunction } from "express";
import prisma from "../configs/prisma";

export async function GetWallet(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const walletId = +req.params.id; // Mengambil id dari params dan mengubahnya menjadi angka

    // Validasi id
    if (isNaN(walletId) || walletId <= 0) {
      res.status(400).json({ ok: false, message: "Invalid wallet ID" });
      return;
    }

    const wallet = await prisma.wallet.findUnique({
      where: { id: walletId }, // Menggunakan walletId yang sudah divalidasi
    });

    if (!wallet) {
      res.status(404).json({ ok: false, message: "Wallet not found" });
      return;
    }

    res.status(200).json({ ok: true, data: wallet });
  } catch (error) {
    next(error);
  }
}

export async function TopUpWallet(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const { credit, userId } = req.body;

    // Validasi input
    if (!credit || !userId) {
      res
        .status(400)
        .json({ ok: false, message: "Credit and userId are required" });
      return;
    }

    const wallet = await prisma.wallet.update({
      where: { userId: userId },
      data: {
        balance: {
          increment: +credit, // Menggunakan increment untuk menambah saldo
        },
      },
    });

    res.status(200).json({ ok: true, data: wallet });
  } catch (error) {
    next(error);
  }
}
