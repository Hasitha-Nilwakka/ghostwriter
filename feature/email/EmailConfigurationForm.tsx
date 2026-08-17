import { Card, CardContent} from "@/components/ui/card";
import { Field, FieldLabel } from "@/components/ui/field";
import { TbMoodSpark } from "react-icons/tb";
import FloatingTextareaWithCount from "../../components/FloatingTextArea";
import { RxQuestionMarkCircled, RxPerson } from "react-icons/rx"
import { LuWaypoints } from "react-icons/lu";
import SelectComboBox from "../../components/SelectComboBox";
import { emailToneArray } from "@/data/emailTonesArray";
import { GoStopwatch } from "react-icons/go";
import { urgencyArray } from "@/data/urgencyArray";
import { MdOutlineCallToAction } from "react-icons/md";
import FloatingInputWithCount from "../../components/FloatingInput";
import { useKeyPointStore } from "@/store/email/keyPointsStore";

export default function EmailConfigurationForm() {
  const keyPointsArray = useKeyPointStore((state) => state.keyPoints)
  
  return (
    <section className="flex flex-col gap-8 items-center">
        <Card className="p-0! max-w-3xl w-full gap-0">
            <CardContent className="py-4! px-6!">
              <div className="flex sm:flex-row flex-col gap-6">
                <div className="max-w-md w-full border-border sm:order-first order-last">
                  <form className="flex flex-col gap-2">
                    <div className="flex flex-col gap-2">
                      <Field className="gap-1">
                        <FloatingTextareaWithCount
                          label="Purpose"
                          description="what is the purpose of your email" 
                          maxLength={150} 
                          icon={RxQuestionMarkCircled}
                        />
                      </Field>
                      <Field className="gap-1">
                        <FloatingTextareaWithCount
                          label="Recipient details"
                          description="who receives it and their background" 
                          maxLength={150} 
                          icon={RxPerson}
                        />
                      </Field>
                      <Field className="gap-1">
                        <FloatingInputWithCount 
                          description="1–8 points"
                          label="Key points of your email" 
                          maxLength={150} 
                          icon={LuWaypoints}
                        />
                        {keyPointsArray.map((k) => (
                          <FieldLabel key={k.uuid}>{k.key_point}</FieldLabel>
                        ))}
                      </Field>
                      <Field className="flex! flex-row! justify-center! mt-3!">
                        <FieldLabel className="text-sm text-form-gray font-semibold">
                          <TbMoodSpark size={18}/>
                          Tone
                        </FieldLabel>
                        <SelectComboBox 
                          elementList={emailToneArray}
                          placeHolder="Select tone"
                          commandPlaceholder="Search tone"
                        />
                      </Field>
                      <Field className="flex! flex-row! justify-center! mt-3! mb-2!">
                        <FieldLabel className="text-sm text-form-gray font-semibold">
                          <GoStopwatch size={18}/>
                          Urgency
                        </FieldLabel>
                        <SelectComboBox 
                          elementList={urgencyArray}
                          placeHolder="Select urgency"
                          commandPlaceholder="Search urgency"
                        />
                      </Field>
                      <Field className="gap-1">
                        <FloatingTextareaWithCount 
                          label="Call to action"
                          description="the single action the recipient should take" 
                          maxLength={50} 
                          icon={MdOutlineCallToAction}
                        />
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
