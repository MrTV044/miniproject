import { Response, Request, NextFunction } from "express";
import prisma from "../configs/prisma";

export async function GetOrganizerEventsandOrders(
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

    const response = await prisma.event.findMany({
      where: {
        organizerId: id,
      },
      include: {
        Organizer: true,
        Order: true,
      },
    });

    console.log(response);

    const organizerOrders = response.map((event) => {
      return {
        id: event.id,
        eventImage: event.image,
        eventName: event.name,
        price: event.prices,
        date: event.date,
        totalSingleEventRevenue: event.prices * event.ticketSold,
        totalTicketSold: event.ticketSold,
      };
    });

    res.status(200).json({ ok: true, data: organizerOrders });
  } catch (error) {
    console.error(error);
  }
}
