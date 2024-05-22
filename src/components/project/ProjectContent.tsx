import Link from "next/link";
import Image from "next/image";
import { ExternalLink, Plus } from "lucide-react";
import { Button } from "../ui/button";
import Divider from "../ui/Divider";
import ProjectTitleWithRef from "./ProjectTitleWithRef";
import ProjectStatusDropdownMenu from "./ProjectStatusDropdownMenu";
import { Database } from "@/types/supabase";
import googleDriveIcon from "/public/icons/google-drive.svg";
import { createClient } from "@/utils/supabase/client";

export default async function projectContent({
  fetchedProject,
  userRole,
  isProjectOwner,
}: {
  fetchedProject: Database["public"]["Tables"]["projects"]["Row"];
  userRole: string | null;
  isProjectOwner: boolean;
}) {
  const supabase = createClient();

  // fetch quotes with respective project id from supabase quotes table
  const { data: quotesData, error: quotesError } = await supabase
    .from("quotes")
    .select("*")
    .eq("project_id", fetchedProject.id);

  if (quotesError) {
    console.error(quotesError);
    console.error(`Failed to fetch quotes for project: ${fetchedProject.id}`);
    return <p>Failed to fetch quotes</p>;
  }

  return (
    <div className="min-w-[40rem] pb-8 text-left">
      <div className={userRole === "admin" ? "" : "pointer-events-none"}>
        <ProjectStatusDropdownMenu fetchedProject={fetchedProject} />
      </div>
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
          {/* TODO: Implement for admins */}
          {/* {fetchedProject.user_id ? (
            <Link
              className="underline-offset-4 hover:underline"
              href={`/dashboard/users/${fetchedProject.user_id}`}
            >
              {fetchedProject.client_name}
            </Link>
          ) : ( */}
          <span>{fetchedProject.client_name}</span>
          {/* )} */}
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
      <div className="pb-5 pt-4">
        <Divider />
      </div>
      <section>
        {/* FIXME: */}
        <div className="flex items-center justify-between gap-12">
          <h2 className="text-2xl">Quotes</h2>
          <Button asChild className={userRole === "admin" ? "" : "hidden"}>
            <Link href={`/dashboard/quotes/new/${fetchedProject.id}`}>
              <Plus className="mr-2 size-4" />
              Create New Quote
            </Link>
          </Button>
        </div>
        {isProjectOwner || userRole === "admin" ? (
          <div>
            {quotesData.length === 0 ? (
              <p>No quotes available for this project</p>
            ) : (
              <ul>
                {quotesData.map((quote) => (
                  <li key={quote.id}>
                    <Link href={`/dashboard/quotes/${quote.id}`}>
                      <p>
                        Quote ID:{" "}
                        <span className="font-semibold uppercase">
                          {quote.id.slice(-6)}
                        </span>
                      </p>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ) : (
          <p>Only the project owner can view quotes</p>
        )}
      </section>
    </div>
  );
}
