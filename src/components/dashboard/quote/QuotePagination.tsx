import { UUID } from "crypto";
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
  projectUUID: UUID;
  currentStep: string;
};

export default function QuotePagination({
  steps,
  projectUUID,
  currentStep,
}: QuotePaginationProps) {
  const totalSteps = steps.length;

  return (
    <Pagination className="mt-12">
      <PaginationContent>
        {steps[parseInt(currentStep) - 2]?.el_1 && (
          <PaginationItem>
            <PaginationPrevious
              href={`/admin/dashboard/quotes/new/${projectUUID}/${parseInt(currentStep) - 1}`}
            />
          </PaginationItem>
        )}

        {Array.from({ length: totalSteps }, (_, index) => {
          const step = index + 1;
          return (
            <PaginationItem key={step}>
              <PaginationLink
                href={`/admin/dashboard/quotes/new/${projectUUID}/${step}`}
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
              href={`/admin/dashboard/quotes/new/${projectUUID}/${parseInt(currentStep) + 1}`}
            />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
}
