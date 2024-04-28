"use client";

import { ChangeEvent, useState } from "react";
import { ClipboardMinus, ClipboardPlus, Info, Ruler } from "lucide-react";
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

export default function QuoteForm({
  nrmData,
}: {
  nrmData: Database["public"]["Tables"]["nrm"]["Row"][];
}) {
  const level2 = nrmData.filter((nrmRow) => nrmRow.flag_3 === 0);
  const level3 = nrmData.filter((nrmRow) => nrmRow.flag_4 === 0);
  const level4 = nrmData.filter((nrmRow) => nrmRow.flag_4 !== 0);

  const [visible, setVisible] = useState<{ [key: string]: boolean }>({});
  const [inputData, setInputData] = useState<{ [key: string]: string }>({});

  const toggleVisibility = (id: string) => {
    setVisible((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement>,
    id: string,
  ) => {
    setInputData((prev) => ({
      ...prev,
      [id]: event.target.value,
    }));
  };

  return (
    <ul className="quote-ul mb-2 ml-8 mt-6 text-left">
      {level2.map(
        (nrm2) =>
          nrm2.flag_2 !== 0 && (
            <li key={nrm2.id}>
              <div className="flex">
                <Switch
                  className="mr-2 mt-1"
                  checked={!!visible[`${nrm2.flag_1}${nrm2.flag_2}`]}
                  onCheckedChange={() =>
                    toggleVisibility(`${nrm2.flag_1}${nrm2.flag_2}`)
                  }
                />
                <p>{nrm2.el_2}</p>
              </div>
              {visible[`${nrm2.flag_1}${nrm2.flag_2}`] && (
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
                                !!visible[
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
                          {visible[
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
                                            !!visible[
                                              `${nrm4.flag_1}${nrm4.flag_2}${nrm4.flag_3}${nrm4.flag_4}`
                                            ]
                                          }
                                          onCheckedChange={() =>
                                            toggleVisibility(
                                              `${nrm4.flag_1}${nrm4.flag_2}${nrm4.flag_3}${nrm4.flag_4}`,
                                            )
                                          }
                                        />
                                        <div>
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
                                                    variant="included"
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
                                                    variant="excluded"
                                                  />
                                                </PopoverContent>
                                              </Popover>
                                            )}
                                          </div>
                                          {visible[
                                            `${nrm4.flag_1}${nrm4.flag_2}${nrm4.flag_3}${nrm4.flag_4}`
                                          ] && (
                                            <div className="mt-2 grid gap-2">
                                              <Label
                                                htmlFor={`input-${nrm4.flag_1}${nrm4.flag_2}${nrm4.flag_3}${nrm4.flag_4}`}
                                              >
                                                Component: {nrm4.flag_1}.
                                                {nrm4.flag_2}.{nrm4.flag_3}.
                                                {nrm4.flag_4}
                                              </Label>
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
                                                        variant="measurement"
                                                      />
                                                    </PopoverContent>
                                                  </Popover>
                                                )}
                                                <Input
                                                  id={`input-${nrm4.flag_1}${nrm4.flag_2}${nrm4.flag_3}${nrm4.flag_4}`}
                                                  placeholder="Amount (number) of units"
                                                  required
                                                  onChange={(event) =>
                                                    handleInputChange(
                                                      event,
                                                      `${nrm4.flag_1}${nrm4.flag_2}${nrm4.flag_3}${nrm4.flag_4}`,
                                                    )
                                                  }
                                                  value={
                                                    inputData[
                                                      `${nrm4.flag_1}${nrm4.flag_2}${nrm4.flag_3}${nrm4.flag_4}`
                                                    ] || ""
                                                  }
                                                />
                                                <p className="ml-2 grid aspect-square h-full select-none place-items-center rounded-md border border-accent-primary/30 font-medium">
                                                  {nrm4.el_4_unit}
                                                </p>
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
