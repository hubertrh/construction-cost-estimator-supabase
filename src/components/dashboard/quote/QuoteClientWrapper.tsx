"use client";

import { UUID } from "crypto";
import { useState } from "react";
import QuoteBreadcrumbs from "./QuoteBreadcrumbs";
import QuoteForm from "./QuoteForm";
import QuotePagination from "./QuotePagination";
import QuoteStepInfoAccordion from "./QuoteStepInfoAccordion";
import QuoteTitleWithRef from "./QuoteTitleWithRef";
import { Database } from "@/types/supabase";

type QuoteClientWrapperProps = {
  params: { project: UUID; currentStep: string };
  projectData: Database["public"]["Tables"]["projects"]["Row"][];
  nrmData: Database["public"]["Tables"]["nrm"]["Row"][];

  steps: {
    el_1: string | null;
    el_3_note: string | null;
  }[];

  contractorsComboboxList: { label: string; value: string; costId: UUID }[];
  costsData: Database["public"]["Tables"]["contractor_costs"]["Row"][];
};

export default function QuoteClientWrapper({
  params,
  projectData,
  nrmData,
  steps,
  contractorsComboboxList,
  costsData,
}: QuoteClientWrapperProps) {
  const [currentContractor, setCurrentContractor] = useState("default");

  const handleDropdownChange = (value: string) => {
    setCurrentContractor(value);
  };

  return (
    <>
      <QuoteTitleWithRef
        projectName={projectData[0].project_name}
        projectReference={params.project.slice(-6)}
        onChange={handleDropdownChange}
        contractorsComboboxList={contractorsComboboxList}
      />
      <QuoteBreadcrumbs steps={steps} currentStep={params.currentStep} />
      <QuoteStepInfoAccordion steps={steps} currentStep={params.currentStep} />
      <QuoteForm
        nrmData={nrmData}
        currentContractor={currentContractor}
        costsData={costsData}
      />
      <QuotePagination steps={steps} currentStep={params.currentStep} />
    </>
  );
}
