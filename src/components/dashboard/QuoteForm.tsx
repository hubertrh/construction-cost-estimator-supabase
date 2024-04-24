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
    <ul className="quote-ul mt-6 text-left">
      {level1.map((nrm1) => (
        <li key={nrm1.id} className="mb-2">
          <div className="flex">
            <Switch
              className="mr-2 mt-1"
              checked={!!visible[`${nrm1.flag_1}`]}
              onCheckedChange={() => toggleVisibility(`${nrm1.flag_1}`)}
            />
            <p>{nrm1.el_1}</p>
          </div>
          {visible[`${nrm1.flag_1}`] && (
            <ul className="mb-2 ml-8">
              {level2.map(
                (nrm2) =>
                  nrm2.flag_2 !== 0 &&
                  nrm2.flag_1 === nrm1.flag_1 && (
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
          )}
        </li>
      ))}
    </ul>
  );
}

//   return (
//     <div className="mt-6 text-left">
//       {nrmData?.map((nrm) =>
//         nrm.flag_2 === 0 ? (
//           <div key={nrm.id} className="flex pt-2">
//             <Switch
//               className="mr-2 mt-1"
//               checked={!!visible[`${nrm.flag_1}`]}
//               onCheckedChange={() => toggleVisibility(`${nrm.flag_1}`)}
//             />
//             <p>{nrm.el_1}</p>
//           </div>
//         ) : nrm.flag_3 === 0 ? (
//           visible[`${nrm.flag_1}`] && (
//             <div key={nrm.id} className="ml-8 flex pt-2">
//               <Switch
//                 className="mr-2 mt-1"
//                 checked={!!visible[`${nrm.flag_1}${nrm.flag_2}`]}
//                 onCheckedChange={() =>
//                   toggleVisibility(`${nrm.flag_1}${nrm.flag_2}`)
//                 }
//               />
//               <p>{nrm.el_2}</p>
//             </div>
//           )
//         ) : nrm.flag_4 === 0 ? (
//           visible[`${nrm.flag_1}`] &&
//           visible[`${nrm.flag_1}${nrm.flag_2}`] && (
//             <div key={nrm.id} className="ml-16 flex pt-2">
//               <Switch
//                 className="mr-2 mt-1"
//                 checked={!!visible[`${nrm.flag_1}${nrm.flag_2}${nrm.flag_3}`]}
//                 onCheckedChange={() =>
//                   toggleVisibility(`${nrm.flag_1}${nrm.flag_2}${nrm.flag_3}`)
//                 }
//               />
//               <p>{nrm.el_3}</p>
//             </div>
//           )
//         ) : (
//           visible[`${nrm.flag_1}`] &&
//           visible[`${nrm.flag_1}${nrm.flag_2}`] &&
//           visible[`${nrm.flag_1}${nrm.flag_2}${nrm.flag_3}`] && (
//             <div key={nrm.id} className="ml-24 flex pt-2">
//               <Switch
//                 className="mr-2 mt-1"
//                 checked={
//                   !!visible[
//                     `${nrm.flag_1}${nrm.flag_2}${nrm.flag_3}${nrm.flag_4}`
//                   ]
//                 }
//                 onCheckedChange={() =>
//                   toggleVisibility(
//                     `${nrm.flag_1}${nrm.flag_2}${nrm.flag_3}${nrm.flag_4}`,
//                   )
//                 }
//               />
//               <div className="flex flex-col">
//                 <p>{nrm.el_4}</p>
//                 {visible[`${nrm.flag_1}`] &&
//                   visible[`${nrm.flag_1}${nrm.flag_2}`] &&
//                   visible[`${nrm.flag_1}${nrm.flag_2}${nrm.flag_3}`] &&
//                   visible[
//                     `${nrm.flag_1}${nrm.flag_2}${nrm.flag_3}${nrm.flag_4}`
//                   ] && <p>CALCULATIONS</p>}
//               </div>
//             </div>
//           )
//         ),
//       )}
//     </div>
//   );
// }
