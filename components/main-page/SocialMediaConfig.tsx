"use client"
import Image from "next/image"
import { Button } from "../ui/button"
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel, FieldLegend, FieldSeparator, FieldSet} from "../ui/field"
import { MdPlayCircleOutline, MdRunningWithErrors, MdSell } from "react-icons/md"
import { AiOutlineGlobal } from "react-icons/ai";
import { GiFlatPlatform } from "react-icons/gi";
import { FaFacebook, FaInstagram, FaLinkedin, FaXTwitter } from "react-icons/fa6";
import TextareaWithCharacterCount from "../ui/textareaWithCount"
import { Controller, useForm } from "react-hook-form";
import { socialMediaConfigSchema, SocialMediaConfigSchema } from "@/schema/socialConfigSchema"
import { RiTargetFill } from "react-icons/ri";
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

export default function SocialMediaConfig() {
    const {setCurrentStep} = useCurrentStepStore()
    const { mutate, isPending, isSuccess, isError } = useGenerateSocial()
    const { handleSubmit, register, control, formState : {errors}} = useForm<SocialMediaConfigSchema>({
        resolver : zodResolver(socialMediaConfigSchema),
        defaultValues : {
            product_service : '',
            platform : 'X',
            goal : '',
            tone : [],
            cta : ''
        },
        mode : 'onTouched'
    })

    const alertStatus = isPending ? 'pending' : isSuccess? 'success' : isError? 'failed' : 'idle'

    function submitForm(data : SocialMediaConfigSchema) {
        mutate(data)
    }

    if (isSuccess) {
        const pauseForAlert = setTimeout(() => {
            setCurrentStep(currentStep.step3)
            return () => clearTimeout(pauseForAlert)
        }, 5000)
    }
    return (
        <div className="flex flex-col lg:flex-1 w-full h-175">
            {!isPending && (
                <AlertFlow 
                    status={alertStatus}
                    heading={{pending : 'Sending Request', success : 'Request received', failed : 'Error'}}
                    icon={{pending : TbSend2 , success : LuGhost, failed : MdRunningWithErrors}} 
                    description={
                        {pending : 'submitting request to ghostwriter',
                        success : 'request sent to ghostwriter', 
                        failed : 'an error occured, please try again'}}
                    />
            )}
            <FieldGroup className="flex justify-center items-center">
                <div className="flex gap-2 justify-center items-center p-3">
                    <Image
                        src={'/ghost.png'}
                        alt="ghost logo"
                        height={50}
                        width={50}
                    />
                    <div>
                        <FieldLegend className="flex items-center gap-2 dark:text-dark-text-main">
                            Lets configure your social media request
                            <AiOutlineGlobal size={24} className="text-[#bc00dd]"/>
                        </FieldLegend>
                        <FieldDescription className="dark:text-dark-text-background">following information are required</FieldDescription>
                    </div>
                </div>
            </FieldGroup>
            <form onSubmit={handleSubmit(submitForm)}  className="w-full shadow-md inset-shadow-2xs py-3 px-3 overflow-scroll">
                <FieldSet>
                    <FieldGroup>
                        <Field>
                            <div className="flex gap-2">
                                <MdSell size={18}/>
                                <FieldLabel className="text-light-text-main dark:text-dark-text-main">Produc or service</FieldLabel>
                            </div>
                            <TextareaWithCharacterCount
                                {...register('product_service')} 
                                placeHolder="Discount offer" 
                                description="What is the purpose of this post ?"
                                maxLength={300}
                            />
                            {errors.product_service && <FieldError className="pl-1!">{errors.product_service.message}</FieldError>}
                        </Field>
                        <Field>
                            <div className="flex gap-2">
                                <GiFlatPlatform size={18}/>
                                <FieldLabel className="text-light-text-main dark:text-dark-text-main">Platform</FieldLabel>
                            </div>
                            <Field>
                                <Controller
                                    control={control}
                                    name='platform'
                                    render={({field}) => (
                                        <RadioGroupButton
                                            {...field}
                                            radioArray={[
                                                {text : 'X', Icon : FaXTwitter},
                                                {text : 'Instagram', Icon : FaInstagram},
                                                {text : 'LinkedIn', Icon : FaLinkedin},
                                                {text : 'Facebook', Icon : FaFacebook}
                                            ]}
                                        />
                                    )}
                                />
                            </Field>
                        </Field>
                        <Field>
                            <div className="flex gap-2">
                                <RiTargetFill size={18}/>
                                <FieldLabel className="text-light-text-main dark:text-dark-text-main">Goal</FieldLabel>
                            </div>
                            <TextareaWithCharacterCount
                                {...register('goal')} 
                                placeHolder="Attract new customers" 
                                description="What is the goal of this post ?"
                                maxLength={300}
                            />
                            {errors.goal && <FieldError className="pl-1!">{errors.goal.message}</FieldError>}
                        </Field>
                        <Field>
                            <div className="flex gap-2">
                                <TbMoodSpark size={18}/>
                                <FieldLabel className="text-light-text-main dark:text-dark-text-main">Tone</FieldLabel>
                            </div>
                            <Controller
                                name='tone'
                                control={control}
                                render={({field}) => (
                                    <ComboboxMultiple
                                        itemArray={socialMediaTones}
                                        value={field.value}
                                        onChange={field.onChange}
                                        maxSelections={3}
                                        onBlur={field.onBlur}
                                        placeholder="Select tones"
                                    />
                                )}
                            />
                            <FieldDescription>Set the tone for the post (1 - 3)</FieldDescription>
                            {errors.tone && <FieldError className="pl-1!">{errors.tone.message}</FieldError>}
                        </Field>
                        <Field>
                            <div className="flex gap-2">
                                <MdPlayCircleOutline size={18}/>
                                <FieldLabel className="text-light-text-main dark:text-dark-text-main">CTA</FieldLabel>
                            </div>
                            <InputCharacterLimit
                                {...register('cta')}
                                placeholder="Click here to buy"
                                maxLength={300}
                            />
                            <FieldDescription>Call to action</FieldDescription>
                            {errors.cta && <FieldError className="pl-1!">{errors.cta.message}</FieldError>}
                        </Field>
                    </FieldGroup>
                </FieldSet>
                <Field className="py-2">
                    <FieldSeparator/>
                </Field>
                <Field className="flex! flex-row! w-fit! justify-between items-center">
                    <Button type='button' variant='outline' className='w-fit!'>Back</Button>
                    <Button type='submit' variant='default' className='w-fit!'>Generate</Button>
                </Field>
            </form>
        </div>
    )
}