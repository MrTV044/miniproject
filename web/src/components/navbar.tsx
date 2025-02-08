"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md">
      <div className="flex justify-between px-6 md:px-10 py-4 items-center">
        <div className="text-[30px] md:text-[40px] font-black text-orange-600">
          QuickTix
        </div>

        {/* Hamburger Menu Button */}
        <button
          className="md:hidden p-2 rounded focus:outline-none focus:ring-2 focus:ring-gray-300"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-5 font-semibold">
          <Link href="/" className="p-3 rounded-full hover:bg-gray-200">
            Home
          </Link>
          <Link
            href="/create-event"
            className="p-3 rounded-full hover:bg-gray-200"
          >
            Create Event
          </Link>
          <Link href="/" className="p-3 rounded-full hover:bg-gray-200">
            Log In
          </Link>
          <Link href="/" className="p-3 rounded-full hover:bg-gray-200">
            Sign Up
          </Link>
        </ul>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <ul className="md:hidden flex flex-col items-center gap-4 py-4 bg-white shadow-lg">
          <Link href="/" className="p-3 w-full text-center hover:bg-gray-200">
            Home
          </Link>
          <Link
            href="/create-event"
            className="p-3 w-full text-center hover:bg-gray-200"
          >
            Create Event
          </Link>
          <Link href="/" className="p-3 w-full text-center hover:bg-gray-200">
            Log In
          </Link>
          <Link href="/" className="p-3 w-full text-center hover:bg-gray-200">
            Sign Up
          </Link>
        </ul>
      )}
    </nav>
  );
}

{
  /* <Link
            href="/"
            className={`${
              user.role === "customer" ? "hidden" : "flex"
            } p-3 rounded-full  hover:hover:bg-gray-200`}
          >
            Create Event
          </Link> */
}
