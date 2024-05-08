import { Info } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

type QuoteStepInfoAccordionProps = {
  steps: {
    el_1: string | null;
    el_3_note: string | null;
  }[];
  currentStep: string;
};

export default function QuoteStepInfoAccordion({
  steps,
  currentStep,
}: QuoteStepInfoAccordionProps) {
  const paragraphs = steps[Number(currentStep) - 1].el_3_note
    ?.split("\n")
    .filter(Boolean);

  return (
    <Accordion
      type="single"
      collapsible
      className="mx-8 rounded-md border bg-white px-3"
    >
      <AccordionItem value="item-1" className="border-0">
        <AccordionTrigger>
          <div className="flex items-center gap-3">
            <Info className="size-5 text-accent-primary" />
            {steps[Number(currentStep) - 1].el_1} Info
          </div>
        </AccordionTrigger>
        <AccordionContent>
          {paragraphs?.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
