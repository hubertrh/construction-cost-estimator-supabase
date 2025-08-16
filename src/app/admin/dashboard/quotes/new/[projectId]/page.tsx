import { UUID } from "crypto";
import { v4 as uuidv4 } from "uuid";
import { redirect } from "next/navigation";

type PageProps = {
  params: Promise<{ projectId: UUID }>;
};

export default async function page({ params }: PageProps) {
  const { projectId } = await params;
  const newQuoteId = uuidv4();

  redirect(`/admin/dashboard/quotes/new/${projectId}/${newQuoteId}/1`);

  return <div>page</div>;
}
