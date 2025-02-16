"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  interface User {
    role: string;
  }

  const router = useRouter();
  async function logout() {
    try {
      const response = await fetch("http://localhost:8000/api/v1/logout", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Logout failed");
      }

      console.log("Logout successful");
    } catch (error) {
      console.error("Error logging out:", error);
    }
    setIsOpen(!isOpen);
    router.push("/login");
  }

  useEffect(() => {
    async function getCurrentUser() {
      try {
        const response = await fetch("http://localhost:8000/api/v1/user", {
          credentials: "include",
        });

        const user = await response.json();
        setUser(user.data);
      } catch (error) {
        console.error(error);
      }
    }
    getCurrentUser();
  }, []);

  if (!user) {
    return (
      <nav>
        <div className="flex justify-between px-10 font-InterThigt items-center">
          <div className="p-3 text-[40px] font-black text-orange-600">
            <Link href="/">QuickTix</Link>
          </div>

          {/* Hamburger Menu Button */}
          <button
            className="p-3 rounded-full hover:bg-gray-200"
            onClick={logout}
          ></button>

          {/* Desktop Menu */}
          <ul className="hidden md:flex gap-5 font-semibold">
            <Link href="/" className="p-3 rounded-full hover:bg-gray-200">
              Home
            </Link>

            <Link href="/login" className="p-3 rounded-full hover:bg-gray-200">
              Log In
            </Link>
            <Link
              href="/sign-up"
              className="p-3 rounded-full hover:bg-gray-200"
            >
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
              href="/login"
              className="p-3 w-full text-center hover:bg-gray-200"
            >
              Log In
            </Link>
            <Link
              href="/sign-up"
              className="p-3 w-full text-center hover:bg-gray-200"
            >
              Sign Up
            </Link>
          </ul>
        )}
      </nav>
    );
  } else if (user.role === "CUSTOMER") {
    return (
      <nav>
        <div className="flex justify-between px-10 font-InterThigt items-center">
          <div className="p-3 text-[40px] font-black text-orange-600">
            <Link href="/">QuickTix</Link>
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
              href="/dashboard/user"
              className="p-3 rounded-full hover:bg-gray-200"
            >
              Dashboard
            </Link>

            <Link href="/login" className="p-3 rounded-full hover:bg-gray-200">
              Log In
            </Link>
            <Link
              href="/sign-up"
              className="p-3 rounded-full hover:bg-gray-200"
            >
              Sign Up
            </Link>

            <button
              className="p-3 rounded-full hover:bg-gray-200"
              onClick={logout}
            >
              Log Out
            </button>
          </ul>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <ul className="md:hidden flex flex-col items-center gap-4 py-4 bg-white shadow-lg">
            <Link href="/" className="p-3 w-full text-center hover:bg-gray-200">
              Home
            </Link>

            <Link
              href="/dashboard/user"
              className="p-3 w-full text-center hover:bg-gray-200"
            >
              Dashboard
            </Link>
            <Link
              href="/login"
              className="p-3 w-full text-center hover:bg-gray-200"
            >
              Log In
            </Link>
            <Link
              href="/sign-up"
              className="p-3 w-full text-center hover:bg-gray-200"
            >
              Sign Up
            </Link>

            <button
              className="p-3 w-full text-center hover:bg-gray-200"
              onClick={logout}
            >
              Log Out
            </button>
          </ul>
        )}
      </nav>
    );
  } else {
    return (
      <nav>
        <div className="flex justify-between px-10 font-InterThigt items-center">
          <div className="p-3 text-[40px] font-black text-orange-600">
            <Link href="/">QuickTix</Link>
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
              href="/dashboard/user"
              className="p-3 rounded-full hover:bg-gray-200"
            >
              Dashboard
            </Link>

            <Link
              href="/create-event"
              className="p-3 rounded-full hover:bg-gray-200"
            >
              Create Event
            </Link>
            <Link href="/login" className="p-3 rounded-full hover:bg-gray-200">
              Log In
            </Link>
            <Link
              href="/sign-up"
              className="p-3 rounded-full hover:bg-gray-200"
            >
              Sign Up
            </Link>

            <button
              className="p-3 rounded-full hover:bg-gray-200"
              onClick={logout}
            >
              Log Out
            </button>
          </ul>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <ul className="md:hidden flex flex-col items-center gap-4 py-4 bg-white shadow-lg">
            <Link href="/" className="p-3 w-full text-center hover:bg-gray-200">
              Home
            </Link>
            <Link
              href="/dashboard/user"
              className="p-3 w-full text-center hover:bg-gray-200"
            >
              Dashboard
            </Link>
            <Link
              href="/create-event"
              className="p-3 w-full text-center hover:bg-gray-200"
            >
              Create Event
            </Link>
            <Link
              href="/login"
              className="p-3 w-full text-center hover:bg-gray-200"
            >
              Log In
            </Link>

            <Link
              href="/sign-up"
              className="p-3 w-full text-center hover:bg-gray-200"
            >
              Sign Up
            </Link>

            <button
              className="p-3 w-full text-center hover:bg-gray-200"
              onClick={logout}
            >
              Log Out
            </button>
          </ul>
        )}
      </nav>
    );
  }
}

{
  /* <Link
            href="/"
            className={`${
              user.role === "customer" ? "hidden" : "flex"
            } p-3 rounded-full  hover:hover:bg-gray-200`}
          >
            Create Event
z<<<<<<< HEAD
          </Link> */
}
