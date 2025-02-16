export default function FooterSection() {
  return (
    <section className="flex flex-col md:flex-row gap-10 bg-[#1e0a3b] text-white h-auto justify-center p-10">
      <div className="flex-1">
        <div className="pb-2 text-[20px] font-semibold">About Ticketing</div>
        <ul className="list-disc pl-5">
          <li>Sign In</li>
          <li>Pricing</li>
          <li>View Events</li>
          <li>Terms and Conditions</li>
        </ul>
      </div>

      <div className="flex-1">
        <div className="pb-2 text-[20px] font-semibold">
          Celebrate Your Event
        </div>
        <ul className="list-disc pl-5">
          <li>How to Prepare an Event</li>
          <li>How to Create a Competition Event</li>
          <li>How to Publish an Event</li>
          <li>How to Create a Music Event</li>
          <li>How to Manage an Event</li>
        </ul>
      </div>

      <div className="flex-1">
        <div className="pb-2 text-[20px] font-semibold">Event Location</div>
        <ul className="list-disc pl-5">
          <li>Jakarta</li>
          <li>Bandung</li>
          <li>Yogyakarta</li>
          <li>Surabaya</li>
          <li>Solo</li>
          <li>Bali</li>
          <li>All Cities</li>
        </ul>
      </div>

      <div className="flex-1">
        <div className="pb-2 text-[20px] font-semibold">Event Inspiration</div>
        <ul className="list-disc pl-5">
          <li>Festival</li>
          <li>Concert</li>
        </ul>
      </div>
    </section>
  );
}
