import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { fetchUserRole } from "@/utils/supabase/userCalls";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createClient();

  const { data: userData, error: userError } = await supabase.auth.getUser();
  if (userError || !userData?.user) {
    redirect("/auth/login");
  }

  const userRole = await fetchUserRole(supabase, userData.user.id);
  if (userRole !== "admin") {
    console.warn("Attempted access to an admin route without admin privileges");
    redirect("/auth/login");
  }

  return <>{children}</>;
}
