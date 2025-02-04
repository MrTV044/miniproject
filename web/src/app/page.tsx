import HeroSection from "@/components/hero-section";
import EventPost from "@/components/event-post";

export default function FindEvent() {
  // const detailEvent = await fetch(`https:8000/${id}`);

  return (
    <>
      <HeroSection />
      <EventPost />
      {/* <EventPost detailEvent={detailEvent} /> */}
    </>
  );
}
