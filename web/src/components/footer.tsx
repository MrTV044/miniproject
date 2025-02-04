export default function FooterSection() {
  return (
    <section className="flex gap-[100px] bg-[#1e0a3b] text-white h-[500px] justify-center p-20">
      <div>
        <div className="pb-2 text-[20px] font-semibold">About Ticketing</div>

        <ul>
          <li>Sign In</li>
          <li>Pricing</li>
          <li>View Events</li>
          <li>Terms and Conditions</li>
        </ul>
      </div>

      <div>
        <div className="pb-2 text-[20px] font-semibold">
          Celebrate Your Event
        </div>

        <ul>
          <li>How to Prepare an Event</li>
          <li>How to Create a Competition Event</li>
          <li>How to Publish an Event</li>
          <li>How to Create a Music Event</li>
          <li>How to Manage an Event</li>
        </ul>
      </div>

      <div>
        <div className="pb-2 text-[20px] font-semibold">Event Location</div>

        <ul>
          <li>Jakarta</li>
          <li>Bandung</li>
          <li>Yogyakarta</li>
          <li>Surabaya</li>
          <li>Solo</li>
          <li>Bali</li>
          <li>All Cities</li>
        </ul>
      </div>

      <div>
        <div className="pb-2 text-[20px] font-semibold">Event Inspiration</div>

        <ul>
          <li>Festival</li>
          <li>Concert</li>
        </ul>
      </div>
    </section>
  );
}
