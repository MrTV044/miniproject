import { Response, Request, NextFunction } from "express";
import prisma from "../configs/prisma";

export async function GetOrganizerEvents(
  req: Request,
  res: Response,
  next: NextFunction
) {
//   const token = req.cookies.token;
//   if (!token) {
//     res.status(401).json({ message: "Unauthorized" });
//     return;
//   }

  try {
    console.log("hit");
    const { email } = req.body;
    const userEvents = await prisma.user.findUnique({
      where: { email },
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


