import Image from "next/image";
import Link from "next/link";
import projectIcon from "/public/icons/project.svg";

type ProjectLinkProps = {
  id: string;
  project_name: string;
};

export default function ProjectLink({
  project,
}: {
  project: ProjectLinkProps;
}) {
  return (
    <div>
      <Link
        href={`/projects/${project.id}`}
        key={project.id}
        className="flex items-center justify-start gap-2 py-1 transition-all duration-300 hover:translate-x-1"
      >
        <Image src={projectIcon} alt="Project icon" width={18} height={18} />
        <p className="max-h-6 truncate">{project.project_name}</p>
      </Link>
    </div>
  );
}
