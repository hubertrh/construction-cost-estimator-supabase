import postgres from "postgres";

export function createClient() {
  const connectionString = process.env.DATABASE_URL;

  if (!connectionString) {
    throw new Error("DATABASE_URL is not set");
  }

  // Disable prefetch as it is not supported for "Transaction" pool mode
  return postgres(connectionString, {
    prepare: false,
  });
}
