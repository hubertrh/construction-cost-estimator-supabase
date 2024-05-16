"use client";

import { UUID } from "crypto";
import { useCallback, useEffect, useState } from "react";
import QuoteCombobox from "./QuoteCombobox";
import HoverBadge from "@/components/ui/HoverBadge";

type QuoteTitleWithRefProps = {
  userId: UUID;
  projectName: string;
  projectReference: string;
  quoteReference: string;
  quoteContractorId: UUID | null;
  onChange: (value: UUID | null) => void;
  contractorsComboboxList: {
    label: string;
    value: string;
    costId: UUID;
    userId: UUID;
  }[];
  localStorageUpdated: number;
};

export default function QuoteTitleWithRef({
  userId,
  projectName,
  projectReference,
  quoteReference,
  quoteContractorId,
  onChange,
  contractorsComboboxList,
  localStorageUpdated,
}: QuoteTitleWithRefProps) {
  const [quoteTotalCost, setQuoteTotalCost] = useState(0);

  const handleQuoteRefresh = useCallback(() => {
    const quoteInputs = localStorage.getItem(`quoteInputs-${quoteReference}`);
    const parsedQuoteInputs = quoteInputs ? JSON.parse(quoteInputs) : {};
    const quoteFlags = localStorage.getItem(`quoteFlags-${quoteReference}`);
    const parsedQuoteFlags = quoteFlags ? JSON.parse(quoteFlags) : {};

    let totalCost = 0;

    // Loop through each key in the data object
    Object.keys(parsedQuoteInputs).forEach((key) => {
      // Check if the key is for a cost and find its corresponding amount
      if (key.startsWith("cost-")) {
        const itemId = key.split("cost-")[1]; // Extract the item ID
        const flag1 = itemId.slice(-4)[0];
        const flag2 = itemId.slice(-3)[0];
        const flag3 = itemId.slice(-2)[0];

        // TODO: estimated cost of the group elements

        // take the amounts from the passed prop which was directly TODO: fetched in the parent component.

        // first flag is the current step which is always on, it will not have anything — the function can return or take 0.
        // if only 1 & 2 flags are on, take the 1st amount from the prop.
        // if only 1 & 2 & 3 flags are on, take the 2nd amount from the prop.
        // if all the flags are on including the flag responsible for the input, it should count the amount from the input (localStorage).

        if (
          !parsedQuoteFlags[`${flag1}${flag2}`] ||
          !parsedQuoteFlags[`${flag1}${flag2}${flag3}`] ||
          !parsedQuoteFlags[itemId]
        )
          return; // Skip if the item is not selected for the quote

        const amountKey = `amount-${itemId}`; // Construct the key
        const amount = parsedQuoteInputs[amountKey] || 0; // Get the amount or default to 0 if undefined
        const cost = parsedQuoteInputs[key]; // Get the cost from the key

        totalCost += cost * amount;
      }
    });

    localStorage.setItem(
      `quoteTotalCost-${quoteReference}`,
      totalCost.toString(),
    );
    setQuoteTotalCost(totalCost);
  }, [quoteReference]);

  useEffect(() => {
    handleQuoteRefresh();
  }, [handleQuoteRefresh, localStorageUpdated]);

  return (
    <div className="sticky top-0 z-10 min-w-[28rem] bg-background-light pb-1 pt-4">
      <div className="-mb-3 flex items-center justify-between gap-8">
        <p className="truncate font-bold text-gray">
          {"// "}
          {projectName}
        </p>
        <div className="flex items-center gap-4">
          <HoverBadge label="P" reference={projectReference} />
          <HoverBadge label="Q" reference={quoteReference} />
        </div>
      </div>
      <div className="flex items-center justify-between gap-8">
        <div className="flex items-center">
          <h1 className="text-2xl font-medium">New Quote&emsp;</h1>
          <QuoteCombobox
            userId={userId}
            quoteContractorId={quoteContractorId}
            contractorsComboboxList={contractorsComboboxList}
            onChange={onChange}
          />
        </div>
        <h2 className="p-0 text-2xl font-medium">~ £{quoteTotalCost}</h2>
      </div>
    </div>
  );
}
