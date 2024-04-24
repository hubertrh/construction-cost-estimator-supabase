"use client";

import { useState } from "react";
import { Switch } from "../ui/switch";
import { Database } from "@/types/supabase";

export default function QuoteForm({
  nrmData,
}: {
  nrmData: Database["public"]["Tables"]["nrm"]["Row"][];
}) {
  // map over nrmData and render the elements that flag_2, flag_3, and flag_4 are 0
  const level1 = nrmData.filter((nrmRow) => nrmRow.flag_2 === 0);
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
    <ul className="mt-6 text-left">
      {level1.map((nrm) => (
        <li key={nrm.id} className="pt-2">
          <div className="flex">
            <Switch
              className="mr-2 mt-1"
              checked={!!visible[`${nrm.flag_1}`]}
              onCheckedChange={() => toggleVisibility(`${nrm.flag_1}`)}
            />
            <p>{nrm.el_1}</p>
          </div>
          {visible[`${nrm.flag_1}`] && (
            <ul className="ml-8 pt-2">
              {level2.map(
                (nrm) =>
                  nrm.flag_2 !== 0 && (
                    <li key={nrm.id}>
                      <div className="flex">
                        <Switch
                          className="mr-2 mt-1"
                          checked={!!visible[`${nrm.flag_1}${nrm.flag_2}`]}
                          onCheckedChange={() =>
                            toggleVisibility(`${nrm.flag_1}${nrm.flag_2}`)
                          }
                        />
                        <p>{nrm.el_2}</p>
                      </div>
                      {visible[`${nrm.flag_1}${nrm.flag_2}`] && (
                        <ul className="ml-8 pt-2">
                          {level3.map(
                            (nrm) =>
                              nrm.flag_3 !== 0 && (
                                <li key={nrm.id}>
                                  <div className="flex">
                                    <Switch
                                      className="mr-2 mt-1"
                                      checked={
                                        !!visible[
                                          `${nrm.flag_1}${nrm.flag_2}${nrm.flag_3}`
                                        ]
                                      }
                                      onCheckedChange={() =>
                                        toggleVisibility(
                                          `${nrm.flag_1}${nrm.flag_2}${nrm.flag_3}`,
                                        )
                                      }
                                    />
                                    <p>{nrm.el_3}</p>
                                  </div>
                                  {visible[
                                    `${nrm.flag_1}${nrm.flag_2}${nrm.flag_3}`
                                  ] && (
                                    <ul className="ml-8 pt-2">
                                      {level4.map((nrm) => (
                                        <li key={nrm.id}>
                                          <div className="flex">
                                            <Switch
                                              className="mr-2 mt-1"
                                              checked={
                                                !!visible[
                                                  `${nrm.flag_1}${nrm.flag_2}${nrm.flag_3}${nrm.flag_4}`
                                                ]
                                              }
                                              onCheckedChange={() =>
                                                toggleVisibility(
                                                  `${nrm.flag_1}${nrm.flag_2}${nrm.flag_3}${nrm.flag_4}`,
                                                )
                                              }
                                            />
                                            <div>
                                              <p>{nrm.el_4}</p>
                                              {visible[
                                                `${nrm.flag_1}${nrm.flag_2}${nrm.flag_3}${nrm.flag_4}`
                                              ] && <p>CALCULATIONS</p>}
                                            </div>
                                          </div>
                                        </li>
                                      ))}
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
          )}
        </li>
      ))}
    </ul>
  );
}
