"use client";

import ButtonPrimary from "./ButtonPrimary";
import { useSignOut } from "@/hooks/useSignOut";
import signOutIcon from "/public/icons/sign-out.svg";

export default function SignOutButton() {
  return (
    <ButtonPrimary
      variant="white"
      icon={signOutIcon}
      size={20}
      alt="Sign out icon"
      onClick={useSignOut}
    >
      Sign Out
    </ButtonPrimary>
  );
}
