import Image from "next/image";
import Link from "next/link";
import SignOutButton from "../atoms/SignOutButton";
import { createClient } from "@/utils/supabase/server";

export default async function SidebarUserMenu() {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    return <Link href="/login">Login</Link>;
  }

  return (
    <div>
      <p>Hello {data.user.email}</p>
      <Image
        src={data.user.user_metadata.avatar_url}
        alt="User avatar"
        width={32}
        height={32}
      />
      <SignOutButton />
    </div>
  );
}
