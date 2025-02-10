"use client";

import { useState } from "react";

export default function CreateEventPage() {
  const [eventName, setEventName] = useState("");
  const [genre, setGenre] = useState("");
  const [organizer, setOrganizer] = useState("Erlangga Adi Prasetya");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [location, setLocation] = useState("");
  const [image, setImage] = useState(null);
  const [ticketSlot, setTicketSlot] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.size <= 2 * 1024 * 1024) {
      setImage(file);
    } else {
      alert("File size should not exceed 2MB.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      eventName,
      genre,
      organizer,
      date,
      time,
      location,
      image,
      ticketSlot,
      price,
      description,
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-5">
      <h1 className="text-2xl font-bold mb-5">Upload Image/Poster/Banner</h1>
      <p className="mb-5">Recommended size: 724 x 340px and no more than 2MB</p>

      <form onSubmit={handleSubmit}>
        <div className="mb-5">
          <label className="block mb-2 font-semibold">
            Event Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        <div className="mb-5">
          <label className="block mb-2 font-semibold">
            Select Genre <span className="text-red-500">*</span>
          </label>
          <select
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            className="w-full border p-2 rounded"
            required
          >
            <option value="">Select Genre</option>
            <option value="Pop">Pop</option>
            <option value="Jazz">Jazz</option>
            <option value="Indie">Indie</option>
            <option value="EDM">EDM</option>
            <option value="Rock">Rock</option>
            <option value="Hip-Hop">Hip-Hop</option>
          </select>
        </div>

        <div className="mb-5">
          <label className="block mb-2 font-semibold">
            Upload Image/Poster/Banner <span className="text-red-500">*</span>
          </label>
          <input
            type="file"
            onChange={handleImageChange}
            className="w-full border p-2 rounded"
            accept="image/*"
            required
          />
        </div>

        <div className="mb-5">
          <label className="block mb-2 font-semibold">
            Organized By <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={organizer}
            onChange={(e) => setOrganizer(e.target.value)}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        <div className="mb-5">
          <label className="block mb-2 font-semibold">
            Date & Time <span className="text-red-500">*</span>
          </label>
          <div className="grid grid-cols-2 gap-4">
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full border p-2 rounded"
              required
            />
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-full border p-2 rounded"
              required
            />
          </div>
        </div>

        <div className="mb-5">
          <label className="block mb-2 font-semibold">
            Location <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        <div className="mb-5">
          <label className="block mb-2 font-semibold">
            Ticket Slot <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            value={ticketSlot}
            onChange={(e) => setTicketSlot(e.target.value)}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        <div className="mb-5">
          <label className="block mb-2 font-semibold">
            Price <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        <div className="mb-5">
          <label className="block mb-2 font-semibold">
            Description <span className="text-red-500">*</span>
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-orange-600 text-white py-2 mt-4 rounded"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
