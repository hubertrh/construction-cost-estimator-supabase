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
  currentStep: string;
};

export default function QuotePagination({
  steps,
  currentStep,
}: QuotePaginationProps) {
  const totalSteps = steps.length;

  return (
    <Pagination className="mt-12">
      <PaginationContent>
        {steps[parseInt(currentStep) - 2]?.el_1 && (
          <PaginationItem>
            <PaginationPrevious
              className="text-accent-primary-dark"
              href={`./${parseInt(currentStep) - 1}`}
            />
          </PaginationItem>
        )}

        {Array.from({ length: totalSteps }, (_, index) => {
          const step = index + 1;
          return (
            <PaginationItem key={step}>
              <PaginationLink
                href={step === parseInt(currentStep) ? "#!" : `./${step}`}
                isActive={step === parseInt(currentStep)}
              >
                {step}
              </PaginationLink>
            </PaginationItem>
          );
        })}

        {steps[parseInt(currentStep)]?.el_1 && (
          <PaginationItem>
            <PaginationNext
              className="text-accent-primary-dark"
              href={`./${parseInt(currentStep) + 1}`}
            />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
}
