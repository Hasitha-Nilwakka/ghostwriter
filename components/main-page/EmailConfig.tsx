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
    MdBlurCircular,
    MdOutlineHourglassBottom,
    MdOutlineMarkEmailRead,
    MdPlayCircleOutline,
    MdRunningWithErrors
} from "react-icons/md";
import { BsCompass } from "react-icons/bs";
import { LuCircleUser, LuGhost } from "react-icons/lu";
import TextareaWithCharacterCount from "../ui/textareaWithCount";
import { RxAvatar } from "react-icons/rx";
import InputCharacterLimit from "../ui/inputWithCount";
import { ComboboxMultiple } from "../ui/comboMultiple";
import { TbMoodSpark, TbSend2 } from "react-icons/tb";
import { emailConfigSchema, EmailConfigSchema } from "@/schema/emailConfigSchema";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { emailTones } from "@/data/data";
import EmailKeyPointsPanel from "./EmailKeyPointsPanel";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { currentStep, useCurrentStepStore } from "@/store/currentStep";
import { useEmailPollingStore } from "@/store/emailPolling";
import { useGenerateEmail } from "@/queries/generateEmailRequest";
import { RiAiGenerate3dFill } from "react-icons/ri";
import AlertFlow from "../ui/alertFlow";
import { useEffect } from "react";
import FillMockDataButton from "./FillMockDataButton";
import { emailMockPresets } from "@/data/mockFormData";

