"use client";

import Image from "next/image";
import { useState } from "react";

export default function SidebarArrow() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleClick = () => {
    const transformValue = isCollapsed ? "0%" : "-95%";
    const marginValue = isCollapsed ? "20rem" : "1rem";
    const rotateValue = isCollapsed ? "-45deg" : "135deg";
    document.documentElement.style.setProperty(
      "--sidebar-transform",
      transformValue,
    );
    document.documentElement.style.setProperty(
      "--main-margin-left",
      marginValue,
    );
    document.documentElement.style.setProperty("--arrow-rotate", rotateValue);

    setIsCollapsed(!isCollapsed);
  };

  return (
    <button
      className="absolute -right-5 bottom-4 grid size-10 -rotate-45 place-items-center rounded-ss-full bg-accent-primary transition-all duration-300 hover:bg-accent-primary-dark"
      onClick={handleClick}
    >
      <Image
        className="sidebar__arrow"
        src={"/icons/arrow-full.svg"}
        alt="Menu arrow"
        width={10}
        height={10}
      />
    </button>
  );
}
