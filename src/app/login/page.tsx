"use client";

import getVercelURL from "../api/get-vercel-url";
import { createClient } from "@/utils/supabase/client";
import googleIcon from "/public/icons/google.svg";
import ButtonPrimary from "@/components/atoms/ButtonPrimary";

export default function LoginPage() {
  const handleLoginWithOAuth = async (provider: "google") => {
    const vercelUrl = await getVercelURL();
    const supabase = createClient();
    console.log(`${vercelUrl}/auth/callback`);
    await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${vercelUrl}/auth/callback`,
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
