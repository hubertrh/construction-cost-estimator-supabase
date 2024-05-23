"use server";

import { revalidatePath } from "next/cache";
import { updateProjectStatus } from "@/utils/supabase/projectCalls";

export default async function handleStatusUpdate(
  fetchedProjectId: string,
  status: "pending" | "ready" | "cancelled" | "on hold",
) {
  updateProjectStatus(fetchedProjectId, status)
    .then((success) => {
      if (success) {
        revalidatePath(`/projects/${fetchedProjectId}`);
        revalidatePath("/admin/projects");
        revalidatePath("/admin/dashboard/quote-requests");

        console.log("Project status updated successfully");
      } else {
        console.log("Failed to update project status");
      }
    })
    .catch((err) => {
      console.error("An error occurred:", err);
    });
}
