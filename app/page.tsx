import ContentSelection from "@/components/ContentSelection";
import { ToggleTheme } from "@/components/lightswind/toggle-theme";
import Image from "next/image";

export default function Home() {
  return (
    <div 
      className="
        bg-bg dark:bg-bg-dark 
        w-screen h-screen
        px-5"
    >
      <div className="flex items-center justify-between p-0">
        {/**Dark and Light mode switch and logos */}
        <Image 
          src={"/logo-light.png"}
          width={200}
          height={100}
          alt=""
          className="dark:hidden"
        />
        <Image 
          src={"/logo-dark.png"}
          width={200}
          height={100}
          alt=""
          className="hidden dark:block"
        />
        <ToggleTheme
          duration={600}
          animationType="flip-x-in"
          className="text-text-primary dark:text-text-primary-dark"
        />
      </div>
      
      <div className="font-noto">
        <h1 className="text-3xl text-text-primary">What will you to create ?</h1>
        <p className="text-text-secondary">Choose the type of content you want to create</p>
      </div>

      <div>
        <ContentSelection/>
      </div>
    </div>
  );
}
