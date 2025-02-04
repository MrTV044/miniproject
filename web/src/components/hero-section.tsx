import Image from "next/image";
export default function HeroSection() {
  return (
    <section className="py-20">
      <div className="relative h-[450px]  flex justify-center">
        <div className="absolute h-[450px] w-[1300px] ">
          <Image
            src="/hero-sec.avif"
            fill
            alt="Home image"
            className="object-cover rounded-3xl"
          />
        </div>
        {/* <div className="absolute w-[900px] h-[450px]">
          <Image
            src="/test-l.png"
            alt=""
            fill
            className="object-cover rounded-3xl"
          />
        </div> */}
      </div>

      <div></div>
    </section>
  );
}
