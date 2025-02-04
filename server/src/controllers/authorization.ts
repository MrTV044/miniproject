import express, { Request, Response } from "express";
import prisma from "../configs/prisma";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

export async function CreateUser(req: Request, res: Response) {
  try {
    const { name, email, password, role } = req.body;

    const user = await prisma.user.create({
      data: { name, email, password, role },
    });

    res.status(201).json({ ok: true, message: "User created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "general error" });
  }
}

export async function login(req: Request, res: Response) {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      res.status(401).json({ message: "Invalid credentials" });
      return;
    }

    const validpassword = await bcryptjs.compare(password, user.password);

    if (!validpassword) {
      res.status(401).json({ message: "Invalid credentials" });
      return;
    }

    const JwtPayload = { email: user.email, password: user.password };
    const token = jwt.sign(JwtPayload, process.env.JWT_SECRET!, {
      expiresIn: "1h",
    });

    res.json({ ok: true, message: "Logged in successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "general error" });
  }
}

export function logout(req: Request, res: Response) {
  try {
    req.user = null;

    res.status(200).json({ ok: true, message: "Logged out successfully" });
  } catch (error) {}
}
