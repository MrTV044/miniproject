import { Request, Response, NextFunction } from "express";

export async function GetCurrentUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const user = req.user;
    res.status(200).json({ ok: true, data: user });
  } catch (error) {
    next(error);
  }
}
