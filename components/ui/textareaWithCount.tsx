"use client";

import React, { useState } from "react";
import { Textarea } from "@/components/ui/textarea";

interface Props extends React.ComponentProps<"textarea"> {
  description : string,
  placeHolder : string,
  maxLength : number,
  ref? : React.Ref<HTMLTextAreaElement>
}

const TextareaWithCharacterCount = (
  {
    description, 
    placeHolder, 
    maxLength,
    value,
    onChange,
    ref,
    ...props
  } : Props) => {
  
    const textLength = typeof value === 'string' ? value.length : 0


  return (
    <div className="flex w-full max-w-md flex-col gap-2">
      <Textarea
        ref={ref}
        className="bg-background text-sm!"
        id="message"
        maxLength={maxLength}
        onChange={onChange}
        placeholder={placeHolder}
        value={value}
        {...props}
      />
      <div className="flex justify-between text-light-text-background px-1">
        <p className="text-sm">{description}</p>
        <p className={`text-right text-sm text-light-text-background ${textLength === maxLength ? 'text-teal-500' : ''}`}>
          {textLength}/{maxLength}
        </p>
      </div>
    </div>
  );
};

export default TextareaWithCharacterCount;
