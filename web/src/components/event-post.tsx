import { format } from "date-fns";

import Image from "next/image";
import Link from "next/link";
export default async function EventPost() {
  const response = await fetch("http://localhost:8000/api/v1/events");
  const events = await response.json();

  return (
    <section className="px-4 md:px-[100px] pb-32 font-InterThigt font-semibold flex flex-col md:flex-row">
      <div w-full>
        <div className="text-[25px] text-gray-500 pb-10">Event in Jakarta</div>
        <div className="grid grid-cols-3 gap-[100px]">
          {events.data.map((item, index: number) => (
            // <h1 key={index}>{item.name}</h1>
            <Link key={index} href={`/events/${item.id}`}>
              <div className="shadow-[0_1px_15px_rgba(0,0,0,0.25)] rounded-xl overflow-hidden w-[350px]">
                <div className="relative h-[175px] w-full">
                  <Image
                    src={item.image}
                    alt=""
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="ml-5 mr-3 mt-5">
                  <p className="mb-1">{item.name}</p>

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

      <div className="mt-[75px] grid sticky top-[100px] h-fit">
        <div className="ml-[85px]">Genre</div>
        <ul className="grid grid-cols-3 gap-3 ml-[85px]">
          <li>
            <button>Pop</button>
          </li>
          <li>
            <button>Jaz</button>
          </li>
          <li>
            <button>Indie</button>
          </li>
          <li>
            <button>EDM</button>
          </li>
          <li>
            <button>Rock</button>
          </li>
          <li>
            <button>Hip-Hop</button>
          </li>
        </ul>
      </div>
    </section>
  );
}
