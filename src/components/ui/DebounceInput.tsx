"use client";

import { ChangeEvent, useEffect, useState, FC } from "react";
import { Input } from "./input";

interface DebounceInputProps {
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  debounce?: number;
  [prop: string]: any;
}

const DebounceInput: FC<DebounceInputProps> = ({
  value: initialValue,
  onChange,
  debounce = 300,
  ...props
}) => {
  const [value, setValue] = useState<string>(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  useEffect(() => {
    const handler = () => {
      onChange({ target: { value } } as ChangeEvent<HTMLInputElement>);
    };
    const timeout = setTimeout(handler, debounce);

    return () => clearTimeout(timeout);
  }, [value, debounce, onChange]);

  return (
    <Input
      {...props}
      value={value}
      onChange={(e: ChangeEvent<HTMLInputElement>) => setValue(e.target.value)}
    />
  );
};

export default DebounceInput;
