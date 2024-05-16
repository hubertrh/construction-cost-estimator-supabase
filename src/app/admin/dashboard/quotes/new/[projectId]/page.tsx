import { UUID, randomUUID } from "crypto";
import { redirect } from "next/navigation";

type PageProps = {
  params: { projectId: UUID };
};

export default function page({ params }: PageProps) {
  const newQuoteId = randomUUID();

  redirect(`/admin/dashboard/quotes/new/${params.projectId}/${newQuoteId}/1`);

  return <div>page</div>;
}
