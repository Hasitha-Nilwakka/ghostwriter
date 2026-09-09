import Image from "next/image";
import ContentCard from "./ContentCard";
import { MdMail, MdBookmarks, MdAod  } from "react-icons/md";
import SecondaryHero from "./SecondaryHero";
import { HiOutlineSparkles } from "react-icons/hi2";
import { Separator } from '@/components/ui/separator'
import { AbstractBg } from "../ui/abstractMain";

export default function MainPage() {
    return (
        <div 
            className="
                flex flex-col 
                transition-all duration-300
                relative isolate

                lg:flex-row lg:gap-5 lg:min-h-max 
                lg:bg-bg-light lg:dark:bg-black">
            <AbstractBg/>
            <div className="lg:flex-1 xl:flex-1 lg:min-h-full lg:p-5">
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
            {/**Content type selector */}
            <div 
                className="
                mt-3 

                lg:flex lg:flex-col lg:flex-1 
                lg:gap-5 lg:px-5 lg:py-10 lg:min-h-full
                lg:items-center
                
                xl:flex-2"
            >
                <div className="flex items-center gap-1 py-3">
                    <HiOutlineSparkles
                        className="
                        text-indigo-500 
                        animate-pulsing animate-duration-800 
                        animate-delay-1000 animate-steps-retro 
                        animate-iteration-count-infinite 
                        animate-fill-mode-forwards"
                        size={25}
                    />
                    <p 
                        className="
                        text-xl font-bold 
                        text-light-text-main 
                        dark:text-dark-text-main 
                        text-shadow-2xs 
                        text-shadow-gray-200 
                        dark:text-shadow-gray-600
                        transition-all duration-300"
                    >
                        What do you want to create
                    </p>
                </div>
                <div className="flex flex-col gap-5 lg:gap-7">
                    <ContentCard 
                        title="Email" 
                        subText="Write clear, effective emails." 
                        Icon={MdMail}
                        backdropColor={
                            {color1 : '#add7f6', color2 : '#3f8efc'}
                        }
                        iconBg={
                            {color1 : '#06B6D4', color2 : '#3B82F6'}
                        }
                    />
                    <ContentCard 
                        title="Social Media" 
                        subText="Create posts that stands out." 
                        Icon={MdAod}
                        backdropColor={
                            {color1 : '#f2daff', color2 : '#e3c7ff'}
                        }
                        iconBg={
                            {color1 : '#8e51ff', color2 : '#d946ef'}
                        }
                    />
                    <ContentCard 
                        title="Short story" 
                        subText="Turn an idea into a story." 
                        Icon={MdBookmarks}
                        backdropColor={
                            {color1 : '#ffc971', color2 : '#ff9e00'}
                        }
                        iconBg={
                            {color1 : '#efa421', color2 : '#d8750a'}
                        }
                    />
                </div>
            </div>
        </div>
    )
}