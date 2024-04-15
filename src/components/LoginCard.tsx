"use client";

import { useState } from "react";
import { Mail } from "lucide-react";
import Image from "next/image";
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
import getCallbackURL from "@/utils/url-helpers";
import googleIcon from "/public/icons/google-blue.svg";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const callbackURL = getCallbackURL();
  const supabase = createClient();

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
    console.log(callbackURL);

    await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: "http://localhost:3000/",
      },
    });
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
              value={email} // Controlled component
            />
          </div>
          <Button className="w-full" onClick={() => handleLoginWithOTP()}>
            <Mail className="mr-2 size-4" />
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
            {/* TODO: */}
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
