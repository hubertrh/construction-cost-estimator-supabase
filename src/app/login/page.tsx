"use client";

import { createClient } from "@/utils/supabase/client";
import googleIcon from "/public/icons/google.svg";
import ButtonPrimary from "@/components/atoms/ButtonPrimary";

export default function LoginPage() {
  const handleLoginWithOAuth = async (provider: "google") => {
    const supabase = createClient();

    const getURL = () => {
      let url =
        process?.env?.NEXT_PUBLIC_SITE_URL ?? // Set this to your site URL in production env.
        process?.env?.NEXT_PUBLIC_VERCEL_URL ?? // Automatically set by Vercel.
        "http://localhost:3000/";
      // Make sure to include `https://` when not localhost.
      url = url.includes("http") ? url : `https://${url}`;
      // Make sure to include a trailing `/`.
      url = url.charAt(url.length - 1) === "/" ? url : `${url}/`;
      return url;
    };

    await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: getURL(),
        queryParams: {
          prompt: "select_account",
        },
      },
    });
  };

  return (
    <div className="m-20">
      <ButtonPrimary
        variant="white"
        icon={googleIcon}
        size={32}
        alt="Google icon"
        onClick={() => handleLoginWithOAuth("google")}
      >
        Continue with Google
      </ButtonPrimary>
    </div>
  );
}
