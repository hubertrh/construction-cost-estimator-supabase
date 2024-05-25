import { UUID } from "crypto";
import { redirect } from "next/navigation";

type PageProps = {
  params: { projectId: UUID; quoteId: UUID };
};

export default function page({ params }: PageProps) {
  redirect(
    `/admin/dashboard/quotes/new/${params.projectId}/${params.quoteId}/1`,
  );

  return <div>page</div>;
}
