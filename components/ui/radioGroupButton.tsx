import React, { InputHTMLAttributes } from "react";
import { IconType } from "react-icons/lib";
import { MdCheck } from "react-icons/md";

type radioElement = {
    text : string,
    Icon : IconType
}

interface Props extends React.ComponentProps<"input"> {
    radioArray : radioElement[],
    name : string
}

export default function RadioGroupButton(
    {
        radioArray,
        onChange,
        value,
        name,
        ...props
    } : Props
) {
    return (
        <div className="flex gap-2 items-center justify-between p-2 max-w-fit">
            {radioArray?.map((r, i) => {
                const optionValue = r.text
                const isCheked = value === optionValue
                return(
                    <div key={i} className="w-20">
                        <label className="flex flex-col justify-center items-center gap-2 cursor-pointer p-2">
                            <input 
                                type="radio" 
                                name={name}
                                className="peer sr-only"
                                value={optionValue}
                                checked={isCheked}
                                onChange={onChange}
                                {...props}
                            />
                            <div 
                                className="
                                flex justify-center
                                border p-2
                                rounded-xl 
                                text-light-text-background
                                peer-checked:text-light-text-main
                                peer-checked:bg-gray-200
                                peer-checked:border-2
                                peer-checked:border-gray-400"
                            >
                                <r.Icon />
                            </div>
                            <span 
                                className="
                                    text-light-text-background text-sm 
                                    peer-checked:text-light-text-main
                                    peer-checked:font-semibold
                                    peer-checked:underline
                                    ">
                                {r.text}
                            </span>
                        </label>
                    </div>
                )
            })}
        </div>
    )
}