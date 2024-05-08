"use client";

import { UUID } from "crypto";
import { useState } from "react";
import { RefreshCw } from "lucide-react";
import { Badge } from "../../ui/badge";
import QuoteCombobox from "./QuoteCombobox";

type QuoteTitleWithRefProps = {
  userId: UUID;
  projectName: string;
  projectReference: string;
  onChange: (value: string) => void;
  contractorsComboboxList: {
    label: string;
    value: string;
    costId: UUID;
    userId: UUID;
  }[];
};

export default function QuoteTitleWithRef({
  userId,
  projectName,
  projectReference,
  onChange,
  contractorsComboboxList,
}: QuoteTitleWithRefProps) {
  const [refCopyStatus, setRefCopyStatus] = useState("");
  const [refHoverStatus, setRefHoverStatus] = useState(false);
  const [selectedValue, setSelectedValue] = useState("");

  // const handleDropdownChange = (e: ChangeEvent<HTMLSelectElement>) => {
  //   const value = e.target.value;
  //   setSelectedValue(value);
  //   // Pass the value to the parent component
  //   onChange(value);
  // };

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
      <div className="-mb-3 flex items-center justify-between gap-8">
        <p className="truncate font-bold text-gray">
          {"// "}
          {projectName}
        </p>
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
      <div className="flex items-center justify-between gap-8">
        <div className="flex items-center">
          <h1 className="text-2xl font-medium">New Quote&emsp;</h1>
          <QuoteCombobox
            userId={userId}
            contractorsComboboxList={contractorsComboboxList}
            onChange={onChange}
          />
        </div>
        <div className="flex items-center">
          {/* TODO: */}
          <h2 className="p-0 text-2xl font-medium">~£125,000</h2>
          <RefreshCw className="ml-2 size-5 cursor-pointer text-gray hover:text-accent-primary-dark" />
        </div>
      </div>
    </div>
  );
}
