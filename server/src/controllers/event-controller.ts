import { Request, Response, NextFunction } from "express";
import prisma from "../configs/prisma";
import fs from "fs/promises";

import cloudinary from "../configs/cloudinary";
import { logger } from "../middleware/error-middleware";
export async function getAllEvent(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const events = await prisma.event.findMany();

    res.status(200).json({
      ok: true,
      data: events.map((event) => ({
        ...event,
        genre: event.genre === "HIP_HOP" ? "HIP-HOP" : event.genre,
      })),
    });
  } catch (error) {
    next(error);
  }
}

export async function getSingleEvent(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const eventDetail = await prisma.event.findUnique({
      where: { id: +req.params.id },
    });
    res.status(200).json({ ok: true, data: eventDetail });
  } catch (error) {
    next(error);
  }
}

export async function createEvent(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const {
      eventName,
      description,
      genre,
      location,
      organizer,
      price,
      ticketSlot,
      dateTime,
      eventType,
      // voucherCode, // Tambahkan ini
      // voucherDiscount, // Tambahkan ini
    } = req.body;

    if (
      !eventName ||
      !description ||
      !genre ||
      !req.file ||
      !location ||
      !organizer ||
      !price ||
      !ticketSlot ||
      !eventType
    ) {
      const errorMessage = "Missing required fields";
      logger(errorMessage);
      res.status(400).json({ message: errorMessage });
      return;
    }

    const cloudinaryData = await cloudinary.uploader.upload(req.file.path, {
      folder: "miniproject/images",
    });

    fs.unlink(req.file.path);

    const createEvent = await prisma.event.create({
      data: {
        name: eventName,
        description: description,
        genre: genre,
        image: cloudinaryData.secure_url,
        organizer: organizer,
        place: location,
        prices: +price,
        ticketSlot: +ticketSlot,
        date: dateTime,
        eventType,
      },
    });

    // // Jika voucher disediakan, buat voucher
    // if (voucherCode && voucherDiscount) {
    //   const expiredDate = new Date(createEvent.date); // Ambil tanggal event
    //   expiredDate.setHours(expiredDate.getHours() + 1); // Tambahkan satu jam

    //   await prisma.voucher.create({
    //     data: {
    //       code: voucherCode,
    //       discount: +voucherDiscount,
    //       eventId: createEvent.id,
    //       expiredDate: expiredDate.toISOString(), // Set expiredDate ke satu jam setelah event
    //     },
    //   });
    // }

    res.status(201).json({ ok: true, data: createEvent });
  } catch (error) {
    next(error);
  }
}
