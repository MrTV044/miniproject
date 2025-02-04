import Image from "next/image";

export default function EventDetail() {
  return (
    <section className="py-10">
      <div className="flex justify-center gap-10">
        <div className="relative h-[300px] w-[750px] rounded-3xl overflow-hidden">
          <Image src="/find-event.webp" alt="" fill className="object-cover" />
        </div>

        <div>
          <div className="shadow-[0_10px_15px_rgba(0,0,0,0.25)] p-4 rounded-2xl h-fit w-[300px]">
            <span className="font-semibold pb-5 text-[18px]">
              Membangun & Menghancurkan
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
              <span>31 May 2025</span>
            </div>

            <div className="flex items-center gap-2">
              <div className="relative h-5 w-5">
                <Image src="/clock.svg" alt="" fill className="object-cover" />
              </div>
              <span>16.00 - 00.00 WIB</span>
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
              <span>Bengkel Space</span>
            </div>
          </div>

          <div className="shadow-[0_10px_15px_rgba(0,0,0,0.25)] mt-[50px] rounded-lg  h-fit w-[400px] p-3">
            <div className="flex gap-3 items-center mx-3">
              <div className="relative h-[50px] w-[70px]">
                <Image src="/ticket.svg" alt="" fill className="object-cover" />
              </div>

              <span className="text-[15px]">
                You haven&apos;t selected a ticket yet. Please choose one first
                in the TICKET tab.
              </span>
            </div>

            <div className="flex justify-between pt-10 mx-4">
              <span>Start from</span>
              <span className="font-black">Harga</span>
            </div>

            <div className="flex justify-center py-3 mt-3 rounded-xl bg-orange-600">
              Buy
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
