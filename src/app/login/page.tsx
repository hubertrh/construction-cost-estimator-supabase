"use client";

import { createClient } from "@/utils/supabase/client";

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
    <div>
      <button onClick={() => handleLoginWithOAuth("google")}>
        Login with Google
      </button>
    </div>
  );
}
