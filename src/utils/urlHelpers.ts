export default function getCallbackURL() {
  let url =
    process?.env?.NEXT_PUBLIC_SITE_URL ?? // Set this to your site URL in production env
    process?.env?.NEXT_PUBLIC_VERCEL_URL ?? // Automatically set by Vercel
    "http://localhost:3000/";
  // Include `https://` when not localhost
  url = url.includes("http") ? url : `https://${url}`;
  // Include a trailing `/`
  url = url.charAt(url.length - 1) === "/" ? url : `${url}/`;
  // Append the callback path
  url = `${url}auth/callback/`;
  return url;
}
