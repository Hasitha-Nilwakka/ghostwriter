import Image from "next/image";
import MainPage from "@/components/main-page/MainPage";
import ThemeToggle from "@/components/ui/theme-toggle";
import { AbstractOuter } from "@/components/ui/abstractOuter";

export default function Home() {
  return (
    <div 
      className="
        min-h-screen flex flex-col
        px-3 sm:px-6
        bg-bg-light dark:bg-black 
        transition-colors duration-200 
        lg:bg-linear-to-r/increasing lg:from-indigo-500 lg:to-teal-400 
        lg:p-2"
    >
      <div 
        className="
        bg-bg-light 
        dark:bg-black
        flex-1 flex flex-col
        transition-colors duration-200
        relative isolate
        p-3 sm:p-5
        lg:p-6 lg:rounded-2xl"
      >
        <AbstractOuter/>
        <div className="flex justify-between items-center py-4 sm:py-6 lg:px-6 lg:pt-3 lg:pb-6">
          <div className="flex items-end gap-1.5 sm:gap-2">
            <Image
              className="size-8 sm:size-10 lg:size-14 object-contain shrink-0"
              src={'/ghost.png'}
              alt="ghost icon"
              width={60}
              height={60}
            />
            <Image
              src={'/text.png'}
              alt="text ghostwriter"
              width={140}
              height={70}
              className="w-28 sm:w-36 lg:w-[140px] h-auto object-contain"
            />
          </div>
          <ThemeToggle/>
        </div>
        <div className="flex-1 flex flex-col min-h-0 w-full">
          <MainPage/>
        </div>
      </div>
    </div>
  );
}
