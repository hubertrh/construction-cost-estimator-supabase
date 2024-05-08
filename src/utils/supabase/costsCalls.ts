import { SupabaseClient } from "@supabase/supabase-js";
import { getContractorsComboboxList } from "../getContractorsComboboxList";

// API call to fetch costs
export async function fetchCosts(
  supabaseClient: SupabaseClient,
  userId: string,
  userRole: string,
) {
  // if (userRole === "admin") {
  const contractors = await fetchAllContractors(supabaseClient);
  if (!contractors) throw new Error("Failed to fetch contractors");

  let contractorsComboboxList = await getContractorsComboboxList({
    contractors,
    supabaseClient,
  });

  const { data: costsData, error: costsError } = await supabaseClient
    .from("contractor_costs")
    .select("*");

  if (costsError) throw new Error("Failed to fetch costs");

  // const { data: defaultCostsData, error: defaultCostsError } =
  //   await supabaseClient
  //     .from("default_costs")
  //     .select("*")
  //     .order("created_at", { ascending: false })
  //     .single();

  // if (defaultCostsError) throw new Error("Failed to fetch default costs");

  return {
    contractorsComboboxList,
    costsData,
  };
}

export async function fetchAllContractors(supabaseClient: SupabaseClient) {
  const { data, error } = await supabaseClient
    .from("profiles")
    .select("id, name, contractor_costs(id)")
    .not("contractor_costs", "is", null);

  if (error) throw new Error("Failed to fetch contractors");

  const formattedData = data.map((contractor: any) => {
    return {
      id: contractor.id,
      name: contractor.name,
      contractor_costs: {
        id: contractor.contractor_costs.id,
      },
    };
  });

  return formattedData;
}
