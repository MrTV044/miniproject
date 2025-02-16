"use client";

import { useState } from "react";

const EventDashboard = () => {
  const [activeContent, setActiveContent] = useState("dashboard"); // State untuk konten aktif
  const [eventView, setEventView] = useState("active"); // State untuk memilih antara Event Aktif dan Event Lalu Lintas
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // State untuk mengatur sidebar

  // Daftar item sidebar
  const sidebarItems = [
    { name: "Dashboard", value: "dashboard" },
    { name: "Rekening", value: "accounting" },
    { name: "Statistic", value: "statistic" },
  ];

  // Fungsi untuk mengubah konten aktif
  const handleSidebarClick = (value: string) => {
    setActiveContent(value);
    setIsSidebarOpen(false); // Menutup sidebar setelah memilih item
  };

  // Fungsi untuk merender konten berdasarkan item yang dipilih
  const renderContent = () => {
    if (activeContent !== "dashboard") {
      switch (activeContent) {
        case "dashboard":
          return (
            <h2 className="text-lg font-semibold">Ini adalah Dashboard</h2>
          );
        case "accounting":
          return <h2 className="text-lg font-semibold">Ini adalah Rekening</h2>;
        case "statistic":
          return (
            <h2 className="text-lg font-semibold">Ini adalah Statistic</h2>
          );
        default:
          return (
            <h2 className="text-lg font-semibold">Pilih item di sidebar</h2>
          );
      }
    }

    return (
      <div>
        <div className="flex space-x-4 mb-4">
          <button
            className={`px-4 py-2 rounded ${
              eventView === "active" ? "bg-blue-600 text-white" : "bg-gray-200"
            }`}
            onClick={() => setEventView("active")}
          >
            Event Aktif
          </button>
          <button
            className={`px-4 py-2 rounded ${
              eventView === "past" ? "bg-blue-600 text-white" : "bg-gray-200"
            }`}
            onClick={() => setEventView("past")}
          >
            Event Lalu Lintas
          </button>
        </div>

        <div className="bg-white p-4 rounded shadow">
          {eventView === "active" ? (
            <div>
              <h2 className="text-lg font-semibold mb-4">Event Aktif</h2>
              <p>Detail Event Aktif</p>
            </div>
          ) : (
            <div>
              <h2 className="text-lg font-semibold mb-4">Event Lalu Lintas</h2>
              <p>Detail Event Lalu Lintas</p>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col md:flex-row h-screen">
      {/* Sidebar */}
      <aside
        className={`w-full md:w-64 bg-gray-800 text-white p-6 ${
          isSidebarOpen ? "block" : "hidden md:block"
        }`}
      >
        <h2 className="text-xl font-bold mb-4">Dashboard</h2>
        <nav className="space-y-2">
          {sidebarItems.map((item) => (
            <a
              key={item.value}
              href="#"
              className={`block py-2 px-4 rounded ${
                activeContent === item.value ? "bg-blue-600" : ""
              }`}
              onClick={() => handleSidebarClick(item.value)} // Mengubah konten saat diklik
            >
              {item.name}
            </a>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 p-6 bg-gray-100">
        <header className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Event Saya</h1>
          <input
            type="text"
            placeholder="Cari Event Saya"
            className="border border-gray-300 rounded p-2"
          />
          <button
            className="md:hidden p-2 bg-blue-600 text-white rounded"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            {isSidebarOpen ? "Sembunyikan Menu" : "Tampilkan Menu"}
          </button>
        </header>

        <div className="bg-white p-4 rounded shadow">
          {renderContent()} {/* Render konten berdasarkan item yang dipilih */}
        </div>
      </div>
    </div>
  );
};

export default EventDashboard;
