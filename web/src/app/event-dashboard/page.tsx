"use client";

import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

type Event = {
  id: number;
  name: string;
  date: string;
  attendees: number;
  vouchers: number;
};

export default function EventDashboard() {
  const [events, setEvents] = useState<Event[]>([]);
  const [newEvent, setNewEvent] = useState({
    name: "",
    date: "",
    attendees: 0,
    vouchers: 0,
  });
  const [reportRange, setReportRange] = useState<"day" | "month" | "year">(
    "day"
  );

  const addEvent = () => {
    if (!newEvent.name || !newEvent.date) return;
    const event = { id: events.length + 1, ...newEvent };
    setEvents([...events, event]);
    setNewEvent({ name: "", date: "", attendees: 0, vouchers: 0 });
  };

  const issueVoucher = (id: number) => {
    setEvents(
      events.map((event) =>
        event.id === id ? { ...event, vouchers: event.vouchers + 1 } : event
      )
    );
  };

  const joinEvent = (id: number) => {
    setEvents(
      events.map((event) =>
        event.id === id ? { ...event, attendees: event.attendees + 1 } : event
      )
    );
  };

  // Generate statistics data for the chart
  const getEventStatistics = () => {
    return events.map((event) => ({
      name: event.name,
      attendees: event.attendees,
      vouchers: event.vouchers,
    }));
  };

  // Filter events based on report range
  const filterEventsByRange = () => {
    const now = new Date();
    return events.filter((event) => {
      const eventDate = new Date(event.date);
      switch (reportRange) {
        case "day":
          return eventDate.toDateString() === now.toDateString();
        case "month":
          return (
            eventDate.getMonth() === now.getMonth() &&
            eventDate.getFullYear() === now.getFullYear()
          );
        case "year":
          return eventDate.getFullYear() === now.getFullYear();
        default:
          return true;
      }
    });
  };

  return (
    <div className="p-6 max-w-4xl mx-auto bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4 text-center">
        Event Management Dashboard
      </h1>

      {/* Add Event Form */}
      <div className="mb-6 p-4 bg-white rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Add New Event</h2>
        <div className="flex gap-2 items-center">
          <input
            className="border border-gray-300 p-2 rounded w-full"
            placeholder="Event Name"
            value={newEvent.name}
            onChange={(e) => setNewEvent({ ...newEvent, name: e.target.value })}
          />
          <input
            className="border border-gray-300 p-2 rounded w-full"
            type="date"
            value={newEvent.date}
            onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
          />
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            onClick={addEvent}
          >
            Add Event
          </button>
        </div>
      </div>

      {/* Organizer Dashboard */}
      <div className="mb-6 p-4 bg-white rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Organizer Dashboard</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Event Statistics Chart */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Event Statistics</h3>
            <BarChart width={400} height={300} data={getEventStatistics()}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="attendees" fill="#8884d8" />
              <Bar dataKey="vouchers" fill="#82ca9d" />
            </BarChart>
          </div>

          {/* Reports Visualization */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Reports</h3>
            <div className="flex gap-2 mb-4">
              <button
                className={`px-3 py-1 rounded ${reportRange === "day" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
                onClick={() => setReportRange("day")}
              >
                Daily
              </button>
              <button
                className={`px-3 py-1 rounded ${reportRange === "month" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
                onClick={() => setReportRange("month")}
              >
                Monthly
              </button>
              <button
                className={`px-3 py-1 rounded ${reportRange === "year" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
                onClick={() => setReportRange("year")}
              >
                Yearly
              </button>
            </div>
            <div className="space-y-2">
              {filterEventsByRange().map((event) => (
                <div key={event.id} className="p-2 bg-gray-50 rounded">
                  <p className="font-semibold">{event.name}</p>
                  <p>Attendees: {event.attendees}</p>
                  <p>Vouchers: {event.vouchers}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Event List */}
      <div className="space-y-2">
        {events.map((event) => (
          <div key={event.id} className="p-4 bg-white shadow-md rounded-lg">
            <h2 className="text-lg font-semibold">{event.name}</h2>
            <p className="text-gray-600">{event.date}</p>
            <p className="text-gray-800">Attendees: {event.attendees}</p>
            <p className="text-gray-800">Vouchers Issued: {event.vouchers}</p>
            <button
              className="bg-green-500 text-white px-3 py-1 rounded mt-2 hover:bg-green-600"
              onClick={() => joinEvent(event.id)}
            >
              Join Event
            </button>
            <button
              className="bg-yellow-500 text-white px-3 py-1 rounded mt-2 ml-2 hover:bg-yellow-600"
              onClick={() => issueVoucher(event.id)}
            >
              Issue Voucher
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
