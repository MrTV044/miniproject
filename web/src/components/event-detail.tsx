import { format } from "date-fns";

import Image from "next/image";
import Link from "next/link";

export default async function EventDetail({ id }: { id: string }) {
  const response = await fetch(`http://localhost:8000/api/v1/events/${id}`);
  const eventDetail = await response.json();

  const formatter = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  });

  return (
    <section className="py-10 px-4 md:px-10">
      <div className="flex flex-col md:flex-row justify-center gap-10">
        <div className="relative h-[250px] md:h-[350px] w-full md:w-[750px] rounded-3xl overflow-hidden">
          <Image
            src={eventDetail.data.image}
            alt=""
            fill
            className="object-cover"
          />
        </div>

        <div>
          <div className="shadow-[0_10px_15px_rgba(0,0,0,0.25)] p-4 rounded-2xl h-fit w-full md:w-[300px]">
            <span className="font-semibold pb-5 text-[18px]">
              {eventDetail.data.name}
            </span>

            <div className="flex items-center gap-2">
              <div className="relative h-5 w-5">
                <Image
                  src="/calender-1.svg"
                  alt=""
                  fill
                  className="object-cover"
                />
              </div>
              <p className="mb-1 text-[#9497a1] font-medium">
                {format(new Date(eventDetail.data.date), "yyyy-MMM-dd")}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <div className="relative h-5 w-5">
                <Image src="/clock.svg" alt="" fill className="object-cover" />
              </div>
              <span>
                {format(new Date(eventDetail.data.date), "p")} - Until Finished
              </span>
            </div>

            <div className="flex items-center gap-2">
              <div className="relative h-5 w-5">
                <Image
                  src="/location-1.svg"
                  alt=""
                  fill
                  className="object-cover"
                />
              </div>
              <span>{eventDetail.data.place}</span>
            </div>
          </div>

          <div className="shadow-[0_10px_15px_rgba(0,0,0,0.25)] mt-[50px] rounded-lg h-fit w-full md:w-[400px] p-3">
            <div className="flex gap-3 items-center mx-3 mt-3">
              <div className="relative h-[50px] w-[70px]">
                <Image src="/ticket.svg" alt="" fill className="object-cover" />
              </div>

              <span className="text-[15px]">
                You haven&apos;t selected a ticket yet. Please choose one first
                in the TICKET tab.
              </span>
            </div>

            <div className="w-full h-[1px] border mt-4"></div>

            <div className="flex justify-between pt-7 mx-4">
              <span>Start from</span>
              <span className="font-black">
                {formatter.format(eventDetail.data.prices)}
              </span>
            </div>

            <Link
              href={`/transaction?id=${id}`}
              className="flex justify-center py-3 mt-3 w-full rounded-xl bg-orange-600"
            >
              Buy
            </Link>
          </div>
        </div>
      </div>

      <div className="mt-10 md:ml-[150px]">
        <h2 className="mb-3 font-black">Description</h2>
        <p className="w-full md:w-[700px]">{eventDetail.data.description}</p>
      </div>
    </section>
  );
}
