import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { CustomJWTPayload } from "../types/express";

export async function verifyToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Token is required" });
    }

    const payload: CustomJWTPayload = jwt.verify(
      token,
      process.env.JWT_SECRET!
    ) as CustomJWTPayload;

    req.user = payload;
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: "Invalid token" });
  }
}
