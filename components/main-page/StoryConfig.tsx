"use client";

import Image from "next/image";
import { Button } from "../ui/button";
import {
    Field,
    FieldDescription,
    FieldError,
    FieldGroup,
    FieldLabel,
    FieldLegend,
    FieldSet
} from "../ui/field";
import {
    MdArrowBack,
    MdAutoStories,
    MdFormatPaint,
    MdLandscape,
    MdOutlineTimer,
    MdPeople,
    MdPsychology,
    MdRunningWithErrors
} from "react-icons/md";
import { TbSend2 } from "react-icons/tb";
import { LuGhost } from "react-icons/lu";
import { GiDramaMasks } from "react-icons/gi";
import { RiAiGenerate3dFill } from "react-icons/ri";
import TextareaWithCharacterCount from "../ui/textareaWithCount";
import { ComboboxMultiple } from "../ui/comboMultiple";
import { Input } from "../ui/input";
import { useForm, Controller, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { storyConfigSchema, StoryConfigSchema } from "@/schema/storyConfigSchema";
import {
    storyGenres,
    storyMoods,
    storyStyles,
    storyAudiences
} from "@/data/data";
import StoryCharactersPanel from "./StoryCharactersPanel";
import { currentStep, useCurrentStepStore } from "@/store/currentStep";
import { useGenerateStory } from "@/queries/generateStoryRequest";
import AlertFlow from "../ui/alertFlow";
import { useEffect } from "react";
import { cn } from "@/lib/utils";
import FillMockDataButton from "./FillMockDataButton";
import { storyMockPresets } from "@/data/mockFormData";

const WORD_COUNT_PRESETS = [300, 400, 600, 800, 1000];

export default function StoryConfig() {
    const { setCurrentStep } = useCurrentStepStore();
    const { mutate, isPending, isSuccess, isError } = useGenerateStory();

    const {
        register,
        control,
        handleSubmit,
        setValue,
        reset,
        formState: { errors }
    } = useForm<StoryConfigSchema>({
        resolver: zodResolver(storyConfigSchema),
        mode: "onTouched",
        defaultValues: {
            genre: [],
            characters: [],
            setting: "",
            length_words: 400,
            style: [],
            target_audience: [],
            mood: []
        }
    });

    const currentWordCount = useWatch({ control, name: "length_words" });
    const alertStatus = isPending ? "pending" : isSuccess ? "success" : isError ? "failed" : "idle";

    function submitForm(data: StoryConfigSchema) {
        mutate(data);
    }

    useEffect(() => {
        if (isSuccess) {
            const timer = setTimeout(() => {
                setCurrentStep(currentStep.step3);
            }, 1500);
            return () => clearTimeout(timer);
        }
    }, [isSuccess, setCurrentStep]);

    return (
        <div className="flex flex-col lg:flex-1 w-full max-w-xl xl:max-w-2xl mx-auto lg:h-[680px] lg:max-h-[calc(100vh-140px)]">
            {alertStatus !== "idle" && (
                <AlertFlow
                    status={alertStatus}
                    heading={{
                        pending: "Sending Request",
                        success: "Request Sent",
                        failed: "Error"
                    }}
                    icon={{
                        pending: TbSend2,
                        success: LuGhost,
                        failed: MdRunningWithErrors
                    }}
                    description={{
                        pending: "Submitting story generation request to Ghostwriter",
                        success: "Request sent successfully",
                        failed: "An error occurred, please try again"
                    }}
                />
            )}

            <div className="shrink-0 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pb-2 px-1 sm:px-2">
                <div className="flex gap-3 items-center p-1 sm:p-2">
                    <Image
                        src="/ghost.png"
                        alt="ghost logo"
                        height={50}
                        width={50}
                        className="size-10 sm:size-12 object-contain shrink-0"
                    />

                    <div>
                        <FieldLegend className="flex text-lg sm:text-xl font-semibold items-center gap-2 text-light-text-main dark:text-dark-text-main transition-colors duration-200">
                            Let&apos;s configure your short story
                            <MdAutoStories
                                size={22}
                                className="text-[#f77f00]/70 dark:text-[#f77f00]/90 transition-colors duration-200 shrink-0"
                            />
                        </FieldLegend>

                        <FieldDescription className="text-xs sm:text-sm text-light-text-background dark:text-dark-text-background transition-colors duration-200">
                            Provide the details below to generate your narrative
                        </FieldDescription>
                    </div>
                </div>

                <FillMockDataButton
                    presets={storyMockPresets}
                    onSelectPreset={(data) => reset(data)}
                    className="self-end sm:self-center"
                />
            </div>

            <form
                className="flex-1 min-h-0 flex flex-col w-full"
                onSubmit={handleSubmit(submitForm)}
            >
                <div className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden py-3 px-2 sm:px-4 space-y-5">
                    <FieldSet>
                        <FieldGroup className="gap-5">
                            <Field>
                                <div className="flex items-center gap-2">
                                    <GiDramaMasks size={18} className="text-primary/70 shrink-0" />
                                    <FieldLabel className="text-light-text-main dark:text-dark-text-main font-medium">
                                        Genre
                                    </FieldLabel>
                                </div>

                                <Controller
                                    name="genre"
                                    control={control}
                                    render={({ field }) => (
                                        <ComboboxMultiple
                                            itemArray={storyGenres}
                                            value={field.value}
                                            onChange={field.onChange}
                                            maxSelections={2}
                                            onBlur={field.onBlur}
                                            placeholder="Select genres (1–2)"
                                        />
                                    )}
                                />

                                <FieldDescription>Choose 1 to 2 narrative genres</FieldDescription>

                                {errors.genre && (
                                    <FieldError className="pl-0.5">{errors.genre.message}</FieldError>
                                )}
                            </Field>

                            <Field>
                                <div className="flex items-center gap-2">
                                    <MdLandscape size={18} className="text-primary/70 shrink-0" />
                                    <FieldLabel className="text-light-text-main dark:text-dark-text-main font-medium">
                                        Setting
                                    </FieldLabel>
                                </div>

                                <TextareaWithCharacterCount
                                    {...register("setting")}
                                    placeHolder="e.g. An abandoned lighthouse perched on a fog-drenched island in 1924"
                                    description="Where and when does the story take place?"
                                    maxLength={300}
                                />

                                {errors.setting && (
                                    <FieldError className="pl-0.5">{errors.setting.message}</FieldError>
                                )}
                            </Field>

                            <Controller
                                name="characters"
                                control={control}
                                render={({ field, fieldState }) => (
                                    <div className="flex flex-col gap-1">
                                        <StoryCharactersPanel
                                            value={field.value}
                                            onChange={field.onChange}
                                        />
                                        {fieldState.error && (
                                            <FieldError className="pl-0.5">
                                                {fieldState.error.message}
                                            </FieldError>
                                        )}
                                    </div>
                                )}
                            />

                            <Field>
                                <div className="flex items-center gap-2">
                                    <MdOutlineTimer size={18} className="text-primary/70 shrink-0" />
                                    <FieldLabel className="text-light-text-main dark:text-dark-text-main font-medium">
                                        Length (Words: 300–1000)
                                    </FieldLabel>
                                </div>

                                <div className="flex flex-col gap-2 pt-0.5">
                                    <div className="flex items-center gap-2.5 flex-wrap">
                                        <Input
                                            type="number"
                                            min={300}
                                            max={1000}
                                            step={50}
                                            {...register("length_words", { valueAsNumber: true })}
                                            className="h-9 w-28 text-sm tabular-nums"
                                        />
                                        <div className="flex items-center gap-1.5 flex-wrap">
                                            {WORD_COUNT_PRESETS.map((preset) => (
                                                <button
                                                    key={preset}
                                                    type="button"
                                                    onClick={() =>
                                                        setValue("length_words", preset, {
                                                            shouldValidate: true,
                                                            shouldTouch: true
                                                        })
                                                    }
                                                    className={cn(
                                                        "px-2.5 py-1 text-xs font-medium rounded-lg border transition-colors duration-200 cursor-pointer",
                                                        currentWordCount === preset
                                                            ? "border-primary bg-primary/10 text-primary dark:border-primary/80 dark:bg-primary/15"
                                                            : "border-slate-200/80 dark:border-white/10 bg-white/40 dark:bg-zinc-900/50 text-muted-foreground hover:text-foreground hover:border-slate-300 dark:hover:border-white/20"
                                                    )}
                                                >
                                                    {preset}w
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                    <FieldDescription>
                                        Target word count (Ghostwriter adheres strictly within ±10%)
                                    </FieldDescription>
                                </div>

                                {errors.length_words && (
                                    <FieldError className="pl-0.5">
                                        {errors.length_words.message}
                                    </FieldError>
                                )}
                            </Field>

                            <Field>
                                <div className="flex items-center gap-2">
                                    <MdFormatPaint size={18} className="text-primary/70 shrink-0" />
                                    <FieldLabel className="text-light-text-main dark:text-dark-text-main font-medium">
                                        Style
                                    </FieldLabel>
                                </div>

                                <Controller
                                    name="style"
                                    control={control}
                                    render={({ field }) => (
                                        <ComboboxMultiple
                                            itemArray={storyStyles}
                                            value={field.value}
                                            onChange={field.onChange}
                                            maxSelections={2}
                                            onBlur={field.onBlur}
                                            placeholder="Select writing styles (1–2)"
                                        />
                                    )}
                                />

                                <FieldDescription>Choose 1 to 2 prose and storytelling styles</FieldDescription>

                                {errors.style && (
                                    <FieldError className="pl-0.5">{errors.style.message}</FieldError>
                                )}
                            </Field>

                            <Field>
                                <div className="flex items-center gap-2">
                                    <MdPeople size={18} className="text-primary/70 shrink-0" />
                                    <FieldLabel className="text-light-text-main dark:text-dark-text-main font-medium">
                                        Target Audience
                                    </FieldLabel>
                                </div>

                                <Controller
                                    name="target_audience"
                                    control={control}
                                    render={({ field }) => (
                                        <ComboboxMultiple
                                            itemArray={storyAudiences}
                                            value={field.value}
                                            onChange={field.onChange}
                                            maxSelections={2}
                                            onBlur={field.onBlur}
                                            placeholder="Select target audience (1–2)"
                                        />
                                    )}
                                />

                                <FieldDescription>Intended readership and maturity level</FieldDescription>

                                {errors.target_audience && (
                                    <FieldError className="pl-0.5">{errors.target_audience.message}</FieldError>
                                )}
                            </Field>

                            <Field>
                                <div className="flex items-center gap-2">
                                    <MdPsychology size={18} className="text-primary/70 shrink-0" />
                                    <FieldLabel className="text-light-text-main dark:text-dark-text-main font-medium">
                                        Mood
                                    </FieldLabel>
                                </div>

                                <Controller
                                    name="mood"
                                    control={control}
                                    render={({ field }) => (
                                        <ComboboxMultiple
                                            itemArray={storyMoods}
                                            value={field.value}
                                            onChange={field.onChange}
                                            maxSelections={2}
                                            onBlur={field.onBlur}
                                            placeholder="Select moods (1–2)"
                                        />
                                    )}
                                />

                                <FieldDescription>Choose 1 to 2 emotional tones</FieldDescription>

                                {errors.mood && (
                                    <FieldError className="pl-0.5">{errors.mood.message}</FieldError>
                                )}
                            </Field>
                        </FieldGroup>
                    </FieldSet>
                </div>

                <div className="shrink-0 flex items-center justify-between w-full pt-4 pb-1 px-2 sm:px-4 mt-2 border-t border-slate-200/80 dark:border-white/10">
                    <Button
                        type="button"
                        variant="outline"
                        className="w-auto! shrink-0 flex items-center gap-2 cursor-pointer h-10 px-4 text-sm font-medium transition-colors duration-200"
                        onClick={() => setCurrentStep(currentStep.step1)}
                        disabled={isPending || isSuccess}
                    >
                        <MdArrowBack size={18} />
                        Back
                    </Button>

                    <Button
                        type="submit"
                        variant="default"
                        className="w-auto! shrink-0 flex items-center gap-2 cursor-pointer h-10 px-5 text-sm font-medium transition-colors duration-200 shadow-sm"
                        disabled={isPending || isSuccess}
                    >
                        <RiAiGenerate3dFill size={18} />
                        Generate
                    </Button>
                </div>
            </form>
        </div>
    );
}
