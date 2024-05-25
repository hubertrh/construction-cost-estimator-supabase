import DashboardMenu from "@/components/dashboard/DashboardMenu";

export default function Rates() {
  return (
    <div>
      <h1 className="mb-6 text-2xl">Dashboard</h1>
      <DashboardMenu defaultValue="rates" />
      <div className="container mx-auto min-w-[50rem] py-4">
        <p>RATES</p>
      </div>
    </div>
  );
}
