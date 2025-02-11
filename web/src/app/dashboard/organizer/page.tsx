"use client";

import React, { useEffect, useState } from "react";
import "chart.js/auto";
import "./event-dashboard.css";
import { events, transactions } from "@/types/event";

function Dashboard() {
  const [events, setEvents] = useState<events[]>();
  const [transactions, setTransactions] = useState<transactions[]>();

  useEffect(() => {
    async function fetchEvents() {
      try {
        const response = await fetch(
          "http://localhost:8000/api/v1/organizer-events"
        );
        const data = await response.json();
        setEvents(data.data);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    }

    async function fetchTransactions() {
      try {
        const response = await fetch(
          "http://localhost:8000/api/v1/transactions"
        );
        const data = await response.json();
        setTransactions(data.data);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    }

    fetchEvents();
    fetchTransactions();
  }, []);

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Event Dashboard</h1>

      <div className="card">
        <h2 className="card-title">Upcoming Events</h2>
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Date</th>
              <th>Attendees</th>
            </tr>
          </thead>
          <tbody>
            {events?.map((event, index) => (
              <tr key={index}>
                <td>{event.name}</td>
                <td>{event.date.toLocaleDateString()}</td>
                <td>{event.order}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="card">
        <h2 className="card-title">Recent Transactions</h2>
        <table className="table">
          <thead>
            <tr>
              <th>Event</th>
              <th>Amount ($)</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {transactions?.map((transaction, index) => (
              <tr key={index}>
                <td>{transaction.event}</td>
                <td>{transaction.amount}</td>
                <td>{transaction.date.toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Dashboard;

// kalo accesstoken user ke dashboard user, kalo accesstoken organizer. how?
