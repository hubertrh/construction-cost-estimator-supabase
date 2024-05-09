"use client";

import { useState } from "react";
import { Badge } from "./badge";

type HoverBadgeProps = {
  label: string;
  reference: string;
};

export default function HoverBadge({ label, reference }: HoverBadgeProps) {
  const [hoverStatus, setHoverStatus] = useState(false);
  const [copyStatus, setCopyStatus] = useState("");

  const handleCopy = () => {
    navigator.clipboard.writeText(reference);
    setCopyStatus("copied");
    setTimeout(() => {
      setCopyStatus("");
    }, 1000);
  };

  const handleHover = () => {
    setHoverStatus(!hoverStatus);
  };

  return (
    <div className="flex items-center gap-2">
      <p className="mt-1 text-gray-500">{label}:</p>
      <Badge
        className="w-20 cursor-pointer text-center uppercase"
        onMouseEnter={handleHover}
        onMouseLeave={handleHover}
        onClick={handleCopy}
      >
        {copyStatus === "copied" ? "Copied" : hoverStatus ? "Copy" : reference}
      </Badge>
    </div>
  );
}
