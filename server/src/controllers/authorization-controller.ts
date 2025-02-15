import express, { Request, Response } from "express";
import prisma from "../configs/prisma";
import bcrypt, { compare, genSalt, hash } from "bcryptjs";
import jwt from "jsonwebtoken";
import { Role } from "@prisma/client";

export async function register(req: Request, res: Response) {
  try {
    console.log("Hit");
    const { fullname, email, password, confirmPassword, referral, role } =
      req.body;

    const existingrefferal = await prisma.user.findUnique({
      where: { referral },
    });

    const date = new Date();
    const referralCode = fullname.slice(0, 3) + "REF" + date.getMilliseconds();

    if (referral && referral !== existingrefferal?.referral) {
      res.status(400).json({ message: "Invalid referral code!!!" });
      return;
    }

    if (password !== confirmPassword) {
      res.status(400).json({ message: "Passwords do not match!!!" });
      return;
    }

    const salt = await genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await prisma.user.create({
      data: {
        fullname,
        email,
        password: hashedPassword,
        referral: referralCode,
        role: role,
      },
    });

    if (referral) {
      const referralOwner = await prisma.user.findFirst({
        where: { referral: referral },
      });

      const coupon = await prisma.coupon.create({
        data: {
          discount: 10000,
          code: `${Math.random()}`,
          userId: referralOwner?.id ?? 0,
          expirationDate: new Date(date.setMonth(date.getMonth() + 3)),
        },
      });

      if (referralOwner && role === "CUSTOMER") {
        const points = await prisma.points.create({
          data: {
            balance: 10000,
            userId: referralOwner?.id,
          },
        });
      }
    }

    await prisma.wallet.create({
      data: {
        userId: user.id,
        balance: 0,
      },
    });

    // where to put the code for expiration date

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

    const validpassword = await bcrypt.compare(password, user.password);

    if (!validpassword) {
      res.status(401).json({ message: "Invalid credentials" });
      return;
    }

    const JwtPayload = {
      id: user.id,
      email: user.email,
      password: user.password,
      role: user.role,
    };
    const token = jwt.sign(JwtPayload, process.env.JWT_SECRET! as string, {
      expiresIn: "1h",
    });

    res
      .cookie("accessToken", token, {
        httpOnly: true,
        sameSite: "lax",
        secure: false,
      })
      .json({ ok: true, message: "Logged in successfully" });
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

export async function getRole(req: Request, res: Response) {
  try {
    const roles = Object.values(Role).filter((item) => item !== "ADMIN");
    res.status(200).json({ ok: true, data: roles });
  } catch (error) {
    console.log(error);
  }
}
