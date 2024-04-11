import { drizzle } from "drizzle-orm/postgres-js";
import * as schema from "./schema";
import { createClient } from "@/drizzle/client";

export const client = createClient();
export const db = drizzle(client, { schema, logger: true });
