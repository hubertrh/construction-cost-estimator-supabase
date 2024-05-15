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
  userId: UUID;
  params: { projectId: UUID; quoteId: UUID; currentStep: string };
  projectData: Database["public"]["Tables"]["projects"]["Row"][];
  nrmData: Database["public"]["Tables"]["nrm"]["Row"][];
  steps: {
    el_1: string | null;
    el_3_note: string | null;
  }[];
  contractorsComboboxList: {
    label: string;
    value: string;
    costId: UUID;
    userId: UUID;
  }[];
  costsData: Database["public"]["Tables"]["contractor_costs"]["Row"][];
};

export default function QuoteClientWrapper({
  userId,
  params,
  projectData,
  nrmData,
  steps,
  contractorsComboboxList,
  costsData,
}: QuoteClientWrapperProps) {
  const [currentContractor, setCurrentContractor] = useState("default");
  const [localStorageUpdated, setLocalStorageUpdated] = useState(
    new Date().getTime(),
  );

  const handleDropdownChange = (value: string) => {
    setCurrentContractor(value);
  };

  return (
    <>
      <QuoteTitleWithRef
        projectName={projectData[0].project_name}
        projectReference={params.projectId.slice(-6)}
        quoteReference={params.quoteId.slice(-6)}
        onChange={handleDropdownChange}
        contractorsComboboxList={contractorsComboboxList}
        userId={userId}
        localStorageUpdated={localStorageUpdated}
      />
      <QuoteBreadcrumbs steps={steps} params={params} />
      <QuoteStepInfoAccordion steps={steps} currentStep={params.currentStep} />
      <QuoteForm
        nrmData={nrmData}
        currentContractor={currentContractor}
        costsData={costsData}
        quoteReference={params.quoteId.slice(-6)}
        setLocalStorageUpdated={setLocalStorageUpdated}
      />
      <QuotePagination steps={steps} currentStep={params.currentStep} />
    </>
  );
}
