// In EmailKeyPointsPanel.tsx
import { Button } from "../ui/button";
import { Field, FieldLabel, FieldError, FieldDescription, FieldGroup } from "../ui/field";
import { Input } from "../ui/input";
import { MdAdd, MdEdit, MdOutlineFactCheck } from "react-icons/md";
import { AiOutlineEnter } from "react-icons/ai";
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { KeyPoint } from "@/types/types";
import DeleteDialog from "../ui/deleteDialog";

interface EmailKeyPointsPanelProps {
    value: KeyPoint[];
    onChange: (value: KeyPoint[]) => void;
}

export default function EmailKeyPointsPanel({ value, onChange }: EmailKeyPointsPanelProps) {
    const [inputValue, setInputValue] = useState('')
    const [shouldAnimate, setShouldAnimate] = useState(true)
    const [showError, setShowError] = useState(false)

    function handleSubmit(e : React.KeyboardEvent<HTMLInputElement> | React.MouseEvent<HTMLButtonElement>) {
        const isEnterKey = "key" in e && e.key === 'Enter'
        const isClick = e.type === 'click'

        if (isEnterKey || isClick) {
            e.preventDefault()
            const trimmedValue = inputValue.trim()
            
            if (trimmedValue.length < 5) {
                setShowError(true)
                return
            } else {
                setShowError(false)
            }
            if (trimmedValue && !value.some(item => item.text === trimmedValue)) {
                setShouldAnimate(true)
                const newItem: KeyPoint = {
                    id: crypto.randomUUID(),
                    text: trimmedValue
                }
                onChange([newItem, ...value])
            }
            setInputValue('')
        }
    }

    function handleEditAndDelete(point : KeyPoint, option : 'edit' | 'delete') {
        setShouldAnimate(false)
        const newArray = value.filter(k => k.id !== point.id)
        if (option === 'edit') {
            setInputValue(point.text)
        } 
        onChange(newArray) // Update RHF state
    }

    return (
        <div>
            <FieldGroup>
                <Field>
                    <div className="flex gap-2 items-center">
                        <MdOutlineFactCheck size={18}/>
                        <FieldLabel className="text-light-text-main dark:text-dark-text-main">Key Points</FieldLabel>
                    </div>
                    <div className="flex gap-2 items-center">
                        <Input
                            maxLength={300}
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyDown={(e) => handleSubmit(e)}
                            disabled={value.length === 8}
                        />
                        <Button 
                            variant={'outline'} 
                            size={'sm'} 
                            className={'bg-green-500 text-white'}
                            onClick={(e) => handleSubmit(e)}
                            disabled={value.length === 8}
                            type="button"
                        >
                            <MdAdd/>
                        </Button>
                    </div>
                    <FieldDescription className="flex items-center">
                        {"1-8 Key points "} {"( press enter "}
                        <AiOutlineEnter/>
                        {")"}
                    </FieldDescription>
                    {showError && <FieldError>Key point must be min 5</FieldError>}
                </Field>
                <FieldGroup className="flex! gap-1! w-full">
                    {value.map((k, i) => (
                        <Field key={k.id} 
                        className={cn(
                            "flex! flex-row! justify-between items-center shadow-2xs",
                            i === 0 && shouldAnimate ? "animate-fade-in-down" : null
                        )}>
                            <FieldLabel className="overflow-x-scroll text-light-text-main dark:text-dark-text-main">{k.text}</FieldLabel>
                            <Button 
                                type="button" // Prevents form submission when clicking edit
                                variant='secondary' 
                                size='icon-xs' 
                                className='w-fit! h-auto p-1'
                                onClick={() => handleEditAndDelete(k, 'edit')}
                            >
                                <MdEdit/>
                            </Button>
                            <DeleteDialog 
                                iconTrigger={true} 
                                title="Remove key point ?" 
                                description="This action cannot be undone" 
                                action={() => handleEditAndDelete(k, 'delete')}
                            />
                        </Field> 
                    ))}
                </FieldGroup>
            </FieldGroup>
        </div>
    )
}