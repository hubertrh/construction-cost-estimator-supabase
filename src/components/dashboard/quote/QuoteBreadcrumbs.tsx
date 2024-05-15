import { UUID } from "crypto";
import { ChevronRightIcon } from "lucide-react";
import Link from "next/link";
import QuoteBreadcrumbsButton from "./QuoteBreadcrumbsButton";

type QuoteBreadcrumbsProps = {
  steps: { el_1: string | null }[];
  params: { projectId: UUID; quoteId: UUID; currentStep: string };
};

export default function QuoteBreadcrumbs({
  steps,
  params,
}: QuoteBreadcrumbsProps) {
  const { currentStep } = params;

  return (
    <div className="my-4 flex select-none items-center justify-center gap-2">
      {steps[parseInt(currentStep)]?.el_1 === undefined &&
        steps[parseInt(currentStep) - 2]?.el_1 && (
          <>
            <QuoteBreadcrumbsButton
              href={`./${parseInt(currentStep) - 2}`}
              projectId={params.projectId}
              quoteId={params.quoteId}
            >
              {steps[parseInt(currentStep) - 3].el_1}
            </QuoteBreadcrumbsButton>
            <ChevronRightIcon className="size-6 text-gray" />
          </>
        )}

      {steps[parseInt(currentStep) - 2]?.el_1 && (
        <>
          <QuoteBreadcrumbsButton
            href={`./${parseInt(currentStep) - 1}`}
            projectId={params.projectId}
            quoteId={params.quoteId}
          >
            {steps[parseInt(currentStep) - 2].el_1}
          </QuoteBreadcrumbsButton>
          <ChevronRightIcon className="size-6 text-gray" />
        </>
      )}

      <p className="text-xl font-medium text-accent-primary">
        {steps[parseInt(currentStep) - 1].el_1}
      </p>

      {steps[parseInt(currentStep)]?.el_1 && (
        <>
          <ChevronRightIcon className="size-6 text-gray" />
          <QuoteBreadcrumbsButton
            href={`./${parseInt(currentStep) + 1}`}
            projectId={params.projectId}
            quoteId={params.quoteId}
          >
            {steps[parseInt(currentStep)].el_1}
          </QuoteBreadcrumbsButton>
        </>
      )}

      {steps[parseInt(currentStep) - 2]?.el_1 === undefined &&
        steps[parseInt(currentStep) + 1]?.el_1 && (
          <>
            <ChevronRightIcon className="size-6 text-gray" />
            <QuoteBreadcrumbsButton
              href={`./${parseInt(currentStep) + 2}`}
              projectId={params.projectId}
              quoteId={params.quoteId}
            >
              {steps[parseInt(currentStep) + 1].el_1}
            </QuoteBreadcrumbsButton>
          </>
        )}
    </div>
  );
}
