import Image from "next/image";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import SignOutButton from "@/components/ui/SignOutButton";

export default async function page() {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/auth/login");
  }

  // Extract the part of the URL before the '='
  let avatarURL = data.user.user_metadata.picture;
  let equalsIndex = avatarURL.indexOf("=");
  let trimmedAvatarUrl = avatarURL.slice(0, equalsIndex);

  return (
    <div className="grid place-items-center gap-12">
      <div className="flex items-center">
        <div className="relative aspect-square size-48">
          <Image
            className="aspect-square rounded-full"
            src={trimmedAvatarUrl}
            alt="User avatar"
            fill
          />
        </div>
        <div className="ml-8 text-left">
          <h1 className="p-1 text-2xl font-semibold">
            {data.user.user_metadata.full_name}
          </h1>
          <p className="p-1 font-light">{data.user.email}</p>
        </div>
      </div>
      <SignOutButton />
    </div>
  );
}
