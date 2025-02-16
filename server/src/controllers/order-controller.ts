import { Request, Response, NextFunction } from "express";
import prisma from "../configs/prisma";
import { date } from "zod";

export async function getAllOrder(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const order = await prisma.order.findMany();
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
  /*
  1. Check if post exist
  2. Get buyer (reader) and post owner (author)
  3. Check if valid voucher used
  4. Check if valid coupon used
  5. Check if valid points used
  6. Check if buyer has enough balance
  7. Peform transaction
  8. Record transaction
  */
  try {
    const { eventId, voucherCode, couponCode, points } = req.body;

    if (!req.user) {
      res.status(401).json({ message: "Please login first" });
      return;
    }

    //Step 1
    const event = await prisma.event.findUnique({
      where: { id: +eventId },
    });

    if (!event) {
      res.status(404).json({ message: "Event not found" });
      return;
    }

    //Step 2
    const buyer = await prisma.user.findUnique({
      where: { id: req.user.id },
      include: { Wallet: true, Coupon: true, Points: true },
    });

    if (!buyer) {
      res.status(404).json({ message: "Buyer ID not found" });
      return;
    }

    if (event.organizerId === null) {
      res.status(404).json({ message: "Organizer ID not found" });
      return;
    }

    const organizer = await prisma.user.findUnique({
      where: { id: event.organizerId },
    });

    if (!organizer) {
      res.status(404).json({ message: "Organizer ID not found" });
      return;
    }

    //Step 3
    let finalPrice = event.prices.toNumber();

    if (voucherCode && finalPrice > 0) {
      const validVoucher = await prisma.voucher.findUnique({
        where: {
          code: voucherCode,
          stock: { gt: 0 },
          expiredDate: { gt: new Date() },
        },
      });

      if (!validVoucher) {
        res.status(404).json({ message: "Invalid voucher" });
        return;
      }

      finalPrice = finalPrice - finalPrice * (validVoucher.discount / 100);

      await prisma.voucher.update({
        where: { code: voucherCode },
        data: { stock: { decrement: 1 } },
      });
    }

    //Step 4
    if (couponCode && finalPrice > 0) {
      console.log(req.user.id);
      console.log(couponCode);
      const validCoupon = await prisma.coupon.findUnique({
        where: {
          code: couponCode,
          used: false,
          expirationDate: { gt: new Date() },
        },
      });

      if (!validCoupon) {
        res.status(404).json({ message: "Invalid coupon" });
        return;
      }

      finalPrice = finalPrice - finalPrice * (validCoupon.discount / 100);

      await prisma.coupon.update({
        where: { code: couponCode },
        data: { used: true },
      });
    }

    //Step 5
    if (points && finalPrice > 0) {
      const validPoint = await prisma.points.findUnique({
        where: { userId: req.user.id, balance: { gt: 0 } },
      });

      if (!validPoint) {
        res.status(404).json({ message: "Invalid points" });
        return;
      }

      const maxPointToUse = Math.min(points, finalPrice);

      finalPrice = finalPrice - maxPointToUse;

      await prisma.points.update({
        where: { userId: req.user.id },
        data: { balance: validPoint.balance - maxPointToUse },
      });
    }

    //Step 6
    if (buyer.Wallet?.balance && buyer.Wallet.balance.toNumber() < finalPrice) {
      res.status(400).json({ message: "Insufficient wallet balance" });
      return;
    }

    //Step 7
    await prisma.wallet.update({
      where: { userId: req.user.id },
      data: { balance: { decrement: finalPrice } },
    });

    const wallet = await prisma.wallet.findUnique({
      where: { userId: event.organizerId },
    });

    if (!wallet) {
      throw new Error(
        `Dompet tidak ditemukan untuk ID pengguna: ${event.organizerId}`
      );
    }

    await prisma.wallet.update({
      where: { userId: event.organizerId },
      data: { balance: { increment: finalPrice } },
    });

    //Step 8
    const order = await prisma.order.create({
      data: {
        userId: req.user.id,
        eventId: event.id,
        totalPrice: finalPrice,
        totalTicket: 1,
      },
    });

    await prisma.event.update({
      where: { id: event.id },
      data: { ticketSlot: { decrement: 1 } },
    });

    await prisma.event.update({
      where: { id: event.id },
      data: { ticketSold: { increment: 1 } },
    });

    const ticket = await prisma.ticket.create({
      data: {
        ticketCode: `TICKET-${event.id}-%${String(new Date().getTime()).slice(
          0,
          5
        )}`,
        ticketTotal: finalPrice,
        orderId: order.id,
      },
    });

    res.status(201).json({ ok: true, data: { order, ticket } });
  } catch (error) {
    next(error);
  }
}
