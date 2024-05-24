import { createClient } from "@/utils/supabase/server";
import { DataTable } from "@/components/projectsDataTable/DataTable";
import DashboardTabs from "@/components/dashboard/DashboardTabs";
import { adminQuotesColumns } from "@/components/projectsDataTable/AdminQuotesColumns";

export default async function Quotes() {
  const supabase = createClient();

  const { data: quotes, error: quotesError } = await supabase
    .from("quotes")
    .select("*")
    .order("created_at", { ascending: false });

  if (quotesError) {
    console.error(quotesError);
    return <p>Failed to fetch quotes</p>;
  }

  const { data: profiles, error: profilesError } = await supabase
    .from("profiles")
    .select("id, name");

  if (profilesError) {
    console.error(profilesError);
    return <p>Failed to fetch profiles</p>;
  }

  const quotesWithName = quotes.map((quote) => {
    const quoteContractor = profiles.find(
      (profile) => profile.id === quote.contractor_id,
    );

    if (quoteContractor) {
      const quoteWithName = { ...quote, contractor_name: quoteContractor.name };
      return quoteWithName;
    }

    const quoteWithName = { ...quote, contractor_name: null };
    return quoteWithName;
  });

  return (
    <div>
      <h1 className="mb-6 text-2xl">Dashboard</h1>
      <DashboardTabs defaultValue="quotes" />
      <div className="container mx-auto min-w-[50rem] py-4">
        <DataTable
          columns={adminQuotesColumns}
          data={quotesWithName}
          tableVariant="quotes"
        />
      </div>
    </div>
  );
}
