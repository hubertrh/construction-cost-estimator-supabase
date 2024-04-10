import Image from "next/image";
import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";
import ButtonPrimary from "@/components/atoms/ButtonPrimary";
import { users } from "@/drizzle/schema";

export default async function Home() {
  /* const connectionString = process.env.DATABASE_URL;

  // Disable prefetch as it is not supported for "Transaction" pool mode
  if (!connectionString) {
    throw new Error("DATABASE_URL is not set");
  }

  const client = postgres(connectionString, {
    prepare: false,
  });
  const db = drizzle(client);

  await migrate(db, { migrationsFolder: "drizzle" });

  const allUsers = await db.select().from(users);
  console.log(allUsers);

  await client.end(); */

  const addIcon = (
    <Image src="/icons/add.svg" width={16} height={16} alt="Add icon" />
  );

  return (
    <>
      <div className="grid place-items-center px-14 py-24">
        <h1 className="text-4xl font-light">WELCOME TO ESTIMATIC</h1>
        <h2 className="text-lg">
          —&ensp;a tool engineered for accurate construction cost estimations
        </h2>
        <div className="flex flex-row gap-10 pt-10">
          <ButtonPrimary variant="blue" icon={addIcon} position="left">
            Create New Estimate
          </ButtonPrimary>
          {/* <ButtonPrimary variant="white">Browse Recent</ButtonPrimary> */}
        </div>
      </div>
    </>
  );
}
