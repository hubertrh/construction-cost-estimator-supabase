import DashboardMenu from "@/components/dashboard/DashboardMenu";
import { adminContractorsColumns } from "@/components/projectsDataTable/AdminContractorsColumns";
import { DataTable } from "@/components/projectsDataTable/DataTable";
import { createClient } from "@/utils/supabase/server";

export default async function Contractors() {
  const supabase = createClient();

  const { data: contractors, error: contractorsError } = await supabase
    .from("profiles")
    .select("id, name, email")
    .eq("app_role", "contractor")
    .order("name");

  if (contractorsError) {
    console.error(contractorsError);
    return <div>Error loading contractors</div>;
  }

  console.log(`contractors`, contractors);

  return (
    <div>
      <h1 className="mb-6 text-2xl">Dashboard</h1>
      <DashboardMenu defaultValue="contractors" />
      <div className="container mx-auto min-w-[50rem] py-4">
        <DataTable
          columns={adminContractorsColumns}
          data={contractors}
          tableVariant="contractors"
        />
      </div>
    </div>
  );
}
