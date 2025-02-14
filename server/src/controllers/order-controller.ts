import { Request, Response, NextFunction } from "express";
import prisma from "../configs/prisma";

export async function getOrder(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { userId, couponCode, voucherCode, usePoints, pointsToUse } = req.body;

  try {
    // Ambil data wallet dan poin pengguna
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { Wallet: true, Points: true },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const walletBalance = user?.Wallet?.balance ?? 0; // Saldo wallet//+
    const userPoints = user.Points; // Poin pengguna
    let discount = 0; // Diskon yang akan diterapkan

    // Cek kode kupon
    if (couponCode) {
      const coupon = await prisma.coupon.findUnique({
        where: { code: couponCode },
      });

      if (coupon) {
        if (!coupon.used) {
          discount += 0.1; // Diskon 10%
          // Tandai kupon sebagai sudah digunakan
          await prisma.coupon.update({
            where: { id: coupon.id },
            data: { used: true },
          });
        } else {
          return res
            .status(400)
            .json({ message: "Coupon has already been used" });
        }
      } else {
        return res.status(400).json({ message: "Invalid coupon code" });
      }
    }

    // Cek kode voucher
    if (voucherCode) {
      const voucher = await prisma.voucher.findUnique({
        where: { code: voucherCode },
      });

      if (voucher) {
        if (!voucher.used) {
          discount += 0.1; // Diskon 10%
          // Tandai voucher sebagai sudah digunakan
          await prisma.voucher.update({
            where: { id: voucher.id },
            data: { used: true },
          });
        } else {
          return res
            .status(400)
            .json({ message: "Voucher has already been used" });
        }
      } else {
        return res.status(400).json({ message: "Invalid voucher code" });
      }
    }

    // Cek penggunaan poin
    if (usePoints) {
      if (pointsToUse > userPoints) {
        return res.status(400).json({ message: "Not enough points" });
      } else {
        // Hitung pengurangan harga berdasarkan poin
        discount += pointsToUse * 0.01; // Misalnya, 1 poin = 1 unit diskon
        // Kurangi poin dari pengguna
        await prisma.user.update({
          where: { id: userId },
          data: { points: userPoints - pointsToUse },
        });
      }
    }

    // Hitung total harga setelah diskon
    const totalPrice = 100000; // Misalnya, harga total sebelum diskon
    const finalPrice = totalPrice - totalPrice * discount;

    // Cek kecukupan saldo wallet
    if (walletBalance < finalPrice) {
      return res.status(400).json({ message: "Insufficient wallet balance" });
    }

    // Kurangi saldo wallet
    await prisma.wallet.update({
      where: { userId: userId },
      data: { credit: walletBalance - finalPrice },
    });

    // Kirim respons sukses
    return res.status(200).json({
      message: "Order successful",
      finalPrice,
      remainingBalance: walletBalance - finalPrice,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
