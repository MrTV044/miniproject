"use client";

import { useState, useEffect } from "react";
import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";

// Mendefinisikan tipe untuk acara
interface Event {
  id: number;
  name: string;
  genre: string;
  date: string; // Tanggal dalam format string
  price: string;
  organizer: string;
  image: string;
}

export default function EventPost() {
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    async function fetchEvents() {
      try {
        const response = await fetch("http://localhost:8000/api/v1/events");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setEvents(data.data);
      } catch (error) {
        console.error("Failed to fetch events:", error);
      }
    }
    fetchEvents();
  }, []);

  const genres: string[] = ["POP", "JAZZ", "INDIE", "EDM", "ROCK", "HIP-HOP"];

  const filteredEvents = events
    .filter((event) =>
      event.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((event) => (selectedGenre ? event.genre === selectedGenre : true));

  return (
    <section className="px-4 md:px-[100px] pb-32 font-InterThigt font-semibold flex flex-col md:flex-row">
      <div className="w-full">
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search events by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>

        <div className="text-[25px] text-gray-500 pb-10 w-[1100px]">
          Event in Jakarta
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-[25px]">
          {filteredEvents.map((item, index) => (
            <Link key={index} href={`/events/${item.id}`}>
              <div className="shadow-md rounded-xl overflow-hidden w-full max-w-[350px] lg:max-w-[500px] mx-auto">
                <div className="relative h-[175px] w-full">
                  <Image
                    src={item.image}
                    alt=""
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="p-5">
                  <p className="mb-1 text-lg">{item.name}</p>
                  <p className="mb-1 font-medium">{item.genre}</p>
                  <p className="mb-1 text-[#9497a1] font-medium">
                    {format(new Date(item.date), "yyyy-MMM-dd")}{" "}
                  </p>
                  <p className="text-[18px]">{item.price}</p>
                  <div className="border w-full h-[1px] mt-6"></div>
                  <p className="my-3 ml-3">{item.organizer}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className=" grid sticky top-[100px] h-fit">
        <div className="ml-4 pt-10 pb-2 md:pt-0 md:pb-2 md:ml-[25px] text-lg font-bold flex  justify-center">
          Genre
        </div>
        <ul className="grid grid-cols-3 gap-[7px] ml-4 md:grid md:grid-cols-1  lg:ml-[25px] text-sm md:text-base">
          <li>
            <button
              className={`px-3 py-1 w-[83px] rounded ${
                selectedGenre === "" ? "bg-blue-500 text-white" : "bg-gray-100"
              }`}
              onClick={() => setSelectedGenre("")}
            >
              All
            </button>
          </li>

          {genres.map((genre) => (
            <li key={genre} className="">
              <button
                className={`px-2 w-[83px] py-1 rounded grid grid-cols-1 ${
                  selectedGenre === genre
                    ? "bg-blue-500 text-white"
                    : "bg-gray-100"
                }`}
                onClick={() =>
                  setSelectedGenre(selectedGenre === genre ? "" : genre)
                }
              >
                {genre}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
