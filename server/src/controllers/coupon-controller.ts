import { Response, Request, NextFunction } from "express";
import prisma from "../configs/prisma";

export async function postCoupon(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { code, userId, expirationDate, discount } = req.body;

    const coupon = await prisma.coupon.create({
      data: {
        discount,
        code,
        userId,
        expirationDate,
      },
    });
    res.status(201).json({ ok: true, data: coupon });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "general error" });
  }
}
