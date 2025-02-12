import { Request, Response, NextFunction } from "express";
import prisma from "../configs/prisma";
export async function CreateOrder(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const createOrder = await prisma.order.create({
      data: {
        totalPrice: req.body.totalPrice,
        totalTicket: req.body.totalTicket,
        userId: req.body.userId,
        eventId: req.body.eventId,
      },
    });
    res.status(201).json({ ok: true, data: createOrder });
  } catch (error) {
    next(error);
  }
}
