"use client";

import { useState, useEffect } from "react";
import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";

export default function EventPost() {
  const [events, setEvents] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("");

  useEffect(() => {
    async function fetchEvents() {
      const response = await fetch("http://localhost:8000/api/v1/events");
      const data = await response.json();
      setEvents(data.data);
    }
    fetchEvents();
  }, []);

  const genres = ["POP", "JAZZ", "INDIE", "EDM", "ROCK", "HIP-HOP"];

  const filteredEvents = selectedGenre
    ? events.filter((event) => event.genre === selectedGenre)
    : events;

  return (
    <section className="px-4 md:px-[100px] pb-32 font-InterThigt font-semibold flex flex-col md:flex-row">
      <div className="w-full">
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
                    {format(new Date(item.date), "yyyy-MMM-dd")}
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

      <div className="mt-10 md:mt-[75px] grid sticky top-[100px] h-fit">
        <div className="ml-4 md:ml-[25px] text-lg font-bold">Genre</div>
        <ul className="grid grid-cols-3 gap-[7px] ml-4 md:grid md:grid-cols-2 lg:ml-[25px] text-sm md:text-base">
          <li>
            <button
              className={`px-3 py-1 rounded ${
                selectedGenre === "" ? "bg-blue-500 text-white" : "bg-gray-200"
              }`}
              onClick={() => setSelectedGenre("")}
            >
              All
            </button>
          </li>
          {genres.map((genre) => (
            <li key={genre}>
              <button
                className={`px-3 py-1 rounded ${
                  selectedGenre === genre
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200"
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
