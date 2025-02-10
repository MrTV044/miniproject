"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";

export default function TicketBooking() {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [coupon, setCoupon] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [agreePrivacy, setAgreePrivacy] = useState(false);

  const [ticketQuantity, setTicketQuantity] = useState(1);
  const ticketPrice = 49000;
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [event, setEvent] = useState();

  useEffect(() => {
    async function getDetail() {
      try {
        const response = await fetch(
          `http://localhost:8000/api/v1/events/${id}`
        );
        const eventDetail = await response.json();
        console.log(eventDetail);
        setEvent(eventDetail.data);
      } catch (error) {
        console.error(error);
      }
    }

    getDetail();
  }, [id]);

  console.log(event);
  console.log(id);

  const handlePayTicket = () => {
    console.log("Order Details:", {
      fullname,
      email,
      coupon,
      paymentMethod,
      agreeTerms,
      agreePrivacy,
      ticketQuantity,
      totalPayment: ticketQuantity * ticketPrice,
    });
  };

  return (
    <div className="max-w-6xl mx-auto p-5">
      <div className="grid md:grid-cols-3 gap-5">
        <div className="md:col-span-2">
          <h2 className="text-xl font-semibold mb-4">Order Details</h2>
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
                <h3 className="text-lg font-semibold">EduWellness Event</h3>
                <p>08 Feb 2025 - 08 Feb 2025</p>
                <p>08:00 - 09:00 WIB</p>
                <p>Online</p>
              </div>
            </div>
            <div className="border-t my-4"></div>
            <p className="flex justify-between font-semibold">
              <span>🎫 Tiket EduWellness Promo</span>
              <span className="pr-[140px]">{event?.prices}</span>
              <span>
                <input
                  type="number"
                  min="1"
                  value={ticketQuantity}
                  onChange={(e) =>
                    setTicketQuantity(parseInt(e.target.value) || 1)
                  }
                  className="w-16 border p-1 rounded text-center"
                />
              </span>
            </p>
          </div>

          <h2 className="text-xl font-semibold mt-6 mb-4">Customer Details</h2>
          <div className="border rounded-lg p-5 shadow-sm">
            <label className="block mb-2">Fullname *</label>
            <input
              type="text"
              className="w-full border p-2 rounded"
              placeholder="Use the name on your ID card"
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
            />

            <label className="block mt-4 mb-2">Email *</label>
            <input
              type="email"
              className="w-full border p-2 rounded"
              placeholder="Masukkan email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <label className="block mt-4 mb-2">Coupon</label>
            <input
              type="text"
              className="w-full border p-2 rounded"
              placeholder="Input Coupon"
              value={coupon}
              onChange={(e) => setCoupon(e.target.value)}
            />
          </div>

          <div className="mt-10">
            <h2 className="text-xl font-semibold mb-4">Payment Method</h2>
            <div className="border rounded-lg p-5 shadow-sm">
              <label className="block mb-2">Select Payment Method *</label>
              <select
                className="w-full border p-2 rounded"
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
              >
                <option value="">Select</option>
                <option value="Credit">Credit</option>
              </select>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Price Details</h2>
          <div className="border rounded-lg p-5 shadow-sm">
            <p className="flex justify-between font-semibold text-lg">
              <span>Total Payment</span>{" "}
              <span>Rp {ticketQuantity * ticketPrice}</span>
            </p>
            <div className="border-t my-4"></div>
            <label className="block mb-2">
              <input
                type="checkbox"
                checked={agreeTerms}
                onChange={() => setAgreeTerms(!agreeTerms)}
                className="mr-2"
              />
              I agree to the{" "}
              <a href="#" className="text-blue-600">
                Terms and Conditions
              </a>
            </label>
            <label className="block mb-2">
              <input
                type="checkbox"
                checked={agreePrivacy}
                onChange={() => setAgreePrivacy(!agreePrivacy)}
                className="mr-2"
              />
              I agree to the{" "}
              <a href="#" className="text-blue-600">
                processing of my personal data
              </a>
            </label>

            <button
              disabled={!agreeTerms || !agreePrivacy}
              onClick={handlePayTicket}
              className="w-full bg-orange-600 text-white py-2 mt-4 rounded disabled:opacity-50"
            >
              Pay the ticket
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
