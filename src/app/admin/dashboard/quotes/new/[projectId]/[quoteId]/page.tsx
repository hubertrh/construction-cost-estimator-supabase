import { UUID } from "crypto";
import { redirect } from "next/navigation";

type PageProps = {
  params: Promise<{ projectId: UUID; quoteId: UUID }>;
};

export default async function page({ params }: PageProps) {
  const { projectId, quoteId } = await params;
  redirect(`/admin/dashboard/quotes/new/${projectId}/${quoteId}/1`);

  return <div>page</div>;
}
