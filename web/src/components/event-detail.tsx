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

            <button className="flex justify-center py-3 mt-3 w-full rounded-xl bg-orange-600">
              Buy
            </button>
          </div>
        </div>
      </div>

      <div className="ml-[150px]">
        <h2>Description</h2>
        <p className="w-[700px]">
          Lorem ipsum odor amet, consectetuer adipiscing elit. Quis massa morbi
          tellus suscipit tellus efficitur libero. Dapibus urna bibendum
          facilisis auctor ut nunc; torquent eleifend. Dui elementum proin nisl
          vitae duis maximus amet? Class suspendisse euismod quam placerat
          sagittis tincidunt metus mi. Consequat neque non posuere, porta ut et!
          Porttitor torquent bibendum pretium purus nisl platea orci bibendum.
          Ultricies porttitor adipiscing montes diam eleifend purus pretium.
          Tincidunt lacus duis tortor tellus odio ut ligula per. Elementum odio
          porttitor felis ad quisque. Tortor dapibus penatibus quisque sagittis
          fringilla ridiculus aenean ut quisque. Nibh natoque porttitor felis
          finibus congue justo. Lectus iaculis posuere taciti sed ex metus.
          Fusce tellus maximus egestas semper sollicitudin potenti ligula hac.
          Eu iaculis sed suspendisse; quis netus vivamus. Elementum fames leo ut
          nascetur odio eleifend laoreet. Hac libero libero duis dolor eros.
          Posuere felis torquent bibendum sagittis facilisis urna. Sed fermentum
          felis blandit dolor habitasse; et congue etiam. Vitae tristique
          convallis consectetur cursus quisque. Est imperdiet primis condimentum
          potenti vestibulum. Ullamcorper nostra volutpat turpis rutrum orci
          varius. Mi amet rutrum libero quam natoque nisi. Sem lacus ornare duis
          mi vestibulum; tortor volutpat in. Maximus ac ac sed sapien augue
          suscipit finibus aptent pharetra. Nam mus ridiculus interdum mollis;
          habitant suspendisse.
        </p>
      </div>
    </section>
  );
}
