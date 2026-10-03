import { useState, useEffect } from "react"
import { IconType } from "react-icons/lib"
import { Spinner } from "./spinner"
import { cn } from "@/lib/utils"
import { MdCheck, MdClose } from "react-icons/md"

type Status = 'pending' | 'success' | 'failed' | 'idle' | undefined

interface Props {
    status : Status
    heading : {
        pending : string,
        success : string,
        failed : string
    }
    description? : {
        pending : string,
        success : string,
        failed : string
    }
    icon ? : {
        pending : IconType,
        success : IconType,
        failed : IconType
    }
}

export default function AlertFlow({
    status,
    heading,
    description,
    icon
} : Props) {
    const [dismissedStatus, setDismissedStatus] = useState<Status>(undefined)
    const isDismissed = status === dismissedStatus
    const show = Boolean(status && status !== "idle" && !isDismissed)
    useEffect(() => { 
        if (status === "success" || status === "failed") { 
            const timer = setTimeout(() => { 
                setDismissedStatus(status) 
            }, 5000) 
            return () => clearTimeout(timer) 
        } 
    }, [status])
    
    if (!show || !status || status === "idle") { 
        return null 
    }

    const Icon = status === 'pending' ? icon?.pending : 
    status === 'success' ? icon?.success :
    icon?.failed

    const headerText = status === 'pending' ? heading.pending : 
    status === 'success' ? heading.success :
    heading.failed

    const descriptionText = status === 'pending' ? description?.pending : 
    status === 'success' ? description?.success : description?.failed

    return (
        <div 
            className="
                fixed top-0 inset-x-0 z-50
                flex justify-center items-center gap-2
                p-3 sm:p-5"
        >
            <div 
                className={cn(`w-[92vw] sm:w-auto sm:max-w-md md:max-w-lg
                    flex justify-center items-center gap-3 sm:gap-4
                    bg-white dark:bg-zinc-900
                    p-3.5 sm:p-4 shadow-2xs dark:shadow-zinc-950/60
                    rounded-2xl border border-gray-100 dark:border-white/10
                    text-light-text-main dark:text-dark-text-main
                    transition-colors duration-200`,
                    status === 'pending' && 'animate-slide-in-top',
                    status === 'failed' || status === 'success' && 'animate-fade-out animate-duration-2000 animate-delay-2000 animate-fill-mode-both'                    
                )}
            >
                <div className="flex flex-row relative">
                    {Icon && 
                        <Icon 
                            size={40} 
                            className={cn(
                                `p-2 rounded-full transition-colors duration-200`,
                                status === 'pending' && 'bg-yellow-100 text-yellow-500 dark:bg-yellow-950/80 dark:text-yellow-400',
                                status === 'success' && 'bg-green-100 text-green-500 dark:bg-emerald-950/80 dark:text-emerald-400 animate-slide-in-left',
                                status === 'failed' && 'bg-red-100 text-red-500 dark:bg-rose-950/80 dark:text-rose-400 animate-tada animate-duration-1000 animate-fill-mode-both'
                            )}
                        />
                    }
                    {status === 'pending' && <Spinner className="absolute bottom-0 -right-1 text-yellow-500 dark:text-yellow-400"/>}
                    {status === 'success' && <MdCheck className="absolute bottom-0 -right-1 text-green-600 bg-green-200 dark:bg-emerald-900 dark:text-emerald-300 p-0.5 rounded-full animate-slide-in-bottom transition-colors duration-200" size={15}/>}
                    {status === 'failed' && <MdClose className="absolute bottom-0 -right-1 text-red-500 bg-red-200 dark:bg-rose-900 dark:text-rose-300 p-0.5 rounded-full animate-slide-in-bottom transition-colors duration-200" size={15} />}
                </div>
                <div 
                    className={cn("flex flex-col",
                        status === 'pending' && 'animate-pulse',
                        status === 'success' && 'animate-slide-in-right',
                        status === 'failed' && 'animate-slide-in-bottom'
                    )}
                >
                    <p 
                        className="font-semibold text-sm text-light-text-main dark:text-dark-text-main transition-colors duration-200"
                    >
                        {headerText}
                        {status === 'pending' && <span className="animate-squeeze">...</span>}
                    </p>
                    <p
                        className="font-normal text-xs text-light-text-background dark:text-dark-text-background transition-colors duration-200"
                    >
                        {descriptionText && descriptionText}
                    </p>
                </div>
            </div>
        </div>
    )
}