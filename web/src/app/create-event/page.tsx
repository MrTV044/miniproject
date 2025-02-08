import Image from "next/image";

export default function CreateEvent() {
  return (
    <section className="my-10 mx-10">
      <button className="flex items-center mb-10 border-[3px] rounded-lg p-2 mx-10">
        <div className="relative h-7 w-7">
          <Image
            src="/upload-button.svg"
            alt=""
            fill
            className="object cover"
          />
        </div>
        <div>Upload Image</div>
      </button>

      <div className="grid gap-2 mb-2 items-center">
        <label
          htmlFor="eventName"
          className="text-gray-700 font-medium w-[100px]"
        >
          Event Name
        </label>
        <input
          id="eventName"
          type="text"
          className="border rounded-lg w-full p-2 focus:ring focus:ring-blue-300"
          placeholder="Enter event name"
        />
      </div>

      <div className="flex mb-2 flex-col">
        <label htmlFor="eventGenre" className="text-gray-700 font-medium">
          Event Genre
        </label>
        <input
          list="genres"
          id="eventGenre"
          className="border rounded-lg p-2 mt-1 focus:ring focus:ring-blue-300"
          placeholder="Select a genre"
        />
        <datalist id="genres">
          <option value="Rock" />
          <option value="Indie" />
          <option value="Pop" />
          <option value="Jazz" />
          <option value="Hip-Hop" />
          <option value="EDM" />
        </datalist>
      </div>

      <div className="flex mb-2 gap-5">
        <div className="flex flex-col">
          <label htmlFor="eventDate" className="text-gray-700 font-medium">
            Event Date
          </label>
          <input
            id="eventDate"
            type="date"
            className="border rounded-lg p-2 mt-1 focus:ring focus:ring-blue-300"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="eventTime" className="text-gray-700 font-medium">
            Event Time
          </label>
          <input
            id="eventTime"
            type="time"
            className="border rounded-lg p-2 mt-1 focus:ring focus:ring-blue-300"
          />
        </div>
      </div>

      <div className="flex mb-2 flex-col">
        <label htmlFor="eventPlace" className="text-gray-700 font-medium">
          Event Place
        </label>
        <input
          id="eventPlace"
          type="text"
          placeholder="Enter event location"
          className="border rounded-lg p-2 mt-1 focus:ring focus:ring-blue-300"
        />
      </div>

      <div className="flex mb-2 flex-col">
        <label htmlFor="ticketSlot" className="text-gray-700 font-medium">
          Ticket Slot
        </label>
        <input
          id="ticketSlot"
          type="number"
          min="1"
          placeholder="Enter number of slots"
          className="border rounded-lg p-2 mt-1 focus:ring focus:ring-blue-300"
        />
      </div>

      <div className="flex mb-2 flex-col">
        <label htmlFor="ticketSlot" className="text-gray-700 font-medium">
          Price
        </label>
        <input
          id="ticketSlot"
          type="number"
          min="1"
          placeholder="Enter the price"
          className="border rounded-lg p-2 mt-1 focus:ring focus:ring-blue-300"
        />
      </div>

      <div className="flex mb-2 flex-col">
        <label htmlFor="ticketSlot" className="text-gray-700 font-medium">
          Organizer name
        </label>
        <input
          id="ticketSlot"
          type="number"
          min="1"
          placeholder="Enter organizer name"
          className="border rounded-lg p-2 mt-1 focus:ring focus:ring-blue-300"
        />
      </div>

      <div>order</div>
    </section>
  );
}
