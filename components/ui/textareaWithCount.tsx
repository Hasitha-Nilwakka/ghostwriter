"use client";

import React, { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "cn";

interface Props extends React.ComponentProps<"textarea"> {
  description: string;
  placeHolder: string;
  maxLength: number;
}

const TextareaWithCharacterCount = ({
  description,
  placeHolder,
  maxLength,
  value,
  defaultValue,
  onChange,
  className,
  ...props
}: Props) => {
  const [internalCount, setInternalCount] = useState<number>(() => {
    if (typeof value === "string") return value.length;
    if (typeof defaultValue === "string") return defaultValue.length;
    return 0;
  });

  const textLength = typeof value === "string" ? value.length : internalCount;

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInternalCount(e.target.value.length);
    onChange?.(e);
  };

  return (
    <div className="flex w-full flex-col gap-1.5 sm:gap-2">
      <Textarea
        className={cn(
          "bg-background text-sm! min-h-20 focus-visible:ring-2 focus-visible:ring-primary/70 focus-visible:ring-offset-1",
          className
        )}
        maxLength={maxLength}
        onChange={handleChange}
        placeholder={placeHolder}
        value={value}
        defaultValue={defaultValue}
        {...props}
      />
      <div className="flex justify-between text-light-text-background dark:text-dark-text-background transition-colors duration-200 px-1">
        <p className="text-xs sm:text-sm">{description}</p>
        <p
          className={cn(
            "text-right text-xs sm:text-sm tabular-nums text-light-text-background dark:text-dark-text-background transition-colors duration-200",
            textLength >= maxLength && "text-amber-600 dark:text-amber-400 font-semibold"
          )}
        >
          {textLength}/{maxLength}
        </p>
      </div>
    </div>
  );
};

export default TextareaWithCharacterCount;
