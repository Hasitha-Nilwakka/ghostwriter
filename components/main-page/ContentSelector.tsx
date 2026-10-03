"use client"
import { HiOutlineSparkles } from "react-icons/hi2";
import ContentCard from "./ContentCard";
import { contentType } from "@/store/selectedContentType";

export default function ContentSelector() {
    return (
        <div 
            className="
            mt-4 sm:mt-6 lg:mt-0
            flex flex-col flex-1
            items-center
            w-full max-w-md sm:max-w-lg lg:max-w-none
            mx-auto
            gap-3 sm:gap-5 lg:gap-6
            lg:px-4 lg:py-4
            xl:flex-2
            lg:h-[680px] lg:justify-center"
        >
            <div className="flex items-center gap-1.5 py-2 sm:py-3">
                <HiOutlineSparkles
                    className="
                    text-indigo-500 
                    animate-pulsing animate-duration-800 
                    animate-delay-1000 animate-steps-retro 
                    animate-iteration-count-infinite 
                    animate-fill-mode-forwards"
                    size={24}
                />
                <p 
                    className="
                    text-lg sm:text-xl font-bold 
                    text-light-text-main 
                    dark:text-dark-text-main 
                    text-shadow-2xs 
                    text-shadow-gray-200 
                    dark:text-shadow-gray-600
                    transition-colors duration-200"
                >
                    What do you want to create
                </p>
            </div>
            <div className="flex flex-col gap-4 sm:gap-5 lg:gap-6 w-full items-center">
                <ContentCard 
                    title="Email" 
                    subText="Write clear, effective emails." 
                    icon="mail"
                    backdropColor={
                        {color1 : '#add7f6', color2 : '#3f8efc'}
                    }
                    iconBg={
                        {color1 : '#06B6D4', color2 : '#3B82F6'}
                    }
                    contentType={contentType.email}
                />
                <ContentCard 
                    title="Social Media" 
                    subText="Create posts that stand out." 
                    icon="aod"
                    backdropColor={
                        {color1 : '#f2daff', color2 : '#e3c7ff'}
                    }
                    iconBg={
                        {color1 : '#8e51ff', color2 : '#d946ef'}
                    }
                    contentType={contentType.social_media}
                />
                <ContentCard 
                    title="Short Story" 
                    subText="Turn an idea into a story." 
                    icon="bookmarks"
                    backdropColor={
                        {color1 : '#ffc971', color2 : '#ff9e00'}
                    }
                    iconBg={
                        {color1 : '#efa421', color2 : '#d8750a'}
                    }
                    contentType={contentType.story}
                />
            </div>
        </div>
    )
}