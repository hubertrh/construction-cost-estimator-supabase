import Link from "next/link";
import Image from "next/image";
import { ExternalLink } from "lucide-react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import ProjectTitleWithRef from "./ProjectTitleWithRef";
import { Database } from "@/types/supabase";
import googleDriveIcon from "/public/icons/google-drive.svg";

export default function projectContent({
  fetchedProject,
}: {
  fetchedProject: Database["public"]["Tables"]["projects"]["Row"];
}) {
  return (
    <div className="min-w-[40rem] pb-8 text-left">
      <Badge
        variant={
          fetchedProject.project_status.replace(/\s/g, "") as
            | "pending"
            | "ready"
            | "cancelled"
            | "onhold"
        }
        className="my-1 w-min text-center text-xs uppercase"
      >
        {fetchedProject.project_status}
      </Badge>
      <ProjectTitleWithRef
        projectTitle={fetchedProject.project_name}
        projectReference={fetchedProject.id.slice(-6)}
      />
      <section className="mb-8 flex">
        <div>
          <p className="p-0">{fetchedProject.project_street_address}</p>
          <p className="p-0">{fetchedProject.project_city}</p>
          <p className="p-0">{fetchedProject.project_postcode}</p>
        </div>
      </section>
      <section className="mb-8">
        <p className="pb-0">
          <span className="text-sm text-accent-primary-dark">
            Submitted by&ensp;
          </span>
          {fetchedProject.user_id ? (
            <Link
              className="underline-offset-4 hover:underline"
              href={`/dashboard/users/${fetchedProject.user_id}`}
            >
              {fetchedProject.client_name}
            </Link>
          ) : (
            <span>{fetchedProject.client_name}</span>
          )}
          <span className="text-sm text-accent-primary-dark">
            &emsp;&ensp;on&ensp;
          </span>
          {new Date(fetchedProject.created_at).toLocaleDateString()}
        </p>
        <p>
          <span className="text-sm text-accent-primary-dark">
            Client Email:&ensp;
          </span>
          <a
            className="underline-offset-4 hover:underline"
            href={`mailto:${fetchedProject.client_email}`}
          >
            {fetchedProject.client_email}
          </a>
        </p>
      </section>
      <section>
        {fetchedProject.project_description ? (
          <>
            <p className="text-sm text-accent-primary-dark">
              Project Description
            </p>
            <p className="mb-4 text-justify">
              {fetchedProject.project_description}
            </p>
          </>
        ) : (
          <p className="text-gray">
            <span className="text-sm text-accent-primary-dark/60">
              Project Description:&ensp;
            </span>
            Not provided
          </p>
        )}
      </section>
      <section>
        <p className={`${fetchedProject.project_description ? "mb-4" : ""}`}>
          <span className="text-sm text-accent-primary-dark">
            Project Desired OHP:&ensp;
          </span>
          {fetchedProject.desired_ohp}%
        </p>
        {fetchedProject.contractor_preliminaries ? (
          <>
            <p className="text-sm text-accent-primary-dark">
              Contractor&apos;s Custom Preliminaries
            </p>
            <p className="mb-4 text-justify">
              {fetchedProject.contractor_preliminaries}
            </p>
          </>
        ) : (
          <p className="mb-4 text-gray">
            <span className="text-sm text-accent-primary-dark/60">
              Contractor&apos;s Custom Preliminaries:&ensp;
            </span>
            Not provided
          </p>
        )}
      </section>
      <section>
        <Button className="my-5" variant={"outline"} asChild>
          <a
            href={fetchedProject.google_drive_folder_link}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className="mr-2"
              src={googleDriveIcon}
              alt="Google Drive Icon"
              width={24}
              height={24}
            />
            View Uploaded Files
            <ExternalLink className="ml-2 size-3" />
          </a>
        </Button>
      </section>
    </div>
  );
}
