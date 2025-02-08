import { Request, Response } from "express";
import prisma from "../configs/prisma";

export async function getAllEvent(req: Request, res: Response) {
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
    console.error(error);
    res.status(500).json({ message: "General error, good luck!!" });
  }
}

export async function getSingleEvent(req: Request, res: Response) {
  console.log(req.params);
  try {
    const eventDetail = await prisma.event.findUnique({
      where: { id: +req.params.id },
    });
    res.status(200).json({ ok: true, data: eventDetail });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "General error, good luck!!" });
  }
}
