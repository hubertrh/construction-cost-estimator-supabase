"use client";

import { useState } from "react";
import { Badge } from "../ui/badge";

type ProjectTitleWithRefProps = {
  projectTitle: string;
  projectReference: string;
};

export default function ProjectTitleWithRef({
  projectTitle,
  projectReference,
}: ProjectTitleWithRefProps) {
  const [refCopyStatus, setRefCopyStatus] = useState("");
  const [refHoverStatus, setRefHoverStatus] = useState(false);

  const handleProjectReferenceCopy = () => {
    navigator.clipboard.writeText(projectReference);
    setRefCopyStatus("copied");
    setTimeout(() => {
      setRefCopyStatus("");
    }, 1000);
  };

  const handleHover = () => {
    setRefHoverStatus(!refHoverStatus);
  };

  return (
    <div className="flex min-w-[28rem] items-center justify-between gap-8">
      <h1 className="text-2xl font-medium">{projectTitle}</h1>
      <div className="flex items-center gap-2">
        <p className="mt-1 text-gray-500">Ref:</p>
        <Badge
          className="w-20 cursor-pointer text-center uppercase"
          onMouseEnter={handleHover}
          onMouseLeave={handleHover}
          onClick={handleProjectReferenceCopy}
        >
          {refCopyStatus === "copied"
            ? "Copied"
            : refHoverStatus
              ? "Copy"
              : projectReference}
        </Badge>
      </div>
    </div>
  );
}
