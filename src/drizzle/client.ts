import postgres from "postgres";

export function createClient() {
  const connectionString = process.env.POSTGRES_URL;

  if (!connectionString) {
    throw new Error("POSTGRES_URL is not set");
  }

  // Disable prefetch as it is not supported for "Transaction" pool mode
  return postgres(connectionString, {
    prepare: false,
  });
}
