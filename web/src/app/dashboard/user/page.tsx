"use client";

import { useState } from "react";
import { Search, Calendar, List } from "lucide-react";

export default function EventDashboard() {
  const [events, setEvents] = useState([]);

  const handleCreateEvent = () => {
    alert("Create Event Clicked");
  };

  const handleSearch = (e) => {
    console.log("Searching for: ", e.target.value);
  };

  const handleViewChange = (view) => {
    alert(`Switched to ${view} view`);
  };

  return (
    <div className="flex h-screen w-full">
      {/* Sidebar */}
      <aside className="w-20 bg-gray-100 flex flex-col items-center py-6 space-y-6">
        <div className="w-8 h-8 bg-orange-500 rounded-full"></div>
        <nav className="space-y-6">
          <button
            className="w-10 h-10 bg-gray-200 rounded-lg"
            onClick={() => alert("Home Clicked")}
          ></button>
          <button
            className="w-10 h-10 bg-blue-500 text-white rounded-lg flex items-center justify-center"
            onClick={() => handleViewChange("calendar")}
          >
            {" "}
            <Calendar size={20} />{" "}
          </button>
          <button
            className="w-10 h-10 bg-gray-200 rounded-lg"
            onClick={() => alert("Reports Clicked")}
          ></button>
          <button
            className="w-10 h-10 bg-gray-200 rounded-lg"
            onClick={() => alert("Settings Clicked")}
          ></button>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col bg-white p-6">
        {/* Header */}
        <header className="flex justify-between items-center pb-6 border-b">
          <h1 className="text-3xl font-bold">Events</h1>
          <div className="flex items-center space-x-4">
            <button
              className="px-4 py-2 border border-orange-500 text-orange-500 rounded-lg"
              onClick={handleCreateEvent}
            >
              + Create
            </button>
            <div className="w-10 h-10 bg-blue-500 text-white flex items-center justify-center rounded-full">
              EP
            </div>
          </div>
        </header>

        {/* Event Controls */}
        <div className="flex items-center mt-6 space-x-4">
          <div className="flex items-center bg-gray-100 px-4 py-2 rounded-lg">
            <Search size={20} className="text-gray-500" />
            <input
              type="text"
              placeholder="Search events"
              className="bg-transparent ml-2 outline-none"
              onChange={handleSearch}
            />
          </div>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
            onClick={() => handleViewChange("list")}
          >
            <List size={20} /> <span>List</span>
          </button>
          <button
            className="border border-gray-300 px-4 py-2 rounded-lg flex items-center space-x-2"
            onClick={() => handleViewChange("calendar")}
          >
            <Calendar size={20} /> <span>Calendar</span>
          </button>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-lg"
            onClick={() => alert("Filter events clicked")}
          >
            All events ▼
          </button>
        </div>

        {/* No Events Placeholder */}
        <div className="flex flex-col items-center justify-center mt-20">
          <div className="w-20 h-20 bg-gray-200 rounded-full"></div>
          <p className="text-gray-500 mt-4">No events to show</p>
          <button
            className="bg-orange-500 text-white px-4 py-2 mt-4 rounded-lg"
            onClick={handleCreateEvent}
          >
            Create Event
          </button>
        </div>
      </div>
    </div>
  );
}
