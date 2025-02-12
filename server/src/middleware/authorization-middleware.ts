import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { CustomJWTPayload } from "../types/express";
import { Prisma } from "@prisma/client";

export async function verifyToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const token = req.cookies.accessToken;
    console.log(token);

    if (!token) {
      res.status(401).json({ message: "Token is required!!!!" });
      return;
    }

    const verified = jwt.verify(
      token,
      process.env.JWT_SECRET!
    ) as CustomJWTPayload;

    req.user = verified;
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: "Invalid token" });
  }
}

export function roleGuard(role: string) {
  return async function (req: Request, res: Response, next: NextFunction) {
    try {
      if (req.user?.role === "ORGANIZER" || "ADMIN") {
        next();
        return;
      }
      if (req.user?.role === "CUSTOMER") {
        res.status(401).json({ message: "Access denied" });
        return;
      }
    } catch (error) {
      console.error(error);
    }
  };
}
