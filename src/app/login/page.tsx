"use client";

import { createClient } from "@/utils/supabase/client";
import googleIcon from "/public/icons/google.svg";
import ButtonPrimary from "@/components/atoms/ButtonPrimary";

export default function LoginPage() {
  const handleLoginWithOAuth = async (provider: "google") => {
    const supabase = createClient();

    await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: location.origin + "/auth/callback",
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
