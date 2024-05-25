import isValidUUID from "../uuidHelpers";
import { createClient } from "./client";

export async function updateProjectStatus(
  projectId: string,
  status: "pending" | "ready" | "cancelled" | "on hold" | undefined,
): Promise<boolean> {
  if (!isValidUUID(projectId)) {
    console.error("Invalid project ID");
    return false;
  }

  if (!status) {
    console.error("No status provided");
    return false;
  }

  const validStatuses = ["pending", "ready", "cancelled", "on hold"];

  if (!validStatuses.includes(status)) {
    console.error(`Invalid status: ${status}`);
    return false;
  }

  const supabase = createClient();

  try {
    const { data: updatedData, error } = await supabase
      .from("projects")
      .update({ project_status: status })
      .eq("id", projectId)
      .select("project_status");

    if (error) {
      const errorMessage = `Failed to update project status: ${error.message}`;
      throw new Error(errorMessage);
    }

    if (updatedData.length > 0) {
      console.log("Update successful");
      console.log(
        `Updated project status to: ${updatedData[0].project_status}`,
      );
      return true;
    }

    console.log("No data found to update");
    return false;
  } catch (err) {
    console.error("Error updating project status:", err);
    return false;
  }
}
