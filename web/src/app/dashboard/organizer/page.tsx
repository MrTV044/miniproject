"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import "chart.js/auto";
import "./event-dashboard.css";
import { events } from "@/types/event";
import Link from "next/link";

export default function Dashboard() {
  const [events, setEvents] = useState<events[]>();

  useEffect(() => {
    async function fetchEvents() {
      try {
        const response = await fetch(
          "http://localhost:8000/api/v1/organizer-events",
          { credentials: "include" }
        );

        const data = await response.json();
        setEvents(data.data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    }
    fetchEvents();
  }, []);

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Event Dashboard</h1>

      <div className="card">
        <h2 className="card-title">Upcoming Events</h2>
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Image </th>
              <th>Name</th>
              <th>Date</th>
              <th>Price (Rp.)</th>
              <th>Total Tickets Sold</th>
              <th>Total Revenue ($)</th>
            </tr>
          </thead>
          <tbody>
            {events?.map((event, index) => (
              <tr key={index}>
                <td>{event.id}</td>
                <td>
                  <Image
                    src={event.eventImage}
                    alt={event.eventName}
                    width={300}
                    height={300}
                  />
                </td>
                <td>
                  {" "}
                  <Link href={`/dashboard/organizer/${event.id}`}>
                    {event.eventName}
                  </Link>
                </td>
                <td>{new Date(event.date).toLocaleDateString()}</td>
                <td>{event.price}</td>
                <td>{event.totalTicketSold}</td>
                <td>{event.totalSingleEventRevenue}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}


// kalo accesstoken user ke dashboard user, kalo accesstoken organizer. how?
