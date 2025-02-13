export default async function DetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const id = (await params).slug;

  return <h1>this is a {id} page</h1>;
}
