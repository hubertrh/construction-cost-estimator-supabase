import Link from "next/link";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";

const routes = {
  quoteRequests: "/admin/dashboard/quote-requests",
  quotes: "/admin/dashboard/quotes",
  clients: "/admin/dashboard/clients",
  contractors: "/admin/dashboard/contractors",
  rates: "/admin/dashboard/rates",
};

export default function DashboardTabs({
  defaultValue,
}: {
  defaultValue: string;
}) {
  return (
    <Tabs defaultValue={defaultValue}>
      <TabsList>
        {Object.keys(routes).map((route) => (
          <Link key={route} href={routes[route as keyof typeof routes]}>
            <TabsTrigger className="capitalize" value={route}>
              {routes[route as keyof typeof routes]
                .split("/")
                .pop()
                ?.replace("-", " ")}
            </TabsTrigger>
          </Link>
        ))}
      </TabsList>
    </Tabs>
  );
}
