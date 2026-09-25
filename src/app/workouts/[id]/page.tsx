import DetailsClient from "@/components/DetailsClient";

export default async function WorkoutDetailsPage({
  params
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <DetailsClient id={id} />;
}