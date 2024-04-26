import { ChevronRightIcon } from "lucide-react";

type QuoteBreadcrumbsProps = {
  steps: { el_1: string | null }[];
  currentStep: string;
};

export default function QuoteBreadcrumbs({
  steps,
  currentStep,
}: QuoteBreadcrumbsProps) {
  return (
    <div className="my-4 flex select-none items-center justify-center gap-2">
      {steps[parseInt(currentStep)]?.el_1 === undefined &&
        steps[parseInt(currentStep) - 2]?.el_1 && (
          <>
            <p className="text-gray">{steps[parseInt(currentStep) - 2].el_1}</p>
            <ChevronRightIcon className="size-6 text-gray" />
          </>
        )}

      {steps[parseInt(currentStep) - 2]?.el_1 && (
        <>
          <p className="text-gray">{steps[parseInt(currentStep) - 2].el_1}</p>
          <ChevronRightIcon className="size-6 text-gray" />
        </>
      )}

      <p className="text-xl font-medium text-accent-primary">
        {steps[parseInt(currentStep) - 1].el_1}
      </p>

      {steps[parseInt(currentStep)]?.el_1 && (
        <>
          <ChevronRightIcon className="size-6 text-gray" />
          <p className="text-gray">{steps[parseInt(currentStep)].el_1}</p>
        </>
      )}

      {steps[parseInt(currentStep) - 2]?.el_1 === undefined &&
        steps[parseInt(currentStep) + 1]?.el_1 && (
          <>
            <ChevronRightIcon className="size-6 text-gray" />
            <p className="text-gray">{steps[parseInt(currentStep) + 1].el_1}</p>
          </>
        )}
    </div>
  );
}
