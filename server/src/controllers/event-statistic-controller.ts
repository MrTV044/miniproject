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

    const response = await prisma.event.findMany({
      where: {
        organizerId: id,
      },
      include: {
        Organizer: {
          where: {
            id: id,
          },
        },
        Order: {
          where: {
            userId: id,
          },
        },
      },
    });

    const organizerOrders = response.map((event) => {
      return {
        id: event.id,
        eventImage: event.image,
        eventName: event.name,
        price: event.prices.toLocaleString(),
        date: event.date,
        totalSingleEventRevenue: (
          event.prices * event.ticketSold
        ).toLocaleString(),
        totalTicketSold: event.ticketSold,
      };
    });

    // const response = await prisma.order.findMany({
    //   where: { userId: id },
    //   include: {
    //     event: {
    //       include: {
    //         Organizer: true,
    //       },
    //     },
    //   },
    // });

    // const organizerOrders = response.map((order) => {

    //   return{
    //     id: order.id,
    //     eventImage: order.event.image,
    //     eventName: order.event.name,
    //     price: order.event.prices,
    //     date: order.event.date,
    //     totalSingleEventRevenue: order.event.prices * order.totalTicket,
    //     totalTicketSold: order.event.ticketSlot - order.totalTicket,
    //   }
    // });

    res.status(200).json({ ok: true, data: organizerOrders });
  } catch (error) {
    console.error(error);
  }
}
