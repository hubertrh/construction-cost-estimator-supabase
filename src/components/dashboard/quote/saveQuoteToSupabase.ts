"use server";

import { UUID } from "crypto";
import { createClient } from "@/utils/supabase/client";

type saveQuoteToSupabaseProps = {
  quoteId: UUID;
  projectId: UUID;
  quoteInputs: string | null;
  quoteFlags: string | null;
  quoteTotalCost: number | null;
};

export default async function saveQuoteToSupabase({
  quoteId,
  projectId,
  quoteInputs,
  quoteFlags,
  quoteTotalCost,
}: saveQuoteToSupabaseProps) {
  const parsedQuoteInputs = quoteInputs ? JSON.parse(quoteInputs) : {};
  const parsedQuoteFlags = quoteFlags ? JSON.parse(quoteFlags) : {};

  const supabase = createClient();

  const { error: saveQuoteError } = await supabase.from("quotes").upsert(
    {
      id: quoteId,
      project_id: projectId,
      quote_inputs: parsedQuoteInputs,
      quote_flags: parsedQuoteFlags,
      quote_total_amount: quoteTotalCost,
    },
    {
      onConflict: "id",
    },
  );

  if (saveQuoteError) {
    console.error(saveQuoteError);
    throw new Error("Failed to save quote to Supabase");
  }
}
