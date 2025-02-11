"use client";

import { useState } from "react";

export default function CreateEventPage() {
  const [eventName, setEventName] = useState("");
  const [genre, setGenre] = useState("");
  const [organizer, setOrganizer] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [location, setLocation] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [ticketSlot, setTicketSlot] = useState("");
  const [price, setPrice] = useState("");
  const [isFree, setIsFree] = useState(false);
  const [description, setDescription] = useState("");

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.size <= 2 * 1024 * 1024) {
      setImage(file);
    } else {
      alert("File size should not exceed 2MB.");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("eventName", eventName);
    formData.append("genre", genre);
    formData.append("organizer", organizer);
    // formData.append("date", date);
    // formData.append("time", time);
    formData.append("dateTime", new Date(`${date}T${time}`).toISOString());
    formData.append("location", location);
    formData.append("ticketSlot", ticketSlot);
    formData.append("price", isFree ? "0" : price);
    formData.append("description", description);
    formData.append("eventType", isFree ? "FREE" : "PAID");

    if (image) {
      formData.append("image", image);
    }

    const response = await fetch("http://localhost:8000/api/v1/events", {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      alert("Event successfully created!");
    } else {
      alert("Failed to create event.");
    }
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
          <div className="flex items-center gap-5">
            <input
              type="number"
              value={isFree ? "0" : price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full border p-2 rounded"
              disabled={isFree}
              required
            />
            <label className="flex items-center w-[120px] ">
              <input
                type="checkbox"
                checked={isFree}
                onChange={() => setIsFree(!isFree)}
                className="mr-2 "
              />
              Free Event
            </label>
          </div>
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

// export default function CreateEventPage() {
//   const [eventName, setEventName] = useState("");
//   const [genre, setGenre] = useState("");
//   const [organizer, setOrganizer] = useState("Erlangga Adi Prasetya");
//   const [date, setDate] = useState("");
//   const [time, setTime] = useState("");
//   const [location, setLocation] = useState("");
//   const [image, setImage] = useState<File | null>(null);
//   const [ticketSlot, setTicketSlot] = useState("");
//   const [price, setPrice] = useState("");
//   const [description, setDescription] = useState("");

//   const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file && file.size <= 2 * 1024 * 1024) {
//       setImage(file);
//     } else {
//       alert("File size should not exceed 2MB.");
//     }
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     console.log({
//       eventName,
//       genre,
//       organizer,
//       date,
//       time,
//       location,
//       image,
//       ticketSlot,
//       price,
//       description,
//     });

//     const formData = new FormData();

//     formData.append("eventName", eventName);
//     // formData.append("image", image);
//     formData.append("genre", genre);
//     formData.append("organizer", organizer);
//     formData.append("date", date);
//     formData.append("time", time);
//     formData.append("location", location);
//     formData.append("ticketSlot", ticketSlot);
//     formData.append("price", price);
//     formData.append("description", description);

//     if (image) {
//       formData.append("image", image);
//     }

//     const response = await fetch("http://localhost:8000/api/v1/upload", {
//       method: "POST",
//       body: formData,
//     });

//     const cloudinaryData = await response.json();

//     console.log("Cloudinary Data:", cloudinaryData);

//     await fetch("http://localhost:8000/api/v1/events", {
//       method: "POST",
//     });
//   };

//   return (
//     <div className="max-w-4xl mx-auto p-5">
//       <h1 className="text-2xl font-bold mb-5">Upload Image/Poster/Banner</h1>
//       <p className="mb-5">Recommended size: 724 x 340px and no more than 2MB</p>

//       <form
//         onSubmit={handleSubmit}
//         // onSubmit={(e) => {
//         //   e.preventDefault();
//         //   handleSubmit(e);
//         //   handleSubmit({
//         //     eventName: "",
//         //     genre: "",
//         //     organizer: "",
//         //     date: "",
//         //     time: "",
//         //     location: "",
//         //     image: null,
//         //     ticketSlot: "",
//         //     price: "0",
//         //     description: "",
//         //   });
//         // }}
//       >
//         <div className="mb-5">
//           <label className="block mb-2 font-semibold">
//             Event Name <span className="text-red-500">*</span>
//           </label>
//           <input
//             type="text"
//             value={eventName}
//             onChange={(e) => setEventName(e.target.value)}
//             className="w-full border p-2 rounded"
//             required
//           />
//         </div>

//         <div className="mb-5">
//           <label className="block mb-2 font-semibold">
//             Select Genre <span className="text-red-500">*</span>
//           </label>
//           <select
//             value={genre}
//             onChange={(e) => setGenre(e.target.value)}
//             className="w-full border p-2 rounded"
//             required
//           >
//             <option value="">Select Genre</option>
//             <option value="Pop">Pop</option>
//             <option value="Jazz">Jazz</option>
//             <option value="Indie">Indie</option>
//             <option value="EDM">EDM</option>
//             <option value="Rock">Rock</option>
//             <option value="Hip-Hop">Hip-Hop</option>
//           </select>
//         </div>

//         <div className="mb-5">
//           <label className="block mb-2 font-semibold">
//             Upload Image/Poster/Banner <span className="text-red-500">*</span>
//           </label>
//           <input
//             type="file"
//             onChange={handleImageChange}
//             className="w-full border p-2 rounded"
//             accept="image/*"
//             required
//           />
//         </div>

//         <div className="mb-5">
//           <label className="block mb-2 font-semibold">
//             Organized By <span className="text-red-500">*</span>
//           </label>
//           <input
//             type="text"
//             value={organizer}
//             onChange={(e) => setOrganizer(e.target.value)}
//             className="w-full border p-2 rounded"
//             required
//           />
//         </div>

//         <div className="mb-5">
//           <label className="block mb-2 font-semibold">
//             Date & Time <span className="text-red-500">*</span>
//           </label>
//           <div className="grid grid-cols-2 gap-4">
//             <input
//               type="date"
//               value={date}
//               onChange={(e) => setDate(e.target.value)}
//               className="w-full border p-2 rounded"
//               required
//             />
//             <input
//               type="time"
//               value={time}
//               onChange={(e) => setTime(e.target.value)}
//               className="w-full border p-2 rounded"
//               required
//             />
//           </div>
//         </div>

//         <div className="mb-5">
//           <label className="block mb-2 font-semibold">
//             Location <span className="text-red-500">*</span>
//           </label>
//           <input
//             type="text"
//             value={location}
//             onChange={(e) => setLocation(e.target.value)}
//             className="w-full border p-2 rounded"
//             required
//           />
//         </div>

//         <div className="mb-5">
//           <label className="block mb-2 font-semibold">
//             Ticket Slot <span className="text-red-500">*</span>
//           </label>
//           <input
//             type="number"
//             value={ticketSlot}
//             onChange={(e) => setTicketSlot(e.target.value)}
//             className="w-full border p-2 rounded"
//             required
//           />
//         </div>

//         <div className="mb-5">
//           <label className="block mb-2 font-semibold">
//             Price <span className="text-red-500">*</span>
//           </label>
//           <input
//             type="number"
//             value={price}
//             onChange={(e) => setPrice(e.target.value)}
//             className="w-full border p-2 rounded"
//             required
//           />
//         </div>

//         <div className="mb-5">
//           <label className="block mb-2 font-semibold">
//             Description <span className="text-red-500">*</span>
//           </label>
//           <textarea
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//             className="w-full border p-2 rounded"
//             required
//           />
//         </div>

//         <button
//           type="submit"
//           className="w-full bg-orange-600 text-white py-2 mt-4 rounded"
//         >
//           Submit
//         </button>
//       </form>
//     </div>
//   );
// }
