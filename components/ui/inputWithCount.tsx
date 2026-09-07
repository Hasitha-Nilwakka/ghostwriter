"use client";

import { useId, useState, type ChangeEvent } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { IconType } from "react-icons";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  maxLength?: number
  Icon: IconType
  placeHolder: string
  id : string
}

export function InpurWithCount({
  label,
  id,
  maxLength = 150,
  Icon,
  placeHolder,
  onChange,
  onBlur,
  name,
  value: controlledValue,
  ...props 
}: Props) {
   const displayValue = String(controlledValue ?? '') 
  return (
    <div className="w-full max-w-xs space-y-2">
        <div className="flex gap-2">
            <Icon size={18} className="text-primary-col"/>
            <Label htmlFor={id}>{label}</Label>
        </div>  
      <div className="relative">
        <Input
            id={id}
            name={name}
            type="text"
            placeholder={placeHolder}
            value={displayValue}
            maxLength={maxLength}
            onChange={(e) => {
                if (onChange) onChange(e) 
            }}
            onBlur={(e) => {
                if (onBlur) onBlur(e)
            }}
          className="peer pr-14"
        />
        <span
          className={`pointer-events-none absolute inset-y-0 right-0 flex items-center justify-center pr-3 text-xs tabular-nums peer-disabled:opacity-50 ${
            displayValue.length === maxLength
              ? "text-primary-col"
              : "text-muted-foreground"
          }`}
        >
          {displayValue.length}/{maxLength}
        </span>
      </div>
    </div>
  );
};
