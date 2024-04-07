"use client";

import Link from "next/link";

export default function LoginBtn() {
  return (
    <>
      {/* <button onClick={() => signIn("google")}>Sign In with Google</button> */}
      <Link href="/api/auth/signin">Sign In</Link>
    </>
  );
}
