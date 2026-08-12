"use client";

import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";

interface Props {
    placeholder : string
    maxLength : number
}

export default function TextareaWithCharacterCount({placeholder, maxLength} : Props) {
  const [value, setValue] = useState("");

  return (
    <div className="flex w-full max-w-md flex-col gap-2">
      <Textarea
        className="dark:bg-background h-9 text-sm shadow-xs text-muted-foreground font-normal"
        id="message"
        maxLength={maxLength}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        value={value}
      />
      <p className={`text-right text-sm text-muted-foreground ${value.length === maxLength ? 'text-primary-col' : ''}`}>
        {value.length}/{maxLength}
      </p>
    </div>
  );
};
