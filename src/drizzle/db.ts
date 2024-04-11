import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

// Disable prefetch as it is not supported for "Transaction" pool mode
export const client = postgres(process.env.POSTGRES_URL as string, {
  prepare: false,
});
export const db = drizzle(client, { schema, logger: true });
