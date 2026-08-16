import { Card, CardContent} from "@/components/ui/card";
import { Field, FieldLabel } from "@/components/ui/field";
import { TbMoodSpark } from "react-icons/tb";
import FloatingTextareaWithCount from "./FloatingTextArea";
import { RxQuestionMarkCircled, RxPerson } from "react-icons/rx"
import { LuWaypoints } from "react-icons/lu";
import SelectComboBox from "./SelectComboBox";
import { emailToneArray } from "@/data/emailTonesArray";
import { GoStopwatch } from "react-icons/go";
import { urgencyArray } from "@/data/urgencyArray";
import { MdOutlineCallToAction } from "react-icons/md";

export default function EmailConfigurationForm() {
  return (
    <section className="flex flex-col gap-8 items-center">
        <Card className="p-0! max-w-3xl w-full gap-0">
            <CardContent className="py-4! px-6!">
              <div className="flex sm:flex-row flex-col gap-6">
                <div className="max-w-md w-full border-border sm:order-first order-last">
                  <form className="flex flex-col gap-2">
                    <div className="flex flex-col gap-0">
                      <Field className="gap-1">
                        <FloatingTextareaWithCount label="What is the purpose of your email" maxLength={150} icon={RxQuestionMarkCircled}/>
                      </Field>
                      <Field className="gap-1">
                        <FloatingTextareaWithCount label="Who receives it and background" maxLength={150} icon={RxPerson}/>
                      </Field>
                      <Field className="gap-1">
                        <FloatingTextareaWithCount label="Key points of your email, maximum 8" maxLength={150} icon={LuWaypoints}/>
                      </Field>
                      <Field className="flex! flex-row! justify-center! mt-3!">
                        <FieldLabel className="text-sm text-muted-foreground font-normal">
                          <TbMoodSpark size={18}/>
                          Tone
                        </FieldLabel>
                        <SelectComboBox elementList={emailToneArray}/>
                      </Field>
                      <Field className="flex! flex-row! justify-center! mt-3! mb-2!">
                        <FieldLabel className="text-sm text-muted-foreground font-normal">
                          <GoStopwatch size={18}/>
                          Urgency
                        </FieldLabel>
                        <SelectComboBox elementList={urgencyArray}/>
                      </Field>
                      <Field className="gap-1">
                        <FloatingTextareaWithCount label="Call to action" maxLength={50} icon={MdOutlineCallToAction}/>
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
