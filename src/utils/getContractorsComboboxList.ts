import { UUID } from "crypto";
import { SupabaseClient } from "@supabase/supabase-js";
import { fetchAdmins } from "./supabase/userCalls";

type getContractorsComboboxListProps = {
  contractors: {
    name: string;
    id: UUID;
    contractor_costs: {
      id: UUID;
    };
  }[];
  supabaseClient: SupabaseClient;
};

export async function getContractorsComboboxList({
  contractors,
  supabaseClient,
}: getContractorsComboboxListProps) {
  contractors.map((contractor) => {});
  let array = contractors.map((contractor) => ({
    label: contractor.name,
    value: contractor.name,
    costId: contractor.contractor_costs.id,
    userId: contractor.id,
  }));

  const admins = await fetchAdmins(supabaseClient);
  const adminIds = admins.map((admin) => admin.id);
  const frontItems = array.filter((item) => adminIds.includes(item.userId));
  const remainingItems = array.filter(
    (item) => !adminIds.includes(item.userId),
  );
  const newArray = frontItems.concat(remainingItems);

  return newArray;
}
