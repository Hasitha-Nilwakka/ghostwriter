import { RiFlashlightLine } from "react-icons/ri";
import { LuBrain } from "react-icons/lu";
import { ImCloudDownload } from "react-icons/im";

export default function SecondaryHero() {
    const outerDivStyle = `
                flex flex-col flex-1 
                items-center gap-1 
                backdrop-blur-lg 
                shadow-sm
                shadow-gray-200
                dark:shadow-none
                dark:bg-zinc-900/40
                dark:border dark:border-white/10
                rounded-2xl p-4
                inset-shadow-sm
                transition-colors duration-200`
    const titleTextStyle = `
                text-lg font-semibold 
                text-light-text-main 
                dark:text-dark-text-main 
                font-geist 
                text-shadow-2xs 
                text-shadow-gray-200
                dark:text-shadow-none
                transition-colors duration-200`
    const textStyle = `
                text-center 
                text-light-text-background 
                dark:text-dark-text-background 
                font-semibold 
                transition-colors duration-200`
    return (
        <div className="hidden lg:flex lg:gap-2">
            <div className={outerDivStyle}>
                <RiFlashlightLine
                    size={44}
                    className="bg-[#f2daff] text-[#d946ef] dark:bg-purple-950/70 dark:text-purple-300 p-2.5 rounded-full transition-colors duration-200"
                />
                <p className={titleTextStyle}>Fast</p>
                <div className={textStyle}>
                    <p className="text-xs">Idea to content</p> 
                    <p className="text-xs">in seconds</p> 
                </div>
            </div>
            <div className={outerDivStyle}>
                <LuBrain 
                    size={44}
                    className="bg-[#add7f6] text-[#3B82F6] dark:bg-blue-950/70 dark:text-blue-300 p-2.5 rounded-full transition-colors duration-200"
                />
                <p className={titleTextStyle}>Smart</p>
                <div className={textStyle}>
                    <p className="text-xs">Tuned for the</p> 
                    <p className="text-xs">best results</p> 
               </div>
            </div>
            <div className={outerDivStyle}>
                <ImCloudDownload
                    size={44}
                    className="bg-[#ffc971] text-[#d8750a] dark:bg-amber-950/70 dark:text-amber-300 p-2.5 rounded-full transition-colors duration-200"
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