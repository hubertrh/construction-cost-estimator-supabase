"use client";

import { UUID } from "crypto";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import saveQuoteToSupabase from "./saveQuoteToSupabase";
import { useToast } from "@/components/ui/use-toast";

type QuoteBreadcrumbsButtonProps = {
  href: string;
  quoteId: UUID;
  projectId: UUID;
  children: React.ReactNode;
};

export default function QuoteBreadcrumbsButton({
  href,
  quoteId,
  projectId,
  children,
}: QuoteBreadcrumbsButtonProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [isSaving, setIsSaving] = useState(false);

  async function saveQuote() {
    const quoteInputs = localStorage.getItem(`quoteInputs-${quoteId}`);
    const quoteFlags = localStorage.getItem(`quoteFlags-${quoteId}`);

    toast({
      title: "Saving quote...",
    });
    setIsSaving(true);

    try {
      await saveQuoteToSupabase({
        quoteId,
        projectId,
        quoteInputs,
        quoteFlags,
      });
    } catch (error) {
      setIsSaving(false);
      toast({
        title: "❗️\u2003Failed to save quote",
      });
      return;
    }

    toast({
      title: "🎉\u2003Quote saved!",
    });

    router.push(href);
    router.refresh();
  }

  return (
    <button className="relative cursor-pointer text-gray" onClick={saveQuote}>
      {isSaving && (
        <div className="absolute -top-1/2 left-1/2 -translate-x-1/2">
          <Loader2 className="size-4 animate-spin text-accent-primary" />
        </div>
      )}
      {children}
    </button>
  );
}
