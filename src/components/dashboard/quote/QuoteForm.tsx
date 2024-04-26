"use client";

import { useState } from "react";
import { Switch } from "../../ui/switch";
import { Database } from "@/types/supabase";

export default function QuoteForm({
  nrmData,
}: {
  nrmData: Database["public"]["Tables"]["nrm"]["Row"][];
}) {
  const level2 = nrmData.filter((nrmRow) => nrmRow.flag_3 === 0);
  const level3 = nrmData.filter((nrmRow) => nrmRow.flag_4 === 0);
  const level4 = nrmData.filter((nrmRow) => nrmRow.flag_4 !== 0);

  const [visible, setVisible] = useState<{ [key: string]: boolean }>({});

  const toggleVisibility = (id: string) => {
    setVisible((prev) => ({
      ...prev,
      [id]: !prev[id],
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
                            <p>{nrm3.el_3}</p>
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
                                          <p>{nrm4.el_4}</p>
                                          {visible[
                                            `${nrm4.flag_1}${nrm4.flag_2}${nrm4.flag_3}${nrm4.flag_4}`
                                          ] && <p>CALCULATIONS</p>}
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
