"use server";

export default async function getVercelURL() {
  const vercelUrl = process.env.VERCEL_URL;
  const formattedUrl = vercelUrl?.startsWith("http")
    ? vercelUrl
    : `https://${vercelUrl}`;

  return formattedUrl;
}
