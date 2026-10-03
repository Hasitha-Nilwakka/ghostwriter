import React from "react";
import { IconType } from "react-icons/lib";
import { cn } from "@/lib/utils";

type radioElement = {
    text: string;
    Icon: IconType;
};

interface Props extends React.ComponentProps<"input"> {
    radioArray: radioElement[];
    name: string;
}

export default function RadioGroupButton({
    radioArray,
    onChange,
    value,
    name,
    onBlur
}: Props) {
    return (
        <div className="grid grid-cols-4 gap-2 sm:gap-3 w-full max-w-lg pt-1">
            {radioArray?.map((r) => {
                const optionValue = r.text;
                const isChecked = value === optionValue;
                const inputId = `platform-${name}-${optionValue.toLowerCase()}`;
                return (
                    <div key={r.text} className="min-w-0 flex-1">
                        <label
                            htmlFor={inputId}
                            className="group flex flex-col justify-center items-center gap-1.5 cursor-pointer p-0.5"
                        >
                            <input
                                id={inputId}
                                type="radio"
                                name={name}
                                className="peer sr-only"
                                value={optionValue}
                                checked={isChecked}
                                onChange={onChange}
                                onBlur={onBlur}
                            />
                            <div
                                className={cn(
                                    "flex justify-center items-center w-full max-w-[64px] aspect-square rounded-xl border p-2 sm:p-2.5 transition-colors duration-200 cursor-pointer peer-focus-visible:ring-3 peer-focus-visible:ring-primary/80 peer-focus-visible:ring-offset-2 dark:peer-focus-visible:ring-offset-zinc-950",
                                    isChecked
                                        ? "border-primary bg-primary/10 text-primary dark:border-primary/80 dark:bg-primary/15 dark:text-primary shadow-xs"
                                        : "border-slate-200/80 dark:border-white/10 bg-white/40 dark:bg-zinc-900/50 text-light-text-background dark:text-dark-text-background hover:border-slate-300 dark:hover:border-white/20 hover:text-foreground"
                                )}
                            >
                                <r.Icon className="size-5 sm:size-6 shrink-0 transition-colors duration-200" />
                            </div>
                            <span
                                className={cn(
                                    "text-xs sm:text-sm text-center truncate max-w-full transition-colors duration-200 select-none",
                                    isChecked
                                        ? "font-semibold text-primary dark:text-primary"
                                        : "font-medium text-light-text-background dark:text-dark-text-background group-hover:text-foreground"
                                )}
                            >
                                {r.text}
                            </span>
                        </label>
                    </div>
                );
            })}
        </div>
    );
}