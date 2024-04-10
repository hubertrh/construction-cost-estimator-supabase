"use client";

import { useSignOut } from "@/hooks/useSignOut";

export default function SignOutButton() {
  return <button onClick={useSignOut}>Sign out</button>;
}
