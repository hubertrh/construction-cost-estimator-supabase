"use client";

import { useState } from "react";
import { Switch } from "../ui/switch";
import { Database } from "@/types/supabase";

export default function QuoteForm({
  nrmData,
}: {
  nrmData: Database["public"]["Tables"]["nrm"]["Row"][];
}) {
  const [visible, setVisible] = useState<{ [key: string]: boolean }>({});

  const toggleVisibility = (id: string) => {
    setVisible((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div className="mt-6 text-left">
      {nrmData?.map((nrm) =>
        nrm.flag_2 === 0 ? (
          <div key={nrm.id} className="mt-2 flex">
            <Switch
              className="mr-2 mt-1"
              checked={!!visible[`${nrm.flag_1}`]}
              onCheckedChange={() => toggleVisibility(`${nrm.flag_1}`)}
            />
            <p>{nrm.el_1}</p>
          </div>
        ) : nrm.flag_3 === 0 ? (
          visible[`${nrm.flag_1}`] && (
            <div key={nrm.id} className="ml-4 mt-2 flex">
              <Switch
                className="mr-2 mt-1"
                checked={!!visible[`${nrm.flag_1}${nrm.flag_2}`]}
                onCheckedChange={() =>
                  toggleVisibility(`${nrm.flag_1}${nrm.flag_2}`)
                }
              />
              <p>{nrm.el_2}</p>
            </div>
          )
        ) : nrm.flag_4 === 0 ? (
          visible[`${nrm.flag_1}${nrm.flag_2}`] && (
            <div key={nrm.id} className="ml-8 mt-2 flex">
              <Switch
                className="mr-2 mt-1"
                checked={!!visible[`${nrm.flag_1}${nrm.flag_2}${nrm.flag_3}`]}
                onCheckedChange={() =>
                  toggleVisibility(`${nrm.flag_1}${nrm.flag_2}${nrm.flag_3}`)
                }
              />
              <p>{nrm.el_3}</p>
            </div>
          )
        ) : (
          visible[`${nrm.flag_1}${nrm.flag_2}${nrm.flag_3}`] && (
            <div key={nrm.id} className="ml-12 mt-2 flex">
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
              <div className="flex flex-col">
                <p>{nrm.el_4}</p>
                {visible[
                  `${nrm.flag_1}${nrm.flag_2}${nrm.flag_3}${nrm.flag_4}`
                ] && <p>CALCULATIONS</p>}
              </div>
            </div>
          )
        ),
      )}
    </div>
  );
}
