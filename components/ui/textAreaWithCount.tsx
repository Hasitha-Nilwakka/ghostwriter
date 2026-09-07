"use client";

import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { IconType } from "react-icons";

interface Props extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    label : string
    Icon : IconType
    placeHolder : string
    id : string
    maxLength : number
}

export default function TextareaWithCount(
    {
        label,
        Icon,
        placeHolder,
        id,
        maxLength,
        onChange,
        onBlur,
        name,
        value: controlledValue,
        ...props
    } : Props
){ 
    const displayValue = String(controlledValue ?? '') 

  return (
    <div className="flex w-full max-w-md flex-col gap-2">
      <div className="flex gap-2">  
        <Icon size={18} className="text-primary-col"/>  
        <Label htmlFor={id}>{label}</Label>
      </div>
      {/* 1. Added a relative container */}
      <div className="relative w-full">
        <Textarea
          className="bg-background pb-8 resize-none text-sm"
          {...props}
          id={id}
          name={name}
          maxLength={maxLength}
          onChange={(e) => {
            if (onChange) onChange(e)
          }}
          onBlur={(e) => {
              if (onBlur) onBlur(e)
            }}
          placeholder={placeHolder}
          value={displayValue}
        />
        {/* 3. Changed to absolute positioning */}
        <p className={`absolute bottom-2 right-3 text-sm text-muted-foreground pointer-events-none ${displayValue.length === maxLength ? 'text-primary-col' : ''}`}>
          {displayValue.length}/{maxLength}
        </p>
      </div>
    </div>
  );
};
