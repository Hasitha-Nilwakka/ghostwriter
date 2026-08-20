"use client"

export default function DisplayValidationError({errMsg} : {errMsg : string}) {
    return (
        errMsg && 
        <p
            className="text-destructive text-left p-0"
        >{errMsg}</p>
    )
}