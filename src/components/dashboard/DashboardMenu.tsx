import DashboardTabs from "./DashboardTabs";

type DashboardMenuProps = {
  defaultValue:
    | "quoteRequests"
    | "quotes"
    | "clients"
    | "contractors"
    | "rates";
};

export default function DashboardMenu({ defaultValue }: DashboardMenuProps) {
  return (
    <div className="flex items-center justify-center gap-6">
      <DashboardTabs variant="quotes" defaultValue={defaultValue} />
      <DashboardTabs variant="people" defaultValue={defaultValue} />
      <DashboardTabs variant="rates" defaultValue={defaultValue} />
    </div>
  );
}
