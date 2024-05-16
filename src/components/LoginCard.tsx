"use client";

import { useState } from "react";
import { Loader2, Mail } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Divider from "./ui/Divider";
import { Button } from "@/components/ui/button";
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createClient } from "@/utils/supabase/client";
import getCallbackURL from "@/utils/urlHelpers";
import googleIcon from "/public/icons/google.svg";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [sendingMagicLink, setSendingMagicLink] = useState(false);
  const router = useRouter();
  const callbackURL = getCallbackURL();
  const supabase = createClient();

  const siteURL =
    process?.env?.NEXT_PUBLIC_SITE_URL ?? // Set this to your site URL in production env
    process?.env?.NEXT_PUBLIC_VERCEL_URL ?? // Automatically set by Vercel
    "http://localhost:3000/";

  const handleLoginWithOAuth = async (provider: "google") => {
    await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: callbackURL,
        queryParams: {
          prompt: "select_account",
        },
      },
    });
  };

  const handleLoginWithOTP = async () => {
    setSendingMagicLink(true);

    await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: siteURL,
      },
    });

    router.push("/auth/otp-sent");
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  return (
    <>
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>
          Enter your email to receive a magic link
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="email@example.com"
              required
              onChange={handleEmailChange}
              value={email}
            />
          </div>
          <Button
            className="w-full"
            disabled={sendingMagicLink}
            onClick={() => handleLoginWithOTP()}
          >
            {sendingMagicLink ? (
              <Loader2 className="mr-2 size-4 animate-spin" />
            ) : (
              <Mail className="mr-2 size-4" />
            )}
            Send Magic Link
          </Button>
          <Divider />
          <div className="flex gap-2">
            <Button
              variant="outline"
              className="w-full"
              onClick={() => handleLoginWithOAuth("google")}
            >
              <Image
                className="mr-3"
                src={googleIcon}
                width={20}
                height={20}
                alt="Google icon"
              />
              Continue with Google
            </Button>
            {/* TODO: Add login with Microsoft */}
            {/* <Button
              variant="outline"
              className="w-full"
              onClick={() => handleLoginWithOAuth("google")}
            >
              Google
            </Button> */}
          </div>
        </div>
      </CardContent>
    </>
  );
}
