"use client"
import Image from "next/image"
import { Button } from "../ui/button"
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel, FieldLegend, FieldSeparator, FieldSet} from "../ui/field"
import { MdBlurCircular, MdOutlineHourglassBottom, MdOutlineMarkEmailRead, MdPlayCircleOutline, MdRunningWithErrors } from "react-icons/md"
import { BsCompass } from "react-icons/bs";
import { LuCircleUser, LuGhost } from "react-icons/lu";
import TextareaWithCharacterCount from "../ui/textareaWithCount"
import { RxAvatar } from "react-icons/rx";
import InputCharacterLimit from "../ui/inputWithCount"
import { ComboboxMultiple } from "../ui/comboMultiple"
import { TbMoodSpark, TbSend2 } from "react-icons/tb";
import { emailConfigSchema, EmailConfigSchema } from "@/schema/emailConfigSchema"
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod';
import { emailTones } from "@/data/data"
import EmailKeyPointsPanel from "./EmailKeyPointsPanel"
import { RadioGroup, RadioGroupItem } from "../ui/radio-group"
import { currentStep, useCurrentStepStore } from "@/store/currentStep"
import { useGenerateEmail } from "@/queries/generateEmailRequest"
import AlertFlow from "../ui/alertFlow"

export default function EmailConfig() {
    const {setCurrentStep} = useCurrentStepStore()
    const {mutate, isSuccess, isPending, isError } = useGenerateEmail()
    const {register, control, handleSubmit, formState : {errors}} = useForm<EmailConfigSchema>({
        resolver : zodResolver(emailConfigSchema),
        mode : 'onTouched',
        defaultValues : {
            purpose : '',
            recipient_name : '',
            recipient_background : '',
            key_points : [],
            tone : [],
            urgency : 'low',
            cta : ''
        }
    })

    const alertStatus = isPending ? 'pending' : isSuccess? 'success' : isError? 'failed' : 'idle'

    function submitForm(data : EmailConfigSchema) {
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
                                    Lets configure your email
                                    <MdOutlineMarkEmailRead size={24} className="text-[#bc00dd]"/>
                                </FieldLegend>
                                <FieldDescription className="dark:text-dark-text-background">following information are required</FieldDescription>
                            </div>
                        </div>
                    </FieldGroup>
            <form className="w-full shadow-md inset-shadow-2xs py-3 px-3 overflow-scroll" onSubmit={handleSubmit(submitForm)}>
                <FieldSet>
                    <FieldGroup>
                        <Field>
                            <div className="flex gap-2">
                                <BsCompass size={18}/>
                                <FieldLabel className="text-light-text-main dark:text-dark-text-main">Purpose</FieldLabel>
                            </div>
                            <TextareaWithCharacterCount
                                {...register('purpose')} 
                                placeHolder="Introducing new software" 
                                description="What is the purpose of this email"
                                maxLength={200}
                            />
                            {errors.purpose && <FieldError className="pl-1!">{errors.purpose.message}</FieldError>}
                        </Field>
                        <FieldGroup>
                            <div className="flex gap-2 justify-center">
                                <LuCircleUser size={18}/>
                                <FieldLabel className="text-light-text-main dark:text-dark-text-main">Receipient context</FieldLabel>
                            </div>
                            <Field>
                                <div className="flex gap-2">
                                    <RxAvatar size={18}/>
                                    <FieldLabel className="text-light-text-main dark:text-dark-text-main">Reciever</FieldLabel>
                                </div>
                                <InputCharacterLimit
                                    {...register('recipient_name')}
                                    placeholder="John doe or Boss"
                                    maxLength={150}
                                />
                                <FieldDescription>Who receives this email</FieldDescription>
                                {errors.recipient_name && <FieldError className="pl-1!">{errors.recipient_name.message}</FieldError>}
                            </Field>
                            <Field>
                                <div className="flex gap-2">
                                    <MdBlurCircular size={18}/>
                                    <FieldLabel className="text-light-text-main dark:text-dark-text-main">Reciever background</FieldLabel>
                                </div>
                                <TextareaWithCharacterCount 
                                    {...register('recipient_background')}
                                    placeHolder="Office manager of some company" 
                                    description="Receivers background"
                                    maxLength={300}
                                    />
                                {errors.recipient_background && <FieldError className="pl-1!">{errors.recipient_background.message}</FieldError>}
                            </Field>
                        </FieldGroup>
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
                                        <FieldError className="pl-1!">{fieldState.error.message}</FieldError>
                                    )}
                                </div>
                            )}
                        />
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
                                        itemArray={emailTones}
                                        value={field.value}
                                        onChange={field.onChange}
                                        maxSelections={3}
                                        onBlur={field.onBlur}
                                        placeholder="Select tones"
                                    />
                                )}
                            />
                            <FieldDescription>Set the tone for the email (1 - 3)</FieldDescription>
                            {errors.tone && <FieldError className="pl-1!">{errors.tone.message}</FieldError>}
                        </Field>
                        <Field>
                            <div className="flex gap-2">
                                <MdOutlineHourglassBottom size={18}/>
                                <FieldLabel className="text-light-text-main dark:text-dark-text-main">Urgency</FieldLabel>
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
                                    defaultValue={"low"}
                                    className={'flex'}
                                    >
                                        <Field orientation="horizontal">
                                        <RadioGroupItem value="low" id="low"/>
                                        <FieldLabel htmlFor="low" className="font-normal">
                                            Low
                                        </FieldLabel>
                                        </Field>
                                        <Field orientation="horizontal">
                                            <RadioGroupItem value="normal" id="normal" />
                                            <FieldLabel htmlFor="normal" className="font-normal">
                                                Normal
                                            </FieldLabel>
                                        </Field>
                                        <Field orientation="horizontal">
                                            <RadioGroupItem value="high" id="high" />
                                            <FieldLabel htmlFor="high" className="font-normal">
                                                High
                                            </FieldLabel>
                                        </Field>
                                    </RadioGroup>
                                )}
                            />
                        </Field>
                        <Field>
                            <div className="flex gap-2">
                                <MdPlayCircleOutline size={18}/>
                                <FieldLabel className="text-light-text-main dark:text-dark-text-main">CTA</FieldLabel>
                            </div>
                            <InputCharacterLimit
                                {...register('cta')}
                                placeholder="Shedule a meeting"
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
                    <Button type='button' variant='outline' className='w-fit!' onClick={() => setCurrentStep(currentStep.step1)} disabled={isPending}>Back</Button>
                    <Button type='submit' variant='default' className='w-fit!'>Generate</Button>
                </Field>
            </form>
        </div>
    )
}

