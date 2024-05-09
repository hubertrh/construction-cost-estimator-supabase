"use client";

import { ChangeEvent, useEffect, useRef, useState } from "react";
import {
  ClipboardMinus,
  ClipboardPlus,
  Info,
  RotateCcw,
  Ruler,
} from "lucide-react";
import { Switch } from "../../ui/switch";
import QuoteNoteParagraphs from "./QuoteNoteParagraphs";
import { Database } from "@/types/supabase";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

type QuoteFormProps = {
  nrmData: Database["public"]["Tables"]["nrm"]["Row"][];
  currentContractor: string;
  costsData: Database["public"]["Tables"]["contractor_costs"]["Row"][];
  quoteReference: string;
};

export default function QuoteForm({
  nrmData,
  currentContractor,
  costsData,
  quoteReference,
}: QuoteFormProps) {
  const level2 = nrmData.filter((nrmRow) => nrmRow.flag_3 === 0);
  const level3 = nrmData.filter((nrmRow) => nrmRow.flag_4 === 0);
  const level4 = nrmData.filter((nrmRow) => nrmRow.flag_4 !== 0);

  const [isFlagVisible, setIsFlagVisible] = useState<{
    [key: string]: boolean;
  }>({});
  const [inputData, setInputData] = useState<{ [key: string]: number }>({});
  const [currentContractorCosts, setCurrentContractorCosts] =
    useState<Database["public"]["Tables"]["contractor_costs"]["Row"]>();

  const inputDataRef = useRef(inputData);
  const level4Ref = useRef(level4);

  useEffect(() => {
    setCurrentContractorCosts(
      costsData.find((costRow) => costRow.id === currentContractor),
    );
  }, [currentContractor, costsData]);

  useEffect(() => {
    level4Ref.current.forEach((obj) => {
      const inputKey = `cost-${obj.flag_1}${obj.flag_2}${obj.flag_3}${obj.flag_4}`;
      const costKey = `${obj.flag_1}.${obj.flag_2}.${obj.flag_3}.${obj.flag_4}`;

      if (!inputDataRef.current[inputKey]) {
        setInputData((prev) => ({
          ...prev,
          [inputKey]: Number(
            currentContractorCosts?.[
              costKey as keyof typeof currentContractorCosts
            ] || 0,
          ),
        }));
      }
    });
  }, [currentContractorCosts]);

  useEffect(() => {
    // Update refs when props change
    inputDataRef.current = inputData;
  }, [inputData]);

  useEffect(() => {
    function saveToLocalStorage(
      storageKey: string,
      data: {
        [key: string]: number | boolean;
      },
    ) {
      const existingData = localStorage.getItem(storageKey);
      const parsedExistingData = existingData ? JSON.parse(existingData) : {};

      // Add new keys and update existing ones
      const updatedData = { ...parsedExistingData, ...data };

      localStorage.setItem(storageKey, JSON.stringify(updatedData));
    }

    saveToLocalStorage(`quoteInputs-${quoteReference}`, inputData);
    saveToLocalStorage(`quoteFlags-${quoteReference}`, isFlagVisible);
  }, [inputData, isFlagVisible, quoteReference]);

  useEffect(() => {
    level4Ref.current = level4;
  }, [level4]);

  function toggleVisibility(id: string) {
    setIsFlagVisible((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  }

  function handleInputChange(event: ChangeEvent<HTMLInputElement>, id: string) {
    setInputData((prev) => ({
      ...prev,
      [id]: Number(event.target.value),
    }));
  }

  function handleCostReset(
    flag1: number | null,
    flag2: number | null,
    flag3: number | null,
    flag4: number | null,
  ) {
    const inputKey = `cost-${flag1}${flag2}${flag3}${flag4}`;
    const costKey = `${flag1}.${flag2}.${flag3}.${flag4}`;

    setInputData((prev) => ({
      ...prev,
      [inputKey]: Number(
        currentContractorCosts?.[
          costKey as keyof typeof currentContractorCosts
        ] || 0,
      ),
    }));
  }

  return (
    <ul className="quote-ul mx-8 mb-2 mt-6 text-left">
      {level2.map(
        (nrm2) =>
          nrm2.flag_2 !== 0 && (
            <li key={nrm2.id}>
              <div className="flex">
                <Switch
                  className="mr-2 mt-1"
                  checked={!!isFlagVisible[`${nrm2.flag_1}${nrm2.flag_2}`]}
                  onCheckedChange={() =>
                    toggleVisibility(`${nrm2.flag_1}${nrm2.flag_2}`)
                  }
                />
                <p>{nrm2.el_2}</p>
              </div>
              {isFlagVisible[`${nrm2.flag_1}${nrm2.flag_2}`] && (
                <ul className="mb-2 ml-8">
                  {level3.map(
                    (nrm3) =>
                      nrm3.flag_3 !== 0 &&
                      nrm3.flag_2 === nrm2.flag_2 &&
                      nrm3.flag_1 === nrm2.flag_1 && (
                        <li key={nrm3.id}>
                          <div className="flex">
                            <Switch
                              className="mr-2 mt-1"
                              checked={
                                !!isFlagVisible[
                                  `${nrm3.flag_1}${nrm3.flag_2}${nrm3.flag_3}`
                                ]
                              }
                              onCheckedChange={() =>
                                toggleVisibility(
                                  `${nrm3.flag_1}${nrm3.flag_2}${nrm3.flag_3}`,
                                )
                              }
                            />
                            <div className="flex items-center">
                              <p>{nrm3.el_3}</p>
                              {nrm3.el_3_note && (
                                <Popover>
                                  <PopoverTrigger>
                                    <Info className="ml-2 size-5 text-accent-primary" />
                                  </PopoverTrigger>
                                  <PopoverContent>
                                    {nrm3.el_3_note}
                                  </PopoverContent>
                                </Popover>
                              )}
                            </div>
                          </div>
                          {isFlagVisible[
                            `${nrm3.flag_1}${nrm3.flag_2}${nrm3.flag_3}`
                          ] && (
                            <ul className="mb-2 ml-8">
                              {level4.map(
                                (nrm4) =>
                                  nrm4.flag_3 === nrm3.flag_3 &&
                                  nrm4.flag_2 === nrm3.flag_2 &&
                                  nrm4.flag_1 === nrm3.flag_1 && (
                                    <li key={nrm4.id}>
                                      <div className="flex">
                                        <Switch
                                          className="mr-2 mt-1"
                                          checked={
                                            !!isFlagVisible[
                                              `${nrm4.flag_1}${nrm4.flag_2}${nrm4.flag_3}${nrm4.flag_4}`
                                            ]
                                          }
                                          onCheckedChange={() =>
                                            toggleVisibility(
                                              `${nrm4.flag_1}${nrm4.flag_2}${nrm4.flag_3}${nrm4.flag_4}`,
                                            )
                                          }
                                        />
                                        <div className="w-full">
                                          <div className="flex items-center">
                                            <p>{nrm4.el_4}</p>
                                            {nrm3.note_included && (
                                              <Popover>
                                                <PopoverTrigger>
                                                  <ClipboardPlus className="ml-2 size-5 text-accent-primary" />
                                                </PopoverTrigger>
                                                <PopoverContent>
                                                  <p className="font-semibold">
                                                    Included
                                                  </p>
                                                  <QuoteNoteParagraphs
                                                    text={nrm3.note_included}
                                                  />
                                                </PopoverContent>
                                              </Popover>
                                            )}
                                            {nrm3.note_excluded && (
                                              <Popover>
                                                <PopoverTrigger>
                                                  <ClipboardMinus className="ml-2 size-5 text-accent-primary" />
                                                </PopoverTrigger>
                                                <PopoverContent>
                                                  <p className="font-semibold">
                                                    Excluded
                                                  </p>
                                                  <QuoteNoteParagraphs
                                                    text={nrm3.note_excluded}
                                                  />
                                                </PopoverContent>
                                              </Popover>
                                            )}
                                          </div>
                                          {isFlagVisible[
                                            `${nrm4.flag_1}${nrm4.flag_2}${nrm4.flag_3}${nrm4.flag_4}`
                                          ] && (
                                            <div className="mt-1 grid gap-1">
                                              <div className="flex items-center justify-between">
                                                <Label
                                                  htmlFor={`amount-${nrm4.flag_1}${nrm4.flag_2}${nrm4.flag_3}${nrm4.flag_4}`}
                                                >
                                                  Component: {nrm4.flag_1}.
                                                  {nrm4.flag_2}.{nrm4.flag_3}.
                                                  {nrm4.flag_4}
                                                </Label>
                                                <div className="flex w-24 items-center justify-between">
                                                  <Label
                                                    htmlFor={`cost-${nrm4.flag_1}${nrm4.flag_2}${nrm4.flag_3}${nrm4.flag_4}`}
                                                  >
                                                    Cost:
                                                  </Label>
                                                  <button
                                                    onClick={() => {
                                                      handleCostReset(
                                                        nrm4.flag_1,
                                                        nrm4.flag_2,
                                                        nrm4.flag_3,
                                                        nrm4.flag_4,
                                                      );
                                                    }}
                                                  >
                                                    <RotateCcw className="size-4 text-accent-primary" />
                                                  </button>
                                                </div>
                                              </div>
                                              <div className="mb-3 flex items-center">
                                                {nrm3.measurement_rules && (
                                                  <Popover>
                                                    <PopoverTrigger>
                                                      <Ruler className="mr-2 size-5 text-accent-primary" />
                                                    </PopoverTrigger>
                                                    <PopoverContent>
                                                      <p className="font-semibold">
                                                        Measurement Rules
                                                      </p>
                                                      <QuoteNoteParagraphs
                                                        text={
                                                          nrm3.measurement_rules
                                                        }
                                                      />
                                                    </PopoverContent>
                                                  </Popover>
                                                )}
                                                <Input
                                                  id={`amount-${nrm4.flag_1}${nrm4.flag_2}${nrm4.flag_3}${nrm4.flag_4}`}
                                                  type="number"
                                                  placeholder="Amount (number) of units"
                                                  required
                                                  onKeyDown={(e) =>
                                                    [
                                                      "e",
                                                      "E",
                                                      "+",
                                                      "-",
                                                    ].includes(e.key) &&
                                                    e.preventDefault()
                                                  }
                                                  onChange={(event) => {
                                                    handleInputChange(
                                                      event,
                                                      `amount-${nrm4.flag_1}${nrm4.flag_2}${nrm4.flag_3}${nrm4.flag_4}`,
                                                    );
                                                  }}
                                                  value={
                                                    inputData[
                                                      `amount-${nrm4.flag_1}${nrm4.flag_2}${nrm4.flag_3}${nrm4.flag_4}`
                                                    ] || ""
                                                  }
                                                />
                                                <p className="ml-2 grid h-full select-none place-items-center !text-nowrap rounded-md border border-accent-primary/30 px-2 font-medium">
                                                  {nrm4.el_4_unit}
                                                </p>
                                                <p className="ml-6 grid h-full select-none place-items-center">
                                                  £
                                                </p>
                                                <Input
                                                  className="ml-2 w-24"
                                                  id={`cost-${nrm4.flag_1}${nrm4.flag_2}${nrm4.flag_3}${nrm4.flag_4}`}
                                                  type="number"
                                                  placeholder="123.45"
                                                  required
                                                  // FIXME: Fetch from local storage first
                                                  value={
                                                    inputData[
                                                      `cost-${nrm4.flag_1}${nrm4.flag_2}${nrm4.flag_3}${nrm4.flag_4}`
                                                    ] || ""
                                                  }
                                                  onKeyDown={(e) =>
                                                    [
                                                      "e",
                                                      "E",
                                                      "+",
                                                      "-",
                                                    ].includes(e.key) &&
                                                    e.preventDefault()
                                                  }
                                                  onChange={(event) => {
                                                    handleInputChange(
                                                      event,
                                                      `cost-${nrm4.flag_1}${nrm4.flag_2}${nrm4.flag_3}${nrm4.flag_4}`,
                                                    );
                                                  }}
                                                />
                                              </div>
                                            </div>
                                          )}
                                        </div>
                                      </div>
                                    </li>
                                  ),
                              )}
                            </ul>
                          )}
                        </li>
                      ),
                  )}
                </ul>
              )}
            </li>
          ),
      )}
    </ul>
  );
}
