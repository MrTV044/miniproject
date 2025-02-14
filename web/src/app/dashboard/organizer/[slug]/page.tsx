"use client";

import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { singleEvent, Order, Timeframe } from "@/types/event";
import Image from "next/image";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function EventDashboard({
  params,
}: {
  params: { slug: string };
}) {
  const [event, setEvent] = useState<singleEvent>();
  const [orders, setOrders] = useState<Order[]>([]);

  const [timeframe, setTimeframe] = useState<Timeframe>();

  useEffect(() => {
    async function fetchEvent() {
      try {
        const id = (await params).slug;
        const response = await fetch(
          `http://localhost:8000/api/v1/single-event/${id}`
        );
        const data = await response.json();
        console.log(data, "HIT");
        setEvent(data.data);
        setOrders(data.data.Order);
      } catch (error) {
        console.error("Error fetching event:", error);
      }
    }

    fetchEvent();
  }, [params]);

  // Process order data
  const getOrderData = () => {
    if (!orders || orders.length === 0) return [];

    const filteredOrders = orders.reduce(
      (acc: Record<string, number>, order: Order) => {
        if (!order.createdAt) return acc; // Ensure createdAt exists

        const date = new Date(order.createdAt);
        if (isNaN(date.getTime())) return acc; // Ignore invalid dates

        let key: string = "";

        if (timeframe === "daily") {
          key = date.toISOString().split("T")[0]; // YYYY-MM-DD
        } else if (timeframe === "monthly") {
          key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`; // YYYY-MM
        } else if (timeframe === "yearly") {
          key = `${date.getFullYear()}`; // YYYY
        }

        acc[key] = (acc[key] || 0) + order.totalTicket;
        return acc;
      },
      {}
    );

    return Object.entries(filteredOrders).sort(([a], [b]) => (a > b ? 1 : -1));
  };

  const orderData = getOrderData();
  const labels = orderData.map(([date]) => date);
  const dataValues = orderData.map(([, tickets]) => tickets);

  // Chart.js Data Configuration
  const chartData = {
    labels,
    datasets: [
      {
        label: `Tickets Sold (${timeframe})`,
        data: dataValues,
        borderColor: "rgb(75, 192, 192)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        tension: 0.4,
      },
    ],
  };

  return (
    <div className="p-6">
      {event ? (
        <div className="bg-white p-4 rounded-lg shadow-md">
          <Image
            src={event.image}
            alt="event image"
            width="350"
            height="100"
          ></Image>
          <h1 className="text-2xl font-bold">{event.name}</h1>
          <p className="text-gray-600">
            {event.genre} | {`${new Date(event.date)}`} | {event.place}
          </p>
          <p className="text-gray-600">
            Available Ticket: {event.ticketSlot} | Tickets Sold:{" "}
            {event.ticketSold}
          </p>
          <p className="mt-2">{event.description}</p>
        </div>
      ) : (
        <p>Loading event details...</p>
      )}

      {/* Timeframe Selector */}
      <div className="mt-6 flex gap-4">
        {["daily", "monthly", "yearly"].map((tf, index) => (
          <button
            key={index}
            className={`px-4 py-2 rounded-lg ${timeframe === tf ? "bg-blue-500 text-white" : "bg-gray-200"}`}
            onClick={() => setTimeframe(tf as Timeframe)}
          >
            {tf.charAt(0).toUpperCase() + tf.slice(1)}
          </button>
        ))}
      </div>

      {/* Chart */}
      <div className="mt-6 p-4 bg-white rounded-lg shadow-md">
        <h2 className="text-xl font-semibold">Order Trends</h2>
        <Line data={chartData} />
      </div>
    </div>
  );
}
