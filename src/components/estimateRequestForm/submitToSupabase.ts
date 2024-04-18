"use server";

import { UUID } from "crypto";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "@/utils/supabase/client";

type submitToSupabaseProps = {
  projectID: UUID;
  clientName: string;
  clientEmail: string;
  projectName: string;
  projectStreetAddress: string;
  projectCity: string;
  projectPostcode: string;
  projectDescription: string;
  desiredOHP: number;
  contractorPreliminaries: string;
  googleDriveFolderID: string;
  userID: string | null;
};

export default async function submitToSupabase({
  projectID,
  clientName,
  clientEmail,
  projectName,
  projectStreetAddress,
  projectCity,
  projectPostcode,
  projectDescription,
  desiredOHP,
  contractorPreliminaries,
  googleDriveFolderID,
  userID,
}: submitToSupabaseProps) {
  const supabase = createClient();

  const { error } = await supabase.from("projects").insert({
    id: projectID,
    client_name: clientName,
    client_email: clientEmail,
    project_name: projectName,
    project_street_address: projectStreetAddress,
    project_city: projectCity,
    project_postcode: projectPostcode,
    project_description: projectDescription,
    desired_ohp: desiredOHP,
    contractor_preliminaries: contractorPreliminaries,
    google_drive_folder_link: `https://drive.google.com/drive/folders/${googleDriveFolderID}`,
    user_id: userID,
  });

  if (error) {
    throw new Error("Failed to submit project to Supabase");
  }

  revalidatePath("/projects");
  redirect("/projects");
}
