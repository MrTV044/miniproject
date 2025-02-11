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
    console.log(id);
    const userEvents = await prisma.event.findMany({
      where: { organizerId: id },
    });

    if (!userEvents) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    res.status(200).json({ ok: true, data: userEvents });
  } catch (error) {
    console.error(error);
  }
}

export async function GetOrganizerOrder(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    if (!req.user) {
      res.status(404);
      return;
    }

    const { id } = req.user;
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
    res.status(200).json({ ok: true, data: userOrders });
  } catch (error) {
    console.error(error);
  }
}
