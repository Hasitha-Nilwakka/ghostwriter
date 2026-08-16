import { Field, FieldTitle, FieldLabel } from "@/components/ui/field";
import { Separator } from "@/components/ui/separator";

export default function CharacterList() {
    return (
        <div className="flex flex-col gap-1">
            <Field className="flex! px-5 py-3 bg-muted gap-0! rounded-lg">
                <FieldTitle 
                    className="text-primary-col text-md p-0! font-semibold"
                >
                   1/4 - Yoda
                </FieldTitle>
                <Separator/>
                <FieldLabel
                    className="text-foreground/50 p-0!"
                >Main character</FieldLabel>
                <FieldLabel
                    className="text-foreground/50 p-0! text-left"
                >Yoda is a half horse half human Yoda is a half horse half human Yoda is a half horse half human</FieldLabel>
            </Field>
            <Field className="flex! px-5 py-3 bg-input-background rounded-lg gap-0! font-semibold ">
                <FieldTitle 
                    className="text-primary-col text-md p-0!"
                >
                    2/4 - Yoda
                </FieldTitle>
                <Separator/>
                <FieldLabel
                    className="text-foreground/50 p-0!"
                >Main character</FieldLabel>
                <FieldLabel
                    className="text-foreground/50 p-0! text-left"
                >Yoda is a half horse half human Yoda is a half horse half human Yoda is a half horse half human</FieldLabel>
            </Field>
            <Field className="flex! px-5 py-3 bg-muted gap-0! rounded-lg">
                <FieldTitle 
                    className="text-primary-col text-md p-0! font-semibold"
                >
                    3/4 - Yoda
                </FieldTitle>
                <Separator/>
                <FieldLabel
                    className="text-foreground/50 p-0!"
                >Main character</FieldLabel>
                <FieldLabel
                    className="text-foreground/50 p-0! text-left"
                >Yoda is a half horse half human Yoda is a half horse half human Yoda is a half horse half human</FieldLabel>
            </Field>
            <Field className="flex! px-5 py-3 bg-input-background rounded-lg gap-0! font-semibold">
                <FieldTitle 
                    className="text-primary-col text-md p-0!"
                >
                    4/4 - Yoda
                </FieldTitle>
                <Separator/>
                <FieldLabel
                    className="text-foreground/50 p-0!"
                >Main character</FieldLabel>
                <FieldLabel
                    className="text-foreground/50 p-0! text-left italic"
                >Yoda is a half horse half human Yoda is a half horse half human Yoda is a half horse half human</FieldLabel>
            </Field>
        </div>
    )
}