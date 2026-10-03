"use client"
import { currentStep, useCurrentStepStore } from "@/store/currentStep";
import { contentType, useContentTypeStore } from "@/store/selectedContentType";
import { FaArrowRight } from "react-icons/fa6";
import { MdMail, MdBookmarks, MdAod  } from "react-icons/md";
const iconMap = {
  mail: MdMail,
  aod: MdAod,
  bookmarks: MdBookmarks,
};

interface Props {
    title : string
    subText : string
    icon : keyof typeof iconMap
    backdropColor : {
        color1 : string,
        color2 : string
    }
    iconBg : {
        color1 : string,
        color2 : string
    },
    contentType : contentType
}

export default function ContentCard(
    {title, subText, icon, backdropColor, iconBg, contentType} 
    : Props
) {
    const { setContentType} = useContentTypeStore()
    const { setCurrentStep } = useCurrentStepStore()
    const SelectedIcon = iconMap[icon]

    const handleClick = () => {
        setContentType(contentType)
        setCurrentStep(currentStep.step2)
    }
    return (
        <div 
            role="button"
            tabIndex={0}
            aria-label={`Select ${title} generator`}
            className="
                rounded-2xl
                w-full
                max-w-md sm:max-w-lg lg:max-w-md xl:max-w-lg
                cursor-pointer
                hover:-translate-y-1
                active:translate-y-0
                hover:shadow-md
                outline-none
                focus-visible:ring-3
                focus-visible:ring-primary/80
                focus-visible:ring-offset-2
                dark:focus-visible:ring-offset-zinc-950
                transition-all
                duration-200
                "
            style={{
                background: `linear-gradient(to right, ${backdropColor.color1}, ${backdropColor.color2})`
            }}
            onClick={handleClick}
            onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    handleClick();
                }
            }}
        >
            <div 
                className="
                    flex items-center justify-between 
                    w-full p-3.5 sm:p-5
                    rounded-2xl bg-white/80 dark:bg-zinc-900/90
                    backdrop-blur-md border-2 dark:border-white/10
                    transition-colors duration-200"
                style={{borderColor : backdropColor.color1}}
            >
                <div className="flex items-center gap-3 sm:gap-4 min-w-0 flex-1">
                    <SelectedIcon 
                        className="
                        text-white p-2 rounded-xl sm:rounded-2xl border transition-colors duration-200 shrink-0"
                        size={44}
                        style={{
                            background: `linear-gradient(to right, ${iconBg.color1}, ${iconBg.color2})`,
                            borderColor : backdropColor.color1
                        }}
                    />
                    <div className="min-w-0 flex-1">
                        <p className="font-bold text-light-text-main dark:text-dark-text-main text-base sm:text-lg transition-colors duration-200 truncate">
                            {title}
                        </p>
                        <p className="text-light-text-background dark:text-dark-text-background font-semibold text-xs sm:text-sm transition-colors duration-200 line-clamp-2">
                            {subText}
                        </p>
                    </div>
                </div>
                <div className="shrink-0 ml-2">
                    <FaArrowRight 
                        size={30}
                        style={
                            {color : iconBg.color2, backgroundColor : backdropColor.color1}
                        }
                        className="rounded-full p-1.5 sm:p-2 backdrop-blur-lg shadow-xs transition-colors duration-200 dark:text-white"
                    />
                </div>
            </div>
        </div>
    )
}