"use client";

import React from "react";
import { Input } from "@/components/ui/input";

interface Props extends React.ComponentProps<"input"> {
  maxLength : number,
  placeholder : string
  ref? : React.Ref<HTMLInputElement>
}

const InputCharacterLimit = (
  {
    maxLength, 
    placeholder, 
    onChange, 
    value, 
    ref, 
    ...props} 
    : Props) => {

  const textCount = typeof value === 'string' ? value.length : 0

  return (
    <div className="w-full space-y-2">
      <div className="relative">
        <Input
          type="text"
          placeholder={placeholder}
          value={value}
          maxLength={maxLength}
          onChange={onChange}
          className="peer pr-14 text-sm"
          ref={ref}
          {...props}
        />
        <span
          className={`pointer-events-none absolute inset-y-0 right-0 flex items-center justify-center pr-3 text-xs tabular-nums peer-disabled:opacity-50 ${
            textCount === maxLength
              ? "text-teal-400"
              : "text-muted-foreground"
          }`}
        >
          {textCount}/{maxLength}
        </span>
      </div>
    </div>
  );
};

export default InputCharacterLimit;
