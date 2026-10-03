"use client";

import { Button } from "../ui/button";
import { Field, FieldLabel, FieldDescription } from "../ui/field";
import InputCharacterLimit from "../ui/inputWithCount";
import TextareaWithCharacterCount from "../ui/textareaWithCount";
import { MdAdd, MdCheck, MdClose, MdEdit, MdPeople } from "react-icons/md";
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { StoryCharacterConfig } from "@/schema/storyConfigSchema";
import DeleteDialog from "../ui/deleteDialog";

interface StoryCharactersPanelProps {
    value: StoryCharacterConfig[];
    onChange: (value: StoryCharacterConfig[]) => void;
}

export default function StoryCharactersPanel({ value, onChange }: StoryCharactersPanelProps) {
    const [name, setName] = useState("");
    const [role, setRole] = useState("");
    const [description, setDescription] = useState("");
    const [editingId, setEditingId] = useState<string | null>(null);
    const [validationError, setValidationError] = useState<string | null>(null);

    function handleAddOrUpdate(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault();

        const trimmedName = name.trim();
        const trimmedRole = role.trim();
        const trimmedDesc = description.trim();

        if (!trimmedName || !trimmedRole || !trimmedDesc) {
            setValidationError("All character fields (Name, Role, Description) are required.");
            return;
        }

        setValidationError(null);

        if (editingId) {
            const updated = value.map((char) =>
                char.id === editingId
                    ? { id: editingId, name: trimmedName, role: trimmedRole, description: trimmedDesc }
                    : char
            );
            onChange(updated);
            setEditingId(null);
        } else {
            if (value.length >= 4) {
                setValidationError("Maximum 4 characters allowed.");
                return;
            }
            const newChar: StoryCharacterConfig = {
                id: crypto.randomUUID(),
                name: trimmedName,
                role: trimmedRole,
                description: trimmedDesc
            };
            onChange([...value, newChar]);
        }

        setName("");
        setRole("");
        setDescription("");
    }

    function handleEdit(char: StoryCharacterConfig) {
        setEditingId(char.id || null);
        setName(char.name);
        setRole(char.role);
        setDescription(char.description);
        setValidationError(null);
    }

    function handleDelete(id?: string) {
        if (!id) return;
        const remaining = value.filter((c) => c.id !== id);
        onChange(remaining);
        if (editingId === id) {
            setEditingId(null);
            setName("");
            setRole("");
            setDescription("");
        }
    }

    function handleCancelEdit() {
        setEditingId(null);
        setName("");
        setRole("");
        setDescription("");
        setValidationError(null);
    }

    return (
        <Field className="gap-3">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <MdPeople size={18} className="text-primary/70 shrink-0" />
                    <FieldLabel className="text-light-text-main dark:text-dark-text-main font-medium">
                        Characters (1–4)
                    </FieldLabel>
                </div>
                <span
                    className={cn(
                        "text-xs tabular-nums font-medium transition-colors duration-200",
                        value.length >= 4 ? "text-amber-500 dark:text-amber-400" : "text-muted-foreground"
                    )}
                >
                    {value.length}/4
                </span>
            </div>

            <FieldDescription>
                Add key characters with their role and personality traits for the story.
            </FieldDescription>

            <div className="p-3 sm:p-4 border border-slate-200/80 dark:border-white/10 rounded-xl bg-slate-50/50 dark:bg-zinc-900/40 flex flex-col gap-3 transition-colors duration-200 shadow-2xs">
                <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        {editingId ? "Edit Character" : "New Character"}
                    </span>
                    {editingId && (
                        <span className="text-xs text-primary font-medium">
                            Editing mode
                        </span>
                    )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="flex flex-col gap-1">
                        <label className="text-xs font-medium text-foreground">Character Name</label>
                        <InputCharacterLimit
                            placeholder="e.g. Maya or Captain Reynolds"
                            value={name}
                            onChange={(e) => {
                                setName(e.target.value);
                                if (validationError) setValidationError(null);
                            }}
                            maxLength={80}
                            disabled={!editingId && value.length >= 4}
                            className="h-9 text-sm"
                        />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label className="text-xs font-medium text-foreground">Role</label>
                        <InputCharacterLimit
                            placeholder="e.g. Young Explorer or Ship Captain"
                            value={role}
                            onChange={(e) => {
                                setRole(e.target.value);
                                if (validationError) setValidationError(null);
                            }}
                            maxLength={80}
                            disabled={!editingId && value.length >= 4}
                            className="h-9 text-sm"
                        />
                    </div>
                </div>

                <div className="flex flex-col gap-1">
                    <label className="text-xs font-medium text-foreground">Brief Description</label>
                    <TextareaWithCharacterCount
                        placeHolder="e.g. Curious, brave, and carries an antique brass compass"
                        description="Personality, motivations, and distinctive traits"
                        value={description}
                        onChange={(e) => {
                            setDescription(e.target.value);
                            if (validationError) setValidationError(null);
                        }}
                        maxLength={250}
                        disabled={!editingId && value.length >= 4}
                    />
                </div>

                {validationError && (
                    <p className="text-xs text-destructive font-medium">{validationError}</p>
                )}

                <div className="flex gap-2 justify-end pt-1">
                    {editingId && (
                        <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={handleCancelEdit}
                            className="h-8 px-3 text-xs sm:text-sm font-medium transition-colors duration-200 cursor-pointer"
                        >
                            <MdClose size={14} className="mr-1" />
                            Cancel
                        </Button>
                    )}
                    <Button
                        type="button"
                        size="sm"
                        variant="default"
                        onClick={handleAddOrUpdate}
                        disabled={!editingId && value.length >= 4}
                        className={cn(
                            "h-8 px-3.5 text-xs sm:text-sm font-medium transition-colors duration-200 cursor-pointer text-white",
                            editingId
                                ? "bg-primary hover:bg-primary/90"
                                : "bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-600 dark:hover:bg-emerald-500"
                        )}
                    >
                        {editingId ? (
                            <>
                                <MdCheck size={16} className="mr-1" />
                                Save Changes
                            </>
                        ) : (
                            <>
                                <MdAdd size={16} className="mr-1" />
                                Add Character
                            </>
                        )}
                    </Button>
                </div>
            </div>

            {value.length > 0 ? (
                <div className="flex flex-col gap-2 mt-1">
                    {value.map((char, index) => (
                        <div
                            key={char.id || index}
                            className={cn(
                                "flex items-start justify-between p-3 rounded-lg border border-slate-200/80 bg-white/40 dark:border-white/10 dark:bg-zinc-900/60 shadow-2xs gap-3 transition-colors duration-200",
                                editingId === char.id && "ring-2 ring-primary border-primary/50"
                            )}
                        >
                            <div className="flex items-start gap-2.5 flex-1 min-w-0">
                                <span className="shrink-0 mt-0.5 flex size-5 items-center justify-center rounded-full bg-primary/10 text-primary text-[11px] font-semibold tabular-nums">
                                    {index + 1}
                                </span>
                                <div className="flex flex-col flex-1 min-w-0">
                                    <div className="flex items-center gap-2 flex-wrap">
                                        <span className="font-semibold text-sm text-foreground">
                                            {char.name}
                                        </span>
                                        <span className="text-xs text-muted-foreground bg-secondary text-secondary-foreground border border-border/40 px-2 py-0.5 rounded-md font-medium">
                                            {char.role}
                                        </span>
                                    </div>
                                    <p className="text-xs sm:text-sm text-muted-foreground dark:text-zinc-400 mt-1 leading-relaxed break-words">
                                        {char.description}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-1.5 shrink-0 pt-0.5">
                                <Button
                                    type="button"
                                    variant="secondary"
                                    size="icon-xs"
                                    className="h-7 w-7 p-0 cursor-pointer shrink-0 transition-colors duration-200"
                                    onClick={() => handleEdit(char)}
                                    title="Edit character"
                                >
                                    <MdEdit size={14} />
                                </Button>
                                <DeleteDialog
                                    iconTrigger={true}
                                    title={`Remove "${char.name}"?`}
                                    description="Are you sure you want to remove this character from the story?"
                                    action={() => handleDelete(char.id)}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-3.5 px-3 rounded-lg border border-dashed border-slate-200/80 dark:border-white/10 text-xs text-muted-foreground transition-colors duration-200 mt-1">
                    No characters added yet. Add at least 1 character to proceed.
                </div>
            )}
        </Field>
    );
}
