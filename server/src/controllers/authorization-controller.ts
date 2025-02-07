import express, { Request, Response } from "express";
import prisma from "../configs/prisma";
import bcrypt, { compare, genSalt, hash } from "bcryptjs";
import jwt from "jsonwebtoken";
import { Role } from "@prisma/client";

export async function register(req: Request, res: Response) {
  try {
    console.log("Hit");
    const { fullname, email, password, confirmPassword, role } = req.body;
 
    if (password !== confirmPassword) {
      res.status(400).json({ message: "Passwords do not match!!!" });
      return;
    }

    console.log(password, confirmPassword);
    const salt = await genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const hashedConfirmPassword = await bcrypt.hash(confirmPassword, 10);

    const user = await prisma.user.create({
      data: {
        fullname,
        email,
        password: hashedPassword,
        confirmpassword: hashedConfirmPassword,
        role: role as Role,
      },
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

    const validpassword = await bcrypt.compare(password, user.password);

    if (!validpassword) {
      res.status(401).json({ message: "Invalid credentials" });
      return;
    }

    const JwtPayload = { email: user.email, password: user.password };
    const token = jwt.sign(JwtPayload, process.env.JWT_SECRET! as string, {
      expiresIn: "1h",
    });

    res
      .cookie("token", token, {
        httpOnly: true,
        sameSite: "none",
        secure: true,
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

// export async function referral(req: Request, res: Response) {
//   try {
//     const { referral } = req.body;
//     const user = await prisma.user.findUnique({
//       where: { referral },
//     });

//     const correctReferral = compare(referral, user.referral)

//     res.json({ ok: true, referral: referral?.referral });
//   } catch (error) {
//     console.log(error);
//   }
// }

export async function getRole(req: Request, res: Response) {
  try {
    const roles = Object.values(Role).filter((item) => item !== "ADMIN");
    res.status(200).json({ ok: true, data: roles });
  } catch (error) {
    console.log(error);
  }
}
