"use client";

import { useState } from "react";
import { Badge } from "../../ui/badge";

type QuoteTitleWithRefProps = {
  projectName: string;
  projectReference: string;
};

export default function QuoteTitleWithRef({
  projectName,
  projectReference,
}: QuoteTitleWithRefProps) {
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
    <div className="sticky top-0 z-10 min-w-[28rem] bg-background-light pb-1 pt-4">
      <p className="-mb-3 text-left font-bold text-gray">
        {"// "}
        {projectName}
      </p>
      <div className="flex items-center justify-between gap-8">
        <h1 className="text-2xl font-medium">New Quote</h1>
        <div className="flex items-center gap-2">
          <p className="mt-1 text-gray-500">Project Ref:</p>
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
    </div>
  );
}
