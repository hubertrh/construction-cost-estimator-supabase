"use server";

export default async function getVercelURL() {
  const vercelUrl = process.env.NEXT_PUBLIC_VERCEL_URL;
  const formattedUrl = vercelUrl?.startsWith("http")
    ? vercelUrl
    : `https://${vercelUrl}`;

  return formattedUrl;
}
