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
  quoteData: Database["public"]["Tables"]["quotes"]["Row"][];
};

export default function QuoteClientWrapper({
  userId,
  params,
  projectData,
  nrmData,
  steps,
  contractorsComboboxList,
  costsData,
  quoteData,
}: QuoteClientWrapperProps) {
  const [currentContractor, setCurrentContractor] = useState<UUID | null>(null);
  const [localStorageUpdated, setLocalStorageUpdated] = useState(
    new Date().getTime(),
  );

  const quoteContractorId = quoteData[0]?.contractor_id as UUID;

  const handleDropdownChange = (value: UUID | null) => {
    setCurrentContractor(value);
  };

  return (
    <>
      <QuoteTitleWithRef
        projectName={projectData[0].project_name}
        projectId={params.projectId}
        quoteId={params.quoteId}
        quoteContractorId={quoteContractorId ? quoteContractorId : null}
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
        quoteId={params.quoteId}
        setLocalStorageUpdated={setLocalStorageUpdated}
        quoteData={quoteData}
      />
      <QuotePagination steps={steps} params={params} />
    </>
  );
}
