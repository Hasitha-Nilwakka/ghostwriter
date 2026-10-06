"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { cn } from "cn";

interface Props extends React.ComponentProps<"input"> {
  maxLength: number;
  placeholder: string;
}

const InputCharacterLimit = ({
  maxLength,
  placeholder,
  onChange,
  value,
  defaultValue,
  className,
  ...props
}: Props) => {
  const [uncontrolledLength, setUncontrolledLength] = useState<number>(() => {
    if (typeof defaultValue === "string") return defaultValue.length;
    return 0;
  });

  const textCount =
    typeof value === "string"
      ? value.length
      : uncontrolledLength;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (typeof value !== "string") {
      setUncontrolledLength(e.target.value.length);
    }
    onChange?.(e);
  };

  return (
    <div className="w-full">
      <div className="relative">
        <Input
          type="text"
          placeholder={placeholder}
          value={value}
          defaultValue={defaultValue}
          maxLength={maxLength}
          onChange={handleChange}
          className={cn(
            "peer pr-16 text-sm focus-visible:ring-2 focus-visible:ring-primary/70 focus-visible:ring-offset-1",
            className
          )}
          {...props}
        />
        <span
          className={cn(
            "pointer-events-none absolute inset-y-0 right-0 flex items-center justify-center pr-3 text-xs tabular-nums peer-disabled:opacity-50 transition-colors duration-200",
            textCount >= maxLength
              ? "text-amber-600 dark:text-amber-400 font-semibold"
              : "text-muted-foreground"
          )}
        >
          {textCount}/{maxLength}
        </span>
      </div>
    </div>
  );
};

export default InputCharacterLimit;
