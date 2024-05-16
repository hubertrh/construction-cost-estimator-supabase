"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

function debounce(fn: () => void, ms = 100) {
  let timeout: NodeJS.Timeout;

  return function executedFunction() {
    const later = () => {
      clearTimeout(timeout);
      fn();
    };

    clearTimeout(timeout);
    timeout = setTimeout(later, ms);
  };
}

export default function SidebarArrow() {
  const [isExpanded, setIsExpanded] = useState(true);

  const updateStyles = useCallback(() => {
    const transformValue = isExpanded ? "0%" : "-95%";
    const marginValue = isExpanded ? "20rem" : "1rem";
    const maxWidthValue = isExpanded ? "65vw" : "95vw";
    const rotateValue = isExpanded ? "-45deg" : "135deg";
    document.documentElement.style.setProperty(
      "--sidebar-transform",
      transformValue,
    );
    document.documentElement.style.setProperty(
      "--main-margin-left",
      marginValue,
    );
    document.documentElement.style.setProperty(
      "--main-max-width",
      maxWidthValue,
    );
    document.documentElement.style.setProperty("--arrow-rotate", rotateValue);
  }, [isExpanded]);

  useEffect(() => {
    const isWide = window.innerWidth > 1320;
    setIsExpanded(isWide);
  }, []);

  // Update styles on mount and when isCollapsed changes
  useEffect(() => {
    updateStyles();
  }, [isExpanded, updateStyles]);

  useEffect(() => {
    const handleResize = debounce(() => {
      const isWide = window.innerWidth > 1320;
      setIsExpanded(isWide);
    }, 100);

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  function handleClick() {
    updateStyles();
    setIsExpanded(!isExpanded);
  }

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
