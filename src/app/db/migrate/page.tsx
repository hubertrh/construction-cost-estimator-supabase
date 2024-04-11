import { redirect } from "next/navigation";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import { createClient } from "@/utils/supabase/server";
import { projects } from "@/drizzle/schema";
import { client, db } from "@/drizzle/db";

export default async function PrivatePage() {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user || data.user.email !== process.env.ADMIN_EMAIL) {
    redirect("/login");
  }

  await migrate(db, { migrationsFolder: "drizzle" });
  const allProjects = await db.select().from(projects);
  console.log(allProjects);
  await client.end();

  return <p>Migration successful!</p>;
}
