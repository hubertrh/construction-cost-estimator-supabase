"use client";

import { UUID } from "crypto";
import { useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";

type QuoteComboboxProps = {
  contractorsComboboxList: { label: string; value: string; costId: UUID }[];
  onChange: (value: string) => void;
};

export default function QuoteCombobox({
  contractorsComboboxList,
  onChange,
}: QuoteComboboxProps) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="h-auto w-80 justify-between py-1"
        >
          {value
            ? contractorsComboboxList.find(
                (contractor) => contractor.value === value,
              )?.label
            : "Select Cost Model..."}
          <ChevronsUpDown className="ml-2 size-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0">
        <Command>
          <CommandInput placeholder="Search contractors..." />
          <CommandEmpty>No contractors found</CommandEmpty>
          <CommandGroup>
            <CommandList>
              {contractorsComboboxList.map((contractor) => (
                <CommandItem
                  key={contractor.value}
                  value={contractor.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
                    onChange(currentValue === value ? "" : contractor.costId);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === contractor.value ? "opacity-100" : "opacity-0",
                    )}
                  />
                  {contractor.label}
                </CommandItem>
              ))}
            </CommandList>
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
