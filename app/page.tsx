import Image from "next/image";
import MainPage from "@/components/main-page/MainPage";
import ThemeToggle from "@/components/ui/theme-toggle";
import { AbstractOuter } from "@/components/ui/abstractOuter";

export default function Home() {
  return (
    <div 
      className="
        px-5
        bg-bg-light dark:bg-black 
        transition-all duration-300 
        mb-5
        h-screen

        lg:bg-linear-to-r/increasing lg:from-indigo-500 lg:to-teal-400 
        lg:p-1"
    >
      {/**Ghostwriter text and theme button */}
      <div 
        className="
        bg-bg-light 
        dark:bg-black
        h-full
        transition-all duration-300
        relative isolate

        lg:p-5 lg:rounded-2xl"
      >
        <AbstractOuter/>
        <div className="flex justify-between items-center py-10 lg:px-10 lg:pt-5 lg:pb-10">
          <div className="flex items-end">
            <Image
              className="hidden lg:block transition-all duration-300"
              src={'/ghost.png'}
              alt="text ghostwritter"
              width={75}
              height={75}
              />
            <Image
              src={'/text.png'}
              alt="text ghostwritter"
              width={150}
              height={75}
            />
          </div>
          <ThemeToggle/>
        </div>
        <div className="min-h-full">
        <MainPage/>
        </div>
      </div>
    </div>
  );
}
