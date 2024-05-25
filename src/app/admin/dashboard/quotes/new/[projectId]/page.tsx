import { UUID } from "crypto";
import { v4 as uuidv4 } from "uuid";
import { redirect } from "next/navigation";

type PageProps = {
  params: { projectId: UUID };
};

export default function page({ params }: PageProps) {
  const newQuoteId = uuidv4();

  redirect(`/admin/dashboard/quotes/new/${params.projectId}/${newQuoteId}/1`);

  return <div>page</div>;
}
