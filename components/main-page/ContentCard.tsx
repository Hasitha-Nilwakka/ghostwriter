import { IconType } from "react-icons";
import { FaArrowRight } from "react-icons/fa6";

interface Props {
    title : string
    subText : string
    Icon : IconType
    backdropColor : {
        color1 : string,
        color2 : string
    }
    iconBg : {
        color1 : string,
        color2 : string
    }
}

export default function ContentCard({title, subText, Icon, backdropColor, iconBg} : Props) {
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
        >
            <div 
                className="
                    flex items-center justify-between 
                    min-w-full p-5
                    rounded-2xl bg-white/75 border-2"
                style={{borderColor : backdropColor.color1}}
            >
                <div className="flex gap-5">
                    <Icon 
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