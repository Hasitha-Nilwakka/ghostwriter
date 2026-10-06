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
    MdPlayCircleOutline,
    MdRunningWithErrors,
    MdSell
} from "react-icons/md";
import { AiOutlineGlobal } from "react-icons/ai";
import { GiFlatPlatform } from "react-icons/gi";
import {
    FaFacebook,
    FaInstagram,
    FaLinkedin,
    FaXTwitter
} from "react-icons/fa6";
import TextareaWithCharacterCount from "../ui/textareaWithCount";
import { Controller, useForm } from "react-hook-form";
import {
    socialMediaConfigSchema,
    SocialMediaConfigSchema
} from "@/schema/socialConfigSchema";
import { RiAiGenerate3dFill, RiTargetFill } from "react-icons/ri";
import RadioGroupButton from "../ui/radioGroupButton";
import { TbMoodSpark, TbSend2 } from "react-icons/tb";
import { ComboboxMultiple } from "../ui/comboMultiple";
import { socialMediaTones } from "@/data/data";
import InputCharacterLimit from "../ui/inputWithCount";
import { zodResolver } from "@hookform/resolvers/zod";
import { useGenerateSocial } from "@/queries/generateSocialMediaRequest";
import AlertFlow from "../ui/alertFlow";
import { LuGhost } from "react-icons/lu";
import { currentStep, useCurrentStepStore } from "@/store/currentStep";
import { useSocialMediaPollingStore } from "@/store/socialMediaPolling";
import { useEffect } from "react";
import FillMockDataButton from "./FillMockDataButton";
import { socialMediaMockPresets } from "@/data/mockFormData";

export default function SocialMediaConfig() {
    const { setCurrentStep } = useCurrentStepStore();
    const { formData, setFormData } = useSocialMediaPollingStore();
    const { mutate, isPending, isSuccess, isError } = useGenerateSocial();

    const initialValues: SocialMediaConfigSchema = formData ?? {
        product_service: "",
        platform: "X",
        goal: "",
        tone: [],
        cta: ""
    };

    const {
        handleSubmit,
        control,
        reset,
        getValues,
        formState: { errors }
    } = useForm<SocialMediaConfigSchema>({
        resolver: zodResolver(socialMediaConfigSchema),
        defaultValues: initialValues,
        mode: "onTouched"
    });

    useEffect(() => {
        if (formData) {
            reset(formData);
        }
    }, [formData, reset]);

    const alertStatus = isPending ? "pending" : isSuccess ? "success" : isError ? "failed" : "idle";

    function submitForm(data: SocialMediaConfigSchema) {
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
        <div className="flex flex-col lg:flex-1 w-full max-w-xl xl:max-w-2xl mx-auto lg:h-170 lg:max-h-[calc(100vh-140px)]">
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
                            Let&apos;s configure your post
                            <AiOutlineGlobal
                                size={22}
                                className="text-[#bc00dd]/70 dark:text-[#bc00dd]/90 transition-colors duration-200 shrink-0"
                            />
                        </FieldLegend>

                        <FieldDescription className="text-xs sm:text-sm text-light-text-background dark:text-dark-text-background transition-colors duration-200">
                            Provide the details below to generate your social media post
                        </FieldDescription>
                    </div>
                </div>

                <FillMockDataButton
                    presets={socialMediaMockPresets}
                    onSelectPreset={(data) => {
                        setFormData(data);
                        reset(data);
                    }}
                    className="self-end sm:self-center"
                />
            </div>

            <form
                onSubmit={handleSubmit(submitForm)}
                className="flex-1 min-h-0 flex flex-col w-full"
            >
                <div className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden py-3 px-2 sm:px-4 space-y-5">
                    <FieldSet>
                        <FieldGroup className="gap-5">
                            <Field>
                                <div className="flex items-center gap-2">
                                    <MdSell size={18} className="text-primary/70 shrink-0" />
                                    <FieldLabel className="text-light-text-main dark:text-dark-text-main font-medium">
                                        Product or Service
                                    </FieldLabel>
                                </div>

                                <Controller
                                    name="product_service"
                                    control={control}
                                    render={({ field }) => (
                                        <TextareaWithCharacterCount
                                            {...field}
                                            placeHolder="e.g. 50% discount on summer apparel, free shipping included"
                                            description="What product, service, or event are you promoting?"
                                            maxLength={300}
                                        />
                                    )}
                                />

                                {errors.product_service && (
                                    <FieldError className="pl-0.5">
                                        {errors.product_service.message}
                                    </FieldError>
                                )}
                            </Field>

                            <Field>
                                <div className="flex items-center gap-2">
                                    <GiFlatPlatform size={18} className="text-primary/70 shrink-0" />
                                    <FieldLabel className="text-light-text-main dark:text-dark-text-main font-medium">
                                        Platform
                                    </FieldLabel>
                                </div>

                                <Controller
                                    control={control}
                                    name="platform"
                                    render={({ field }) => (
                                        <RadioGroupButton
                                            {...field}
                                            radioArray={[
                                                { text: "X", Icon: FaXTwitter },
                                                { text: "Instagram", Icon: FaInstagram },
                                                { text: "LinkedIn", Icon: FaLinkedin },
                                                { text: "Facebook", Icon: FaFacebook }
                                            ]}
                                        />
                                    )}
                                />

                                <FieldDescription>
                                    Choose the platform to tailor formatting, character length, and style
                                </FieldDescription>

                                {errors.platform && (
                                    <FieldError className="pl-0.5">
                                        {errors.platform.message}
                                    </FieldError>
                                )}
                            </Field>

                            <Field>
                                <div className="flex items-center gap-2">
                                    <RiTargetFill size={18} className="text-primary/70 shrink-0" />
                                    <FieldLabel className="text-light-text-main dark:text-dark-text-main font-medium">
                                        Goal
                                    </FieldLabel>
                                </div>

                                <Controller
                                    name="goal"
                                    control={control}
                                    render={({ field }) => (
                                        <TextareaWithCharacterCount
                                            {...field}
                                            placeHolder="e.g. Drive website visits, generate product inquiries, or build brand awareness"
                                            description="What is the primary objective of this post?"
                                            maxLength={300}
                                        />
                                    )}
                                />

                                {errors.goal && (
                                    <FieldError className="pl-0.5">
                                        {errors.goal.message}
                                    </FieldError>
                                )}
                            </Field>

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
                                            itemArray={socialMediaTones}
                                            value={field.value}
                                            onChange={field.onChange}
                                            maxSelections={3}
                                            onBlur={field.onBlur}
                                            placeholder="Select tones (1–3)"
                                        />
                                    )}
                                />

                                <FieldDescription>
                                    Choose 1 to 3 tones that match your brand identity
                                </FieldDescription>

                                {errors.tone && (
                                    <FieldError className="pl-0.5">
                                        {errors.tone.message}
                                    </FieldError>
                                )}
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
                                            placeholder="e.g. Tap the link in bio to shop now, or drop a comment below"
                                            maxLength={300}
                                        />
                                    )}
                                />

                                <FieldDescription>
                                    What specific action do you want readers to take?
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