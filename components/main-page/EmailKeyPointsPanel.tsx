import { Button } from "../ui/button";
import { Field, FieldLabel, FieldError } from "../ui/field";
import { Input } from "../ui/input";
import { MdAdd, MdEdit, MdOutlineFactCheck } from "react-icons/md";
import { AiOutlineEnter } from "react-icons/ai";
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { KeyPoint } from "@/types/types";
import DeleteDialog from "../ui/deleteDialog";

interface EmailKeyPointsPanelProps {
    value: KeyPoint[];
    onChange: (value: KeyPoint[]) => void;
}

export default function EmailKeyPointsPanel({ value, onChange }: EmailKeyPointsPanelProps) {
    const [inputValue, setInputValue] = useState('');
    const [showError, setShowError] = useState(false);

    function handleSubmit(e: React.KeyboardEvent<HTMLInputElement> | React.MouseEvent<HTMLButtonElement>) {
        const isEnterKey = "key" in e && e.key === 'Enter';
        const isClick = e.type === 'click';

        if (isEnterKey || isClick) {
            e.preventDefault();
            const trimmedValue = inputValue.trim();

            if (trimmedValue.length < 5) {
                setShowError(true);
                return;
            } else {
                setShowError(false);
            }

            if (trimmedValue && !value.some(item => item.text.toLowerCase() === trimmedValue.toLowerCase())) {
                const newItem: KeyPoint = {
                    id: crypto.randomUUID(),
                    text: trimmedValue
                };
                onChange([...value, newItem]);
            }
            setInputValue('');
        }
    }

    function handleEditAndDelete(point: KeyPoint, option: 'edit' | 'delete') {
        const newArray = value.filter(k => k.id !== point.id);
        if (option === 'edit') {
            setInputValue(point.text);
            setShowError(false);
        }
        onChange(newArray);
    }

    return (
        <Field className="gap-2">
            <div className="flex items-center justify-between">
                <div className="flex gap-2 items-center">
                    <MdOutlineFactCheck size={18} className="text-primary/70 shrink-0" />
                    <FieldLabel className="text-light-text-main dark:text-dark-text-main font-medium">
                        Key Points
                    </FieldLabel>
                </div>
                <span
                    className={cn(
                        "text-xs tabular-nums font-medium transition-colors duration-200",
                        value.length >= 8 ? "text-amber-500 dark:text-amber-400" : "text-muted-foreground"
                    )}
                >
                    {value.length}/8
                </span>
            </div>

            <div className="flex gap-2 items-center">
                <div className="relative flex-1">
                    <Input
                        maxLength={300}
                        value={inputValue}
                        onChange={(e) => {
                            setInputValue(e.target.value);
                            if (showError && e.target.value.trim().length >= 5) {
                                setShowError(false);
                            }
                        }}
                        onKeyDown={(e) => handleSubmit(e)}
                        disabled={value.length >= 8}
                        placeholder={
                            value.length >= 8
                                ? "Maximum 8 key points reached"
                                : "Add a key point (min 5 characters)..."
                        }
                        className="h-9 pr-16 text-sm"
                    />
                    {inputValue.length > 0 && (
                        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-[11px] tabular-nums text-muted-foreground transition-colors duration-200">
                            {inputValue.length}/300
                        </span>
                    )}
                </div>
                <Button
                    variant="default"
                    size="sm"
                    className="h-9 px-3.5 shrink-0 flex items-center gap-1 font-medium bg-emerald-600 hover:bg-emerald-700 text-white dark:bg-emerald-600 dark:hover:bg-emerald-500 disabled:opacity-40 transition-colors duration-200 cursor-pointer"
                    onClick={(e) => handleSubmit(e)}
                    disabled={value.length >= 8 || inputValue.trim().length < 5}
                    type="button"
                    title="Add key point"
                >
                    <MdAdd size={18} />
                    <span className="hidden sm:inline text-xs font-semibold">Add</span>
                </Button>
            </div>

            <div className="flex items-center justify-between text-xs text-light-text-background dark:text-dark-text-background transition-colors duration-200 px-0.5">
                <span className="flex items-center gap-1">
                    Add 1–8 points (press <AiOutlineEnter className="inline" /> or click Add)
                </span>
            </div>

            {showError && (
                <FieldError className="pl-0.5">
                    Key point must be at least 5 characters
                </FieldError>
            )}

            {value.length > 0 ? (
                <div className="flex flex-col gap-2 w-full mt-1.5">
                    {value.map((k, i) => (
                        <div
                            key={k.id}
                            className="group flex items-center justify-between gap-3 p-2.5 sm:px-3 sm:py-2.5 rounded-lg border border-slate-200/80 bg-white/40 dark:border-white/10 dark:bg-zinc-900/60 shadow-2xs hover:border-slate-300 dark:hover:border-white/20 transition-colors duration-200"
                        >
                            <div className="flex items-start gap-2.5 flex-1 min-w-0">
                                <span className="shrink-0 mt-0.5 flex size-5 items-center justify-center rounded-full bg-primary/10 text-primary text-[11px] font-semibold tabular-nums">
                                    {i + 1}
                                </span>
                                <span className="flex-1 min-w-0 break-words text-xs sm:text-sm text-light-text-main dark:text-dark-text-main leading-relaxed">
                                    {k.text}
                                </span>
                            </div>
                            <div className="flex items-center gap-1.5 shrink-0">
                                <Button
                                    type="button"
                                    variant="secondary"
                                    size="icon-xs"
                                    className="h-7 w-7 p-0 cursor-pointer shrink-0 transition-colors duration-200"
                                    onClick={() => handleEditAndDelete(k, "edit")}
                                    title="Edit key point"
                                >
                                    <MdEdit size={14} />
                                </Button>
                                <DeleteDialog
                                    iconTrigger={true}
                                    title="Remove key point?"
                                    description="Are you sure you want to remove this key point?"
                                    action={() => handleEditAndDelete(k, "delete")}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-3.5 px-3 rounded-lg border border-dashed border-slate-200/80 dark:border-white/10 text-xs text-muted-foreground transition-colors duration-200 mt-1">
                    No key points added yet. Add at least 1 key point to proceed.
                </div>
            )}
        </Field>
    );
}