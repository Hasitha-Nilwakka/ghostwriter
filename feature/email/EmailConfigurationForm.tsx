import { Card, CardContent} from "@/components/ui/card";
import { Field, FieldLabel } from "@/components/ui/field";
import { TbMoodSpark } from "react-icons/tb";
import FloatingTextareaWithCount from "../../components/FloatingTextArea";
import { RxQuestionMarkCircled, RxPerson } from "react-icons/rx"
import SelectComboBox from "../../components/SelectComboBox";
import { emailToneArray } from "@/data/emailTonesArray";
import { GoStopwatch } from "react-icons/go";
import { urgencyArray } from "@/data/urgencyArray";
import { MdOutlineCallToAction } from "react-icons/md";
import { useForm, Controller, useFieldArray } from 'react-hook-form'
import { EmailConfigSchema, emailConfigurationObjectSchema, useEmailConfigStore } from "@/store/email/emailConfigurationStore";
import { zodResolver } from '@hookform/resolvers/zod'
import DisplayValidationError from "@/components/DisplayValidationError";
import FloatingInputWithCount from "@/components/FloatingInput";
import { LuWaypoints } from "react-icons/lu";
import KeyPointList from "@/feature/email/KeyPointList";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PiTarget } from "react-icons/pi"
import TextareaWithCount from "@/components/ui/textAreaWithCount";
import { InpurWithCount } from "@/components/ui/inputWithCount";

interface Props {
  onValidSubmission : () => void
} 

export default function EmailConfigurationForm({onValidSubmission} : Props) {
  const currentConfig = useEmailConfigStore((state) => state.config)
  const setFormConfig = useEmailConfigStore((state) => state.setFormConfig)
  const [pointInput, setPointInput] = useState('')
  const [pointError, setPointError] = useState('')
  
  const {control, handleSubmit, formState: { errors }} = useForm<EmailConfigSchema>({
      resolver : zodResolver(emailConfigurationObjectSchema),
      defaultValues : currentConfig,
      mode : 'onTouched'
  })

  const {fields, append, remove} = useFieldArray({
    control,
    name : 'keyPoints'
  })

  const handleFormSubmit = (data : EmailConfigSchema) => {
    setFormConfig(data)
    onValidSubmission()

  }

  const keyPointsError = 
    errors.keyPoints?.root?.message || 
    (typeof errors.keyPoints?.message === 'string' ? errors.keyPoints.message : undefined);

  const handleAddKeyPoint = () => {
    if (pointInput.trim().length < 5) {
      setPointError('Point must have at least 5 characters')
      return
    }
    setPointError('')
    append({
      uuid : crypto.randomUUID(),
      key_point : pointInput.trim()
    })
    setPointInput('')
  } 

  return (
    <section className="flex flex-col gap-8 items-center">
        <Card className="p-0! max-w-3xl w-full gap-0">
            <CardContent className="py-4! px-6!">
              <div className="flex sm:flex-row flex-col gap-6">
                <div className="max-w-md w-full border-border sm:order-first order-last">
                  <form className="flex flex-col gap-2" id="email-config" onSubmit={handleSubmit(handleFormSubmit)}>
                    <div className="flex flex-col gap-4">
                      
                      {/* Purpose field*/}
                      <Field className="gap-1">
                        <Controller
                          name="purpose"
                          control={control}
                          render={({field}) => (
                            <TextareaWithCount
                              {...field}
                              id="email-purpose"
                              label="Purpose"
                              Icon={PiTarget}
                              maxLength={150}
                              placeHolder="What is the purpose of your email" 
                            />
                          )}
                        />
                        {errors.purpose?.message && <DisplayValidationError errMsg={errors.purpose.message}/>} 
                      </Field>

                      {/**Reciepient details */}
                      <Field className="gap-1">
                        <Controller
                          name="reciientDetails"
                          control={control}
                          render={({field}) => (
                            <TextareaWithCount
                              {...field}
                              id="email-reciientDetails"
                              label="Recipient details"
                              Icon={RxPerson}
                              maxLength={150}
                              placeHolder="who receives it and their background" 
                            />
                          )}
                        />
                        {errors.reciientDetails?.message && <DisplayValidationError errMsg={errors.reciientDetails.message}/>} 
                      </Field>
                      
                      {/** Key Points */}
                      <Field className="gap-1">
                        <div className="flex flex-col gap-2">
                          <InpurWithCount
                              name="email-keypoints"
                              id="email-keypoints"
                              value={pointInput}
                              onChange={(e) => setPointInput(e.target.value)}
                              placeHolder="1 to 8 points"
                              label="Key points of your email" 
                              maxLength={150} 
                              Icon={LuWaypoints}
                              disabled={fields.length >= 8}
                          />
                          <Button
                            variant='secondary'
                            type='button'
                            onClick={handleAddKeyPoint}
                          >
                            + add point
                          </Button>
                        </div>
                        {pointError && (
                          <DisplayValidationError errMsg={pointError} />
                        )}
                        {keyPointsError && (
                          <DisplayValidationError errMsg={keyPointsError} />
                        )}
                        {fields.length > 0 && (
                          <KeyPointList keyPointList={fields} remove={remove} setPointInput={setPointInput}/>
                        )}
                      </Field>

                      {/** Tone */}
                      <Field className="gap-1">
                        <div className="flex! flex-col! justify-between! gap-2">
                          <FieldLabel className="text-sm font-semibold">
                            <TbMoodSpark size={18} className="text-primary-col"/>
                            Tone
                          </FieldLabel>
                          <Controller
                            name="tone"
                            control={control}
                            render={({field}) => (
                              <SelectComboBox 
                                {...field}
                                elementList={emailToneArray}
                                placeHolder="Select tone"
                                commandPlaceholder="Search tone"
                              />
                            )}
                          />
                        </div>
                      {errors.tone?.message && <DisplayValidationError errMsg={errors.tone.message}/>}
                      </Field>
                      
                      {/**Urgency */}
                      <Field className="gap-1">
                        <div className="flex! flex-col! justify-between! gap-2">
                          <FieldLabel className="text-sm font-semibold">
                            <GoStopwatch size={18} className="text-primary-col"/>
                            Urgency
                          </FieldLabel>
                          <Controller
                            name="urgency"
                            control={control}
                            render={({field}) => (
                              <SelectComboBox 
                                {...field}
                                elementList={urgencyArray}
                                placeHolder="Select urgency"
                                commandPlaceholder="Search urgency"
                              />
                            )}
                          />
                        </div>
                      {errors.urgency?.message && <DisplayValidationError errMsg={errors.urgency.message}/>}
                      </Field>
                      
                      {/**Urgency */}
                      <Field className="gap-1">
                        <Controller
                          name="cta"
                          control={control}
                          render={({field}) => (
                            <TextareaWithCount
                              {...field}
                              id="email-cta"
                              label="Call to action"
                              Icon={MdOutlineCallToAction}
                              maxLength={150}
                              placeHolder="the single action the recipient should take" 
                            />
                          )}
                        />
                        {errors.cta?.message && <DisplayValidationError errMsg={errors.cta.message}/>}
                      </Field>

                    </div>
                  </form>
                </div>
              </div>
            </CardContent>
          </Card>
    </section>
  );
};
