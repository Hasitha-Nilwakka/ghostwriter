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
import StoryConfig from "./StoryConfig";
import GeneratedEmailContent from "./generated/GeneratedEmailContent";
import GeneratedSocialMediaContent from "./generated/GeneratedSocialMediaContent";
import GeneratedStoryContent from "./generated/GeneratedStoryContent";

export default function MainPage() {
    const { currentStage } = useCurrentStepStore()
    const { selectedContent } = useContentTypeStore()
    const showHeroSection = currentStage === currentStep.step1;

    return (
        <div 
            className="
                flex-1 flex flex-col 
                w-full max-w-7xl mx-auto
                transition-colors duration-200
                relative isolate
                pb-6 lg:pb-4
                overflow-y-auto overflow-x-hidden

                lg:flex-row lg:gap-8 xl:gap-12 lg:items-start 
                lg:bg-bg-light lg:dark:bg-black">
            <AbstractBg/>
            
            <div 
                className={`
                    w-full lg:flex-1 lg:max-w-md xl:max-w-lg lg:p-4
                    ${showHeroSection ? 'block' : 'hidden lg:block'}
                `}
            >
                    <div className="flex justify-center">
                        <Image
                            src={'/ghost.png'}
                            alt="text ghostwriter"
                            width={220}
                            height={220}
                            className="w-28 h-28 sm:w-36 sm:h-36 md:w-44 md:h-44 lg:w-48 lg:h-48 xl:w-56 xl:h-56 h-auto object-contain"
                        />
                    </div>
                    <div className="py-3 sm:py-5 flex flex-col gap-2 lg:pb-0">
                        <div 
                            className="
                            text-2xl sm:text-3xl md:text-4xl lg:text-3xl xl:text-4xl font-bold 
                            subpixel-antialiased 
                            text-light-text-main
                            dark:text-dark-text-main
                            text-center
                            text-shadow-2xs 
                            text-shadow-gray-200
                            dark:text-shadow-gray-600
                            transition-colors duration-200"
                        >
                            <h1 className="tracking-tight sm:tracking-normal lg:tracking-wide">An idea to polished</h1>
                            <h1 className="tracking-tight sm:tracking-normal lg:tracking-wide">content in {" "}
                                <span 
                                    className="
                                    text-shadow-none 
                                    bg-linear-to-r 
                                    from-[#3a86ff] from-10% 
                                    via-[#f92a82] via-30% to-[#f77f00] to-90%
                                    dark:from-[#f77f00] dark:from-10% 
                                    dark:via-[#f92a82] dark:via-30% dark:to-[#3a86ff] dark:to-90% 
                                    bg-clip-text text-transparent
                                    ">
                                    seconds.
                                </span>
                            </h1>
                        </div>
                        <div 
                            className="
                            text-sm sm:text-base lg:text-base xl:text-lg flex flex-col items-center 
                            text-light-text-background
                            dark:text-dark-text-background 
                            font-semibold 
                            font-sans 
                            text-center
                            transition-colors duration-200">
                            <p>Create, customize & export content</p>
                            <p>with the help of AI.</p>
                        </div>
                    </div>
                    <Separator 
                        className='hidden lg:block lg:my-6 xl:my-8 dark:bg-dark-text-background/50 transition-colors duration-200'
                    />
                    <SecondaryHero/>
                </div>

            {currentStage === currentStep.step1 && <ContentSelector/>}
            {currentStage === currentStep.step2 && selectedContent === contentType.email && <EmailConfig/>}
            {currentStage === currentStep.step2 && selectedContent === contentType.social_media && <SocialMediaConfig/>}
            {currentStage === currentStep.step2 && selectedContent === contentType.story && <StoryConfig/>}
            {currentStage === currentStep.step3 && selectedContent === contentType.email && <GeneratedEmailContent />}
            {currentStage === currentStep.step3 && selectedContent === contentType.social_media && <GeneratedSocialMediaContent />}
            {currentStage === currentStep.step3 && selectedContent === contentType.story && <GeneratedStoryContent />}
        </div>
    )
}