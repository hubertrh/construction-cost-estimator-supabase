import Image from "next/image";
import Link from "next/link";
import Divider from "../ui/Divider";
import { createClient } from "@/utils/supabase/server";
import signInIcon from "/public/icons/sign-in.svg";
import avatarIcon from "/public/icons/avatar.svg";
import addFilledIcon from "/public/icons/add-filled.svg";
import dashboardIcon from "/public/icons/dashboard.svg";
import { fetchUserRole } from "@/utils/supabase/userCalls";

export default async function SidebarUserMenu() {
  const supabase = createClient();
  const { data: userData, error: userError } = await supabase.auth.getUser();

  if (userError || !userData?.user) {
    return (
      <>
        <Link
          className="mx-3 flex items-center gap-2 transition-all duration-300 hover:translate-x-1"
          href={"/new-estimate-request"}
        >
          <Image
            src={addFilledIcon}
            width={26}
            height={26}
            alt="New Estimate Request icon"
          />
          <p>New Estimate Request</p>
        </Link>
        <Divider color="light" />
        <div className="mx-3 flex items-center justify-between">
          <Link
            className="flex items-center gap-2 transition-all duration-300 hover:translate-x-1"
            href="/auth/login"
          >
            <Image src={signInIcon} width={24} height={24} alt="Sign in icon" />
            <p>SIGN IN</p>
          </Link>
          <Link
            className="rounded-full transition-all duration-300 hover:scale-110 hover:shadow-xl"
            href="/auth/login"
          >
            <Image src={avatarIcon} width={40} height={40} alt="Avatar icon" />
          </Link>
        </div>
      </>
    );
  }

  const userRole = await fetchUserRole(supabase, userData.user.id);

  if (!userRole) {
    throw new Error("User role not found");
  }

  return (
    <>
      {userRole === "client" && (
        <Link
          className="mx-3 flex items-center gap-2 transition-all duration-300 hover:translate-x-1"
          href={"/new-estimate-request"}
        >
          <Image
            src={addFilledIcon}
            width={26}
            height={26}
            alt="New Estimate Request icon"
          />
          <p>New Estimate Request</p>
        </Link>
      )}
      <Divider color="light" />
      <div className="mx-3 flex items-center justify-between">
        {userRole === "client" && (
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
            <p>MY PROJECTS</p>
          </Link>
        )}
        {userRole === "admin" && (
          <Link
            className="flex items-center gap-2 transition-all duration-300 hover:translate-x-1"
            href="/admin/dashboard"
          >
            <Image
              src={dashboardIcon}
              width={26}
              height={26}
              alt="Dashsboard icon"
            />
            <p>DASHBOARD</p>
          </Link>
        )}
        <Link
          className="rounded-full transition-all duration-300 hover:scale-110 hover:shadow-xl"
          href="/account"
        >
          <Image
            className="rounded-full"
            src={userData.user.user_metadata.avatar_url ?? avatarIcon}
            width={40}
            height={40}
            alt="User avatar"
          />
        </Link>
      </div>
    </>
  );
}
