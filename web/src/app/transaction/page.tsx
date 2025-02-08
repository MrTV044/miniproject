"use client";

import { useState } from "react";
// import Link from "next/link";
import Image from "next/image";

export default function TicketBooking() {
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [agreePrivacy, setAgreePrivacy] = useState(false);

  return (
    <div className="max-w-6xl mx-auto p-5">
      {/* Detail Pemesanan */}
      <div className="grid md:grid-cols-3 gap-5">
        <div className="md:col-span-2">
          <h2 className="text-xl font-semibold mb-4">Detail Pemesanan</h2>

          <div className="border rounded-lg p-5 shadow-sm">
            <div className="flex gap-3 rounded-xl overflow-hidden">
              <div className="relative h-[150px] w-[250px] rounded-xl overflow-hidden">
                <Image
                  src="/hero-sec.avif"
                  alt=""
                  fill
                  className="object-cover"
                />
              </div>

              <div>
                <h3 className="text-lg font-semibold">
                  EduWellness: Mim Mati dan Nun-dan-Mi...
                </h3>
                <p>08 Feb 2025 - 08 Feb 2025</p>
                <p>08:00 - 09:00 WIB</p>
                <p>Online</p>
              </div>
            </div>

            <div className="border-t my-4"></div>
            <p className="flex justify-between">
              <span>Jenis Tiket</span> <span>Harga</span> <span>Jumlah</span>
            </p>
            <p className="flex justify-between font-semibold">
              <span>🎫 Tiket EduWellness Promo</span>
              <span className="mr-[147px]">Rp49.000</span> <span>x1</span>
            </p>
          </div>

          {/* Detail Pemesan */}
          <h2 className="text-xl font-semibold mt-6 mb-4">Detail Pemesan</h2>
          <div className="border rounded-lg p-5 shadow-sm">
            <label className="block mb-2">Nama Lengkap *</label>
            <input
              type="text"
              className="w-full border p-2 rounded"
              placeholder="Gunakan nama di KTP/Paspor"
            />

            <label className="block mt-4 mb-2">Email *</label>
            <input
              type="email"
              className="w-full border p-2 rounded"
              placeholder="Masukkan email"
            />

            <label className="block mt-4 mb-2">Tanggal Lahir *</label>
            <input type="date" className="w-full border p-2 rounded" />

            <label className="block mt-4 mb-2">Jenis Kelamin *</label>
            <select className="w-full border p-2 rounded">
              <option>Laki-Laki</option>
              <option>Perempuan</option>
            </select>
          </div>
        </div>

        {/* Detail Harga */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Detail Harga</h2>
          <div className="border rounded-lg p-5 shadow-sm">
            <p className="flex justify-between">
              <span>Total Harga Tiket</span> <span>Rp49.000</span>
            </p>
            <p className="flex justify-between">
              <span>Biaya Platform</span> <span>Rp0</span>
            </p>
            <div className="border-t my-4"></div>
            <p className="flex justify-between font-semibold text-lg">
              <span>Total Bayar</span> <span>Rp49.000</span>
            </p>
            <div className="border-t my-4"></div>
            <label className="block mb-2">
              <input
                type="checkbox"
                checked={agreeTerms}
                onChange={() => setAgreeTerms(!agreeTerms)}
                className="mr-2"
              />
              Saya setuju dengan{" "}
              <a href="#" className="text-blue-600">
                Syarat dan Ketentuan
              </a>
            </label>
            <label className="block mb-2">
              <input
                type="checkbox"
                checked={agreePrivacy}
                onChange={() => setAgreePrivacy(!agreePrivacy)}
                className="mr-2"
              />
              Saya setuju dengan{" "}
              <a href="#" className="text-blue-600">
                Pemrosesan Data Pribadi
              </a>
            </label>
            <button
              disabled={!agreeTerms || !agreePrivacy}
              className="w-full bg-blue-600 text-white py-2 mt-4 rounded disabled:opacity-50"
            >
              Bayar Tiket
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