export default function EmailConfig() {
    const { setCurrentStep } = useCurrentStepStore();
    const { formData, setFormData } = useEmailPollingStore();

    const {
        mutate,
        isPending,
        isError,
        isSuccess
    } = useGenerateEmail();

    const initialValues: EmailConfigSchema = formData ?? {
        purpose: "",
        recipient_name: "",
        recipient_background: "",
        key_points: [],
        tone: [],
        urgency: "low",
        cta: ""
    };

    const {
        control,
        handleSubmit,
        reset,
        getValues,
        formState: { errors }
    } = useForm<EmailConfigSchema>({
        resolver: zodResolver(emailConfigSchema),
        mode: "onTouched",
        defaultValues: initialValues
    });

    useEffect(() => {
        if (formData) {
            reset(formData);
        }
    }, [formData, reset]);

    const alertStatus = isPending ? "pending" : isSuccess ? "success" : isError ? "failed" : "idle";

    function submitForm(data: EmailConfigSchema) {
        setFormData(data);
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
                        pending: "submitting request to ghostwriter",
                        success: "request sent successfully",
                        failed: "an error occured, please try again"
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
                            Let&apos;s configure your email
                            <MdOutlineMarkEmailRead
                                size={22}
                                className="text-[#bc00dd]/70 dark:text-[#bc00dd]/90 transition-colors duration-200 shrink-0"
                            />
                        </FieldLegend>

                        <FieldDescription className="text-xs sm:text-sm text-light-text-background dark:text-dark-text-background transition-colors duration-200">
                            Provide the details below to generate your email
                        </FieldDescription>
                    </div>
                </div>

                <FillMockDataButton
                    presets={emailMockPresets}
                    onSelectPreset={(data) => {
                        setFormData(data);
                        reset(data);
                    }}
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
                                    <BsCompass size={18} className="text-primary/70 shrink-0" />
                                    <FieldLabel className="text-light-text-main dark:text-dark-text-main font-medium">
                                        Purpose
                                    </FieldLabel>
                                </div>

                                <Controller
                                    name="purpose"
                                    control={control}
                                    render={({ field }) => (
                                        <TextareaWithCharacterCount
                                            {...field}
                                            placeHolder="e.g. Introduce our new product features and schedule a demo"
                                            description="What is the primary goal of this email?"
                                            maxLength={200}
                                        />
                                    )}
                                />

                                {errors.purpose && (
                                    <FieldError className="pl-0.5">
                                        {errors.purpose.message}
                                    </FieldError>
                                )}
                            </Field>

                            <div className="flex flex-col gap-4 p-3 sm:p-4 rounded-xl border border-slate-200/80 bg-slate-50/50 dark:border-white/10 dark:bg-zinc-900/40 transition-colors duration-200">
                                <div className="flex items-center gap-2 pb-1 border-b border-slate-200/60 dark:border-white/10">
                                    <LuCircleUser size={18} className="text-primary/70 shrink-0" />
                                    <span className="text-sm font-semibold text-light-text-main dark:text-dark-text-main transition-colors duration-200">
                                        Recipient Details
                                    </span>
                                </div>

                                <Field>
                                    <div className="flex items-center gap-2">
                                        <RxAvatar size={18} className="text-muted-foreground shrink-0" />
                                        <FieldLabel className="text-light-text-main dark:text-dark-text-main font-medium">
                                            Recipient Name / Role
                                        </FieldLabel>
                                    </div>

                                    <Controller
                                        name="recipient_name"
                                        control={control}
                                        render={({ field }) => (
                                            <InputCharacterLimit
                                                {...field}
                                                placeholder="e.g. John Doe or Product Hiring Team"
                                                maxLength={150}
                                            />
                                        )}
                                    />

                                    <FieldDescription>
                                        Who will receive and read this email?
                                    </FieldDescription>

                                    {errors.recipient_name && (
                                        <FieldError className="pl-0.5">
                                            {errors.recipient_name.message}
                                        </FieldError>
                                    )}
                                </Field>

                                <Field>
                                    <div className="flex items-center gap-2">
                                        <MdBlurCircular size={18} className="text-muted-foreground shrink-0" />
                                        <FieldLabel className="text-light-text-main dark:text-dark-text-main font-medium">
                                            Recipient Background
                                        </FieldLabel>
                                    </div>

                                    <Controller
                                        name="recipient_background"
                                        control={control}
                                        render={({ field }) => (
                                            <TextareaWithCharacterCount
                                                {...field}
                                                placeHolder="e.g. Engineering Director with 10+ years experience, focused on reducing server costs"
                                                description="Background, interests, or context about the recipient"
                                                maxLength={300}
                                            />
                                        )}
                                    />

                                    {errors.recipient_background && (
                                        <FieldError className="pl-0.5">
                                            {errors.recipient_background.message}
                                        </FieldError>
                                    )}
                                </Field>
                            </div>

                            <Controller
                                name="key_points"
                                control={control}
                                render={({ field, fieldState }) => (
                                    <div className="flex flex-col gap-1">
                                        <EmailKeyPointsPanel
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
                                    <TbMoodSpark size={18} className="text-primary/70 shrink-0" />
                                    <FieldLabel className="text-light-text-main dark:text-dark-text-main font-medium">
                                        Tone
                                    </FieldLabel>
                                </div>

                                <Controller
                                    name="tone"
                                    control={control}
                                    render={({ field }) => (
                                        <ComboboxMultiple
                                            itemArray={emailTones}
                                            value={field.value}
                                            onChange={field.onChange}
                                            maxSelections={3}
                                            onBlur={field.onBlur}
                                            placeholder="Select tones (1–3)"
                                        />
                                    )}
                                />

                                <FieldDescription>
                                    Choose 1 to 3 tones to guide the voice of your email
                                </FieldDescription>

                                {errors.tone && (
                                    <FieldError className="pl-0.5">
                                        {errors.tone.message}
                                    </FieldError>
                                )}
                            </Field>

                            <Field>
                                <div className="flex items-center gap-2">
                                    <MdOutlineHourglassBottom size={18} className="text-primary/70 shrink-0" />
                                    <FieldLabel className="text-light-text-main dark:text-dark-text-main font-medium">
                                        Urgency
                                    </FieldLabel>
                                </div>

                                <Controller
                                    name="urgency"
                                    control={control}
                                    render={({ field }) => (
                                        <RadioGroup
                                            value={field.value}
                                            onValueChange={field.onChange}
                                            ref={field.ref}
                                            name={field.name}
                                            defaultValue="low"
                                            className="flex items-center gap-6 sm:gap-8 pt-1"
                                        >
                                            <div className="flex items-center gap-2 cursor-pointer">
                                                <RadioGroupItem
                                                    value="low"
                                                    id="urgency-low"
                                                />
                                                <label
                                                    htmlFor="urgency-low"
                                                    className="text-sm font-medium text-light-text-main dark:text-dark-text-main cursor-pointer select-none transition-colors duration-200"
                                                >
                                                    Low
                                                </label>
                                            </div>

                                            <div className="flex items-center gap-2 cursor-pointer">
                                                <RadioGroupItem
                                                    value="normal"
                                                    id="urgency-normal"
                                                />
                                                <label
                                                    htmlFor="urgency-normal"
                                                    className="text-sm font-medium text-light-text-main dark:text-dark-text-main cursor-pointer select-none transition-colors duration-200"
                                                >
                                                    Normal
                                                </label>
                                            </div>

                                            <div className="flex items-center gap-2 cursor-pointer">
                                                <RadioGroupItem
                                                    value="high"
                                                    id="urgency-high"
                                                />
                                                <label
                                                    htmlFor="urgency-high"
                                                    className="text-sm font-medium text-light-text-main dark:text-dark-text-main cursor-pointer select-none transition-colors duration-200"
                                                >
                                                    High
                                                </label>
                                            </div>
                                        </RadioGroup>
                                    )}
                                />

                                <FieldDescription>
                                    Set how urgent the message should feel
                                </FieldDescription>
                            </Field>

                            <Field>
                                <div className="flex items-center gap-2">
                                    <MdPlayCircleOutline size={18} className="text-primary/70 shrink-0" />
                                    <FieldLabel className="text-light-text-main dark:text-dark-text-main font-medium">
                                        Call to Action (CTA)
                                    </FieldLabel>
                                </div>

                                <Controller
                                    name="cta"
                                    control={control}
                                    render={({ field }) => (
                                        <InputCharacterLimit
                                            {...field}
                                            placeholder="e.g. Schedule a 15-minute intro call this week"
                                            maxLength={300}
                                        />
                                    )}
                                />

                                <FieldDescription>
                                    What specific action should the recipient take?
                                </FieldDescription>

                                {errors.cta && (
                                    <FieldError className="pl-0.5">
                                        {errors.cta.message}
                                    </FieldError>
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
                        onClick={() => {
                            setFormData(getValues());
                            setCurrentStep(currentStep.step1);
                        }}
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