"use client";

import { UUID } from "crypto";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Loader2, Save } from "lucide-react";
import saveQuoteToSupabase from "./saveQuoteToSupabase";
import { useToast } from "@/components/ui/use-toast";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationLink,
  PaginationNext,
} from "@/components/ui/pagination";

type QuotePaginationProps = {
  steps: { el_1: string | null }[];
  params: { projectId: UUID; quoteId: UUID; currentStep: string };
};

export default function QuotePagination({
  steps,
  params: { quoteId, projectId, currentStep },
}: QuotePaginationProps) {
  const totalSteps = steps.length;

  const router = useRouter();
  const { toast } = useToast();
  const [loadingStep, setLoadingStep] = useState<string | null>(null);

  async function saveQuote(href: string, step: string) {
    const quoteInputs = localStorage.getItem(`quoteInputs-${quoteId}`);
    const quoteFlags = localStorage.getItem(`quoteFlags-${quoteId}`);

    toast({
      title: "Saving quote...",
    });
    setLoadingStep(step);

    try {
      await saveQuoteToSupabase({
        quoteId,
        projectId,
        quoteInputs,
        quoteFlags,
      });
    } catch (error) {
      setLoadingStep(null);
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
    <Pagination className="mt-12">
      <PaginationContent>
        {steps[parseInt(currentStep) - 2]?.el_1 && (
          <PaginationItem className="relative">
            {loadingStep === "prev" && (
              <div className="absolute -top-1/2 left-1/2 -translate-x-1/2">
                <Loader2 className="size-4 animate-spin text-accent-primary" />
              </div>
            )}
            <PaginationPrevious
              onClick={(event) => {
                event.preventDefault();
                saveQuote(`./${parseInt(currentStep) - 1}`, "prev");
              }}
              className="text-accent-primary-dark"
              href={`./${parseInt(currentStep) - 1}`}
            />
          </PaginationItem>
        )}

        {Array.from({ length: totalSteps }, (_, index) => {
          const step = index + 1;
          return (
            <PaginationItem key={step} className="relative">
              {loadingStep === `./${step}` && (
                <div className="absolute -top-1/2 left-1/2 -translate-x-1/2">
                  <Loader2 className="size-4 animate-spin text-accent-primary" />
                </div>
              )}
              <PaginationLink
                onClick={(event) => {
                  event.preventDefault();
                  saveQuote(
                    step === parseInt(currentStep) ? "#!" : `./${step}`,
                    `./${step}`,
                  );
                }}
                href={step === parseInt(currentStep) ? "#!" : `./${step}`}
                isActive={step === parseInt(currentStep)}
              >
                {step}
              </PaginationLink>
            </PaginationItem>
          );
        })}

        {steps[parseInt(currentStep)]?.el_1 && (
          <PaginationItem className="relative">
            {loadingStep === "next" && (
              <div className="absolute -top-1/2 left-1/2 -translate-x-1/2">
                <Loader2 className="size-4 animate-spin text-accent-primary" />
              </div>
            )}
            <PaginationNext
              onClick={(event) => {
                event.preventDefault();
                saveQuote(`./${parseInt(currentStep) + 1}`, "next");
              }}
              className="text-accent-primary-dark"
              href={`./${parseInt(currentStep) + 1}`}
            />
          </PaginationItem>
        )}

        <PaginationItem className="relative">
          {loadingStep === "quote-summary" && (
            <div className="absolute -top-1/2 left-1/2 -translate-x-1/2">
              <Loader2 className="size-4 animate-spin text-accent-primary" />
            </div>
          )}
          <PaginationLink
            className="ml-12 w-fit px-2"
            onClick={(event) => {
              event.preventDefault();
              saveQuote("./quote-summary", "quote-summary");
            }}
            href="./quote-summary"
          >
            <Save className="mr-2 size-4" />
            Review
          </PaginationLink>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
