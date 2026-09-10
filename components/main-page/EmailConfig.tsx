"use client"

import { Button } from "../ui/button"
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel, FieldLegend, FieldSeparator, FieldSet } from "../ui/field"
import { Input } from "../ui/input"

/* parameters : z.object({
        purpose : requiredText,
        recipient_context : requiredText,
        key_points : z.array(requiredText).min(1).max(8),
        tone : requiredText,
        urgency : z.enum(["low", "normal", "high"]),
        cta : requiredText */

export default function EmailConfig() {
    return (
        <div className="flex flex-1">
            <form>
                <FieldSet>
                    <FieldLegend>Lets configure your email</FieldLegend>
                    <FieldDescription>following information are required</FieldDescription>
                    <FieldGroup>
                        <Field>
                            <FieldLabel>Purpose</FieldLabel>
                            <Input></Input>
                            <FieldDescription>What is the purpose of your email</FieldDescription>
                            <FieldError>error</FieldError>
                        </Field>
                        <FieldGroup>
                            <FieldLabel>Receipient context</FieldLabel>
                            <Field>
                                <FieldLabel>Reciever</FieldLabel>
                                <Input></Input>
                                <FieldDescription>Who receives this email</FieldDescription>
                                <FieldError>error</FieldError>
                            </Field>
                            <Field>
                                <FieldLabel>Reciever background</FieldLabel>
                                <Input></Input>
                                <FieldDescription>whats their background</FieldDescription>
                                <FieldError>error</FieldError>
                            </Field>
                        </FieldGroup>
                        <Field>
                            <FieldLabel>Key Points</FieldLabel>
                            <Input></Input>
                            <FieldDescription>1-8 Ket points</FieldDescription>
                            <FieldError>error</FieldError>
                        </Field>
                        <Field>
                            <FieldLabel>Tone</FieldLabel>
                            <Input></Input>
                            <FieldDescription>Set the tone for the email</FieldDescription>
                            <FieldError>error</FieldError>
                        </Field>
                        <Field>
                            <FieldLabel>CTA</FieldLabel>
                            <Input></Input>
                            <FieldDescription>Call to action</FieldDescription>
                            <FieldError>error</FieldError>
                        </Field>
                    </FieldGroup>
                </FieldSet>
                <FieldSeparator></FieldSeparator>
                <Field>
                    <Button>Back</Button>
                    <Button type='submit'>Generate</Button>
                </Field>
            </form>
        </div>
    )
}

