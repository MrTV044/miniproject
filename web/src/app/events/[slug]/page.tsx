import EventDetail from "@/components/event-detail";
export default async function DetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const id = (await params).slug;

  return <EventDetail id={id} />;
}
