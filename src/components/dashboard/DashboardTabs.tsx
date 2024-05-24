import Link from "next/link";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";

type dashboardTabsProps = {
  variant: "quotes" | "people" | "rates";
  defaultValue: string;
};

export default function DashboardTabs({
  variant,
  defaultValue,
}: dashboardTabsProps) {
  let routes = {};

  if (variant === "quotes") {
    routes = {
      quoteRequests: "/admin/dashboard/quote-requests",
      quotes: "/admin/dashboard/quotes",
    };
  }

  if (variant === "people") {
    routes = {
      clients: "/admin/dashboard/clients",
      contractors: "/admin/dashboard/contractors",
    };
  }

  if (variant === "rates") {
    routes = {
      rates: "/admin/dashboard/rates",
    };
  }

  return (
    <Tabs defaultValue={defaultValue}>
      <TabsList>
        {Object.keys(routes).map((route) => (
          <Link key={route} href={routes[route as keyof typeof routes]}>
            <TabsTrigger className="capitalize" value={route}>
              {(routes[route as keyof typeof routes] as string)
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
