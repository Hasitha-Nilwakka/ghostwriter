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
            className="
                rounded-2xl
                lg:w-lg
                xl:w-xl
                cursor-pointer
                hover:translate-y-0.5
                transition-all
                duration-300
                "
            style={{
                background: `linear-gradient(to right, ${backdropColor.color1}, ${backdropColor.color2})`
            }}
            onClick={handleClick}
        >
            <div 
                className="
                    flex items-center justify-between 
                    min-w-full p-5
                    rounded-2xl bg-white/75 border-2"
                style={{borderColor : backdropColor.color1}}
            >
                <div className="flex gap-5">
                    <SelectedIcon 
                        className="
                        text-white p-2 rounded-2xl border"
                        size={50}
                        style={{
                            background: `linear-gradient(to right, ${iconBg.color1}, ${iconBg.color2})`,
                            borderColor : backdropColor.color1
                        }}
                    />
                    <div>
                        <p className="font-bold text-light-text-main text-lg">
                            {title}
                        </p>
                        <p className="text-light-text-background font-semibold text-sm">
                            {subText}
                        </p>
                    </div>
                </div>
                <div>
                    <FaArrowRight 
                        size={35}
                        style={
                            {color : iconBg.color2, backgroundColor : backdropColor.color1}
                        }
                        className="rounded-full p-2 backdrop-blur-lg shadow-xs"
                    />
                </div>
            </div>
        </div>
    )
}