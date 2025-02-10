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

export async function postPoint(req: Request, res: Response) {
  try {
    const { userId } = req.body;
    const date = new Date();
    const coupon = await prisma.coupon.create({
      data: {
        discount: 10000,
        code: `${Math.random()}`,
        userId: userId,
        expirationDate: new Date(date.setMonth(date.getMonth() + 3)),
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "general error" });
  }
}

export async function userPatch(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { email, coupon } = req.body;

    const user = await prisma.user.update({
      where: { email: email },
      data: { Coupon: coupon },
    });
    res.status(200).json({ ok: true, data: user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "general error" });
  }
}
