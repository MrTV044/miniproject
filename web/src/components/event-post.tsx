import Image from "next/image";
import Link from "next/link";
export default function EventPost() {
  return (
    <section className="px-[100px] pb-32 font-InterThigt font-semibold flex justify-between">
      <div>
        <div className="text-[25px] text-gray-500 pb-10">Event in Jakarta</div>

        <Link href="/events/random" className="grid grid-cols-3">
          <div>
            <div className="relative h-[175px] w-[300px]">
              <Image
                src="/find-event.webp"
                alt=""
                fill
                className="object-cover"
              />
            </div>

            <div>Membangun & Menghancurkan</div>

            <div>Metal</div>

            <div>31 May 2025</div>

            <div>Where</div>

            <div>Rp. 250.000</div>

            <div>about</div>
          </div>
        </Link>
      </div>

      <button>
        <ul className="grid grid-cols-3 gap-10">
          <li>Pop</li>
          <li>Jaz</li>
          <li>Indie</li>
          <li>EDM</li>
          <li>Hip-Hop</li>
          <li>Rock</li>
        </ul>
      </button>
    </section>
  );
}
