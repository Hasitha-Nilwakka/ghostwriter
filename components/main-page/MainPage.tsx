"use client"
import Image from "next/image";
import SecondaryHero from "./SecondaryHero";
import { Separator } from '@/components/ui/separator'
import { AbstractBg } from "../ui/abstractMain";
import { useCurrentStepStore, currentStep } from "@/store/currentStep";
import ContentSelector from "./ContentSelector";
import { useContentTypeStore, contentType } from "@/store/selectedContentType";
import EmailConfig from "./EmailConfig";
import SocialMediaConfig from "./SocialMediaConfig";
import EmailResult from "./EmailResult";

export default function MainPage() {
    const { currentStage } = useCurrentStepStore()
    const { selectedContent } = useContentTypeStore()
    const showHeroSection = currentStage === currentStep.step1;

    return (
        <div 
            className="
                flex flex-col 
                transition-all duration-300
                relative isolate
                pb-7
                overflow-scroll

                lg:flex-row lg:gap-5 lg:min-h-max 
                lg:bg-bg-light lg:dark:bg-black">
            <AbstractBg/>
            
            {/* Show conditionally on mobile ´, Hero section*/}
            {(showHeroSection || true) && (
                <div 
                    className={`
                        lg:flex-1 xl:flex-1 lg:min-h-full lg:p-5 transition-all duration-300
                        ${showHeroSection ? 'block' : 'hidden lg:block'}
                    `}
                >
                    {/**Ghost logo */}
                    <div className="flex justify-center">
                        <Image
                            src={'/ghost.png'}
                            alt="text ghostwritter"
                            width={250}
                            height={250}
                        />
                    </div>
                    {/**Hero text */}
                    <div className="py-5 flex flex-col gap-2 lg:pb-0">
                        <div 
                            className="
                            text-4xl font-bold 
                            subpixel-antialiased 
                            text-light-text-main
                            dark:text-dark-text-main
                            text-center
                            text-shadow-2xs 
                            text-shadow-gray-200
                            dark:text-shadow-gray-600
                            transition-all duration-300"
                        >
                            <h1 className="tracking-widest lg:tracking-wide">An idea to polished</h1>
                            <h1 className="tracking-wider lg:tracking-wide">content in {" "}
                                <span 
                                    className="
                                    text-shadow-none 
                                    bg-linear-to-r 
                                    from-[#3a86ff] from-10% 
                                    via-[#f92a82] via-30% to-[#f77f00] to-90%
                                    dark:from-[#f77f00] dark:from-10% 
                                    dark:via-[#f92a82] dark:via-30% dark:to-[#3a86ff] dark:to-90% 
                                    bg-clip-text text-transparent
                                    transition-all duration-300
                                    ">
                                    seconds.
                                </span>
                            </h1>
                        </div>
                        <div 
                            className="
                            text-lg flex flex-col items-center 
                            text-light-text-background
                            dark:text-dark-text-background 
                            font-semibold 
                            font-sans 
                            text-center
                            transition-all duration-300">
                            <p>Create, customize & export content</p>
                            <p>with the help of AI.</p>
                        </div>
                    </div>
                    <Separator 
                        className='hidden lg:block lg:my-10 dark:bg-dark-text-background/50'
                    />
                    {/**Secondary section visible only at LG breakpoint */}
                    <SecondaryHero/>
                </div>
            )}

            {/**Content type selector */}
            {currentStage === currentStep.step1 && <ContentSelector/>}
            {currentStage === currentStep.step2 && selectedContent === contentType.email && <EmailConfig/>}
            {currentStage === currentStep.step2 && selectedContent === contentType.social_media && <SocialMediaConfig/>}
            {currentStage === currentStep.step3 && <EmailResult/>}
        </div>
    )
}