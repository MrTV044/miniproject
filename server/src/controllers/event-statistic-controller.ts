import { Response, Request, NextFunction } from "express";
import prisma from "../configs/prisma";

export async function GetOrganizerEvents(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    console.log("hit");
    if (!req.user) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const { id } = req.user;

    if (!id) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    const userEvents = await prisma.event.findMany({
      where: { organizerId: id },
    });

    const userOrders = await prisma.order.findMany({
      where: { userId: id },
      include: {
        event: {
          include: {
            Organizer: true,
          },
        },
      },
    });

    res.status(200).json({ ok: true, data: { userEvents, userOrders } });
  } catch (error) {
    console.error(error);
  }
}
