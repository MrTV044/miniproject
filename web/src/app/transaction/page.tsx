"use client";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";

export default function TicketBooking() {
  const [point, setPoint] = useState("");
  const [coupon, setCoupon] = useState("");
  const [voucher, setVoucher] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [agreePrivacy, setAgreePrivacy] = useState(false);
  const [ticketQuantity, setTicketQuantity] = useState(1);

  interface Event {
    id: string;
    name: string;
    date: string;
    image: string;
    prices: number;
  }

  const [event, setEvent] = useState<Event | null>(null);
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const ticketPrice = event ? Number(event.prices) : 0;

  useEffect(() => {
    async function getDetail() {
      try {
        const response = await fetch(
          `http://localhost:8000/api/v1/events/${id}`
        );
        const eventDetail = await response.json();
        setEvent(eventDetail.data);
      } catch (error) {
        console.error(error);
      }
    }

    if (id) getDetail();
  }, [id]);

  const handleBooking = async () => {
    const orderDetails = {
      eventId: id,
      voucherCode: voucher,
      couponCode: coupon,
      points: point,
    };

    try {
      const response = await fetch("http://localhost:8000/api/v1/order", {
        credentials: "include",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(orderDetails),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Order berhasil dibuat:", data);
      } else {
        console.error("Error saat membuat order:", data.message);
      }
    } catch (error) {
      console.error("Terjadi kesalahan:", error);
    }
  };

  const formatter = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  });

  return (
    <div className="max-w-6xl mx-auto p-5">
      <div className="grid md:grid-cols-3 gap-5">
        <div className="md:col-span-2">
          <h2 className="text-xl font-semibold mb-4">Order Details</h2>
          <div className="border rounded-lg p-5 shadow-sm">
            <div className="flex flex-col md:flex-row gap-3 rounded-xl overflow-hidden">
              <div className="relative h-[175px] w-full md:w-[370px] rounded-xl overflow-hidden">
                {event && (
                  <Image
                    src={event.image}
                    alt=""
                    fill
                    className="object-cover"
                  />
                )}
              </div>
              <div className="flex flex-col justify-center">
                <h3 className="text-lg font-semibold">{event?.name}</h3>
                <p>{event && format(new Date(event.date), "yyyy-MMM-dd")}</p>
                <p>
                  <span className="font-bold"> Open gate</span>{" "}
                  {event && format(new Date(event.date), "p")} - finished
                </p>
              </div>
            </div>
            <div className="border-t my-4"></div>
            <p className="flex justify-between font-semibold">
              <span>🎫 Tiket EduWellness Promo</span>
              <span className="pr-[140px]">
                {event && formatter.format(ticketPrice)}
              </span>
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

          {ticketPrice > 0 && (
            <div className="mt-10 pb-10">
              <h2 className="text-xl font-semibold mb-4"></h2>
              <div className="border rounded-lg p-5 shadow-sm">
                <div>
                  <label className="block mt-4 mb-2">Point</label>
                  <input
                    type="text"
                    className="w-full border p-2 rounded"
                    placeholder="Input Voucher"
                    value={point}
                    onChange={(e) => setPoint(e.target.value)}
                  />
                  <button onClick={() => {}}>Use</button>
                </div>

                <div>
                  <label className="block mt-4 mb-2">Voucher</label>
                  <input
                    type="text"
                    className="w-full border p-2 rounded"
                    placeholder="Input Voucher"
                    value={voucher}
                    onChange={(e) => setVoucher(e.target.value)}
                  />
                  <button onClick={() => {}}>Use</button>
                </div>

                <div>
                  <label className="block mt-4 mb-2">Coupon</label>
                  <input
                    type="text"
                    className="w-full border p-2 rounded"
                    placeholder="Input Coupon"
                    value={coupon}
                    onChange={(e) => setCoupon(e.target.value)}
                  />
                  <button onClick={() => {}}>Use</button>
                </div>
              </div>
            </div>
          )}
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Price Details</h2>
          <div className="border rounded-lg p-5 shadow-sm">
            <p className="flex justify-between font-semibold text-lg">
              <span>Total Payment</span>{" "}
              {event && formatter.format(ticketPrice * ticketQuantity)}
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
              onClick={handleBooking}
              className={`w-full py-2 mt-4 rounded ${
                ticketPrice > 0
                  ? "bg-orange-600 text-white"
                  : "bg-green-600 text-white"
              } disabled:opacity-50`}
            >
              {ticketPrice > 0 ? "Pay the Ticket" : "Book for Free"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
