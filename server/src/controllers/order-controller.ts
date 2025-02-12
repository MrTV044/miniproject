import { Request, Response, NextFunction } from "express";
import prisma from "../configs/prisma";

export async function getOrder(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const order = await prisma.order.findUnique({
      where: { id: +req.params.id },
    });

    res.status(200).json({ ok: true, data: order });
  } catch (error) {
    next(error);
  }
}

export async function CreateOrder(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { totalPrice, totalTicket, userId, eventId } = req.body;

    const createOrder = await prisma.order.create({
      data: {
        totalPrice: totalPrice,
        totalTicket: totalTicket,
        userId: userId,
        eventId: eventId,
      },
    });
    res.status(201).json({ ok: true, data: createOrder });
  } catch (error) {
    next(error);
  }
}
