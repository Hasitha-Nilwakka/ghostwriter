import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea"
import TextareaWithCharacterCount from "./ui/textAreaWithCharCount";

export default function EmailConfigurationForm() {
  return (
    <section className="flex flex-col gap-8 items-center w-full">
        <Card className="p-0! max-w-3xl w-full gap-0">
            <CardContent className="py-4! px-6!">
              <div className="flex sm:flex-row flex-col gap-6">
                <div className="max-w-md w-full border-border sm:order-first order-last">
                  <form className="flex flex-col gap-2">
                    <div className="flex flex-col gap-0">
                      <Field className="gap-1.5">
                        <FieldLabel className="text-sm text-foreground font-normal">
                          Purpose
                        </FieldLabel>
                        <TextareaWithCharacterCount placeholder="What is the purpose of your email" maxLength={150}/>
                      </Field>
                      <Field className="gap-1">
                        <FieldLabel
                          htmlFor="email"
                          className="text-sm text-foreground font-normal"
                        >
                          Recipient context
                        </FieldLabel>
                        <TextareaWithCharacterCount placeholder="Who receives it and relevant background" maxLength={150}/>
                      </Field>
                      <Field className="gap-1.5">
                        <FieldLabel
                          htmlFor="title"
                          className="text-sm text-muted-foreground font-normal"
                        >
                          Title
                        </FieldLabel>
                        <Input
                          id="title"
                          type="text"
                          defaultValue="UI/UX Designer"
                          className="dark:bg-background h-9 shadow-xs text-sm text-muted-foreground font-normal"
                        />
                      </Field>
                    </div>
                    <div className="flex flex-col gap-4">
                      <div className="flex items-center gap-6">
                        <div className="flex flex-col gap-1">
                          <Label
                            htmlFor="hireme"
                            className="text-primary text-sm font-medium"
                          >
                            Hire me
                          </Label>
                          <p className="text-sm text-muted-foreground font-normal">
                            Enabling this feature will allow other users to
                            contact you with work inquiries.
                          </p>
                        </div>
                        <Switch id="hireme" />
                      </div>
                      <div className="flex items-center gap-6">
                        <div className="flex flex-col gap-1">
                          <Label
                            htmlFor="privacy"
                            className="text-primary text-sm font-medium"
                          >
                            Privacy
                          </Label>
                          <p className="text-sm text-muted-foreground font-normal">
                            Enabling privacy will hide your profile, only you
                            will be able to see it. Not recommended if you’re an
                            author.
                          </p>
                        </div>
                        <Switch id="privacy" />
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </CardContent>
          </Card>
    </section>
  );
};
