import Image from "next/image";
import Link from "next/link";
import Divider from "../ui/Divider";
import { createClient } from "@/utils/supabase/server";
import signInIcon from "/public/icons/sign-in.svg";
import avatarIcon from "/public/icons/avatar.svg";
import addFilledIcon from "/public/icons/add-filled.svg";
import dashboardIcon from "/public/icons/dashboard.svg";

export default async function SidebarUserMenu() {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    return (
      <>
        <Link className="mx-3 flex items-center gap-2" href={"/"}>
          <Image
            src={addFilledIcon}
            width={26}
            height={26}
            alt="Create new estimate icon"
          />
          <p>Create New Estimate</p>
        </Link>
        <Divider />
        <div className="mx-3 flex items-center justify-between">
          <Link className="flex items-center gap-2" href="/auth/login">
            <Image src={signInIcon} width={26} height={26} alt="Sign in icon" />
            <p>SIGN IN</p>
          </Link>
          <Link href="/auth/login">
            <Image src={avatarIcon} width={40} height={40} alt="Avatar icon" />
          </Link>
        </div>
      </>
    );
  }

  return (
    <>
      <Link
        className="mx-3 flex items-center gap-2 transition-all duration-300 hover:translate-x-1"
        href={"/"}
      >
        <Image
          src={addFilledIcon}
          width={26}
          height={26}
          alt="Create new estimate icon"
        />
        <p>Create New Estimate</p>
      </Link>
      <Divider />
      <div className="mx-3 flex items-center justify-between">
        <Link
          className="flex items-center gap-2 transition-all duration-300 hover:translate-x-1"
          href="/projects"
        >
          <Image
            src={dashboardIcon}
            width={26}
            height={26}
            alt="Dashsboard icon"
          />
          <p>PROJECTS</p>
        </Link>
        <Link
          className="rounded-full transition-all duration-300 hover:scale-110 hover:shadow-xl"
          href="/account"
        >
          <Image
            className="rounded-full"
            src={data.user.user_metadata.avatar_url ?? avatarIcon}
            width={40}
            height={40}
            alt="User avatar"
          />
        </Link>
      </div>
    </>
  );
}
