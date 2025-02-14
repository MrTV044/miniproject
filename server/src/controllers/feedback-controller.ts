import { Request, Response, NextFunction } from "express";
import prisma from "../configs/prisma";
import { date } from "zod";

export async function addFeedback(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { userId, eventId, rating, comment } = req.body;

  try {
    // Cek apakah event dan user ada
    const event = await prisma.event.findUnique({ where: { id: eventId } });
    const user = await prisma.user.findUnique({ where: { id: userId } });

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Tambahkan review

    const feedBack = await prisma.feedBack.create({
      data: {
        rating,
        review: comment, // Fixed: replaced 'review' with 'comment'//+
        userId,
        eventId,
      },
    });

    return res.status(201).json({ ok: true, date: feedBack });
  } catch (error) {
    next(error);
  }
}

export async function getFeedback(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { eventId } = req.params;

  try {
    const reviews = await prisma.feedBack.findMany({
      where: { eventId: Number(eventId) },
      include: { User: true }, // Untuk mendapatkan informasi pengguna
    });

    return res.status(200).json(reviews);
  } catch (error) {
    next(error);
  }
}
