import { RiFlashlightLine } from "react-icons/ri";
import { LuBrain } from "react-icons/lu";
import { ImCloudDownload } from "react-icons/im";

export default function SecondaryHero() {
    const outerDivStyle = `
                flex flex-col flex-1 
                items-center gap-1 
                backdrop-blur-lg 
                shadow-sm
                dark:shadow-xs 
                shadow-gray-200
                dark:shadow-gray-400 
                rounded-2xl p-4
                inset-shadow-sm
                transition-all duration-300`
    const titleTextStyle = `
                text-lg font-semibold 
                text-light-text-main 
                dark:text-dark-text-main 
                font-geist 
                text-shadow-2xs 
                text-shadow-gray-200
                dark:text-shadow-none
                transition-all duration-300`
    const textStyle = `
                text-center 
                text-light-text-background 
                dark:text-dark-text-background
                font-semibold 
                transition-all duration-300`
    return (
        <div className="hidden lg:flex lg:gap-2">
            <div className={outerDivStyle}>
                <RiFlashlightLine
                    size={50}
                    className="bg-[#f2daff] text-[#d946ef] p-3 rounded-full"
                />
                <p className={titleTextStyle}>Fast</p>
                <div className={textStyle}>
                    <p className="text-xs">Idea to content</p> 
                    <p className="text-xs">in seconds</p> 
                </div>
            </div>
            <div className={outerDivStyle}>
                <LuBrain 
                    size={50}
                    className="bg-[#add7f6] text-[#3B82F6] p-3 rounded-full"
                />
                <p className={titleTextStyle}>Smart</p>
                <div className={textStyle}>
                    <p className="text-xs">Tuned for the</p> 
                    <p className="text-xs">best results</p> 
               </div>
            </div>
            <div className={outerDivStyle}>
                <ImCloudDownload
                    size={50}
                    className="bg-[#ffc971] text-[#d8750a] p-3 rounded-full"
                />
                <p className={titleTextStyle}>Export</p>
                <div className={textStyle}>
                    <p className="text-xs">Download</p> 
                    <p className="text-xs">and save</p> 
               </div>
            </div>
        </div>
    )
}