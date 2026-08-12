import { ToggleTheme } from "@/components/lightswind/toggle-theme";
import Image from "next/image";
import Stepper from "@/components/Stepper";
import { FiShield } from "react-icons/fi";
import { IoLockClosedOutline } from "react-icons/io5";
import { GoDownload } from "react-icons/go";
export default function Home() {
  return (
    <div 
      className="
        bg-bg dark:bg-bg-dark 
        w-screen min-h-screen h-full
        px-5"
    > 
      <div className="flex justify-between items-center py-5 px-5">
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
          className="text-text-primary dark:text-text-primary-dark"
        />
      </div>
      <div className="flex flex-col">
        <div className="flex flex-col items-center mb-2 text-text-primary">
          <h1 className="font-bold text-3xl">A little input.</h1>
          <h1 className="font-bold text-3xl">A lot of writing <span>magic.</span></h1>
        </div>
          <p
            className="text-text-secondary text-center px-4 text-sm"
          >Choose what you want to create, set the tone and turn your ideas into polished contents in seconds</p>
      </div>
      <div className="flex justify-evenly py-4">
        <div className="bg-primary-soft w-fit py-2 px-3 rounded-full text-text-primary flex items-center gap-1 text-xs">
        <FiShield className="text-primary-col" size={15}/>
          <p className="">
            No account
          </p>
        </div>
        <div className="bg-primary-soft w-fit py-2 px-3 rounded-full text-text-primary flex items-center gap-1 text-xs">
        <IoLockClosedOutline className="text-primary-col" size={15}/>
          <p className="">
            Nothing stored
          </p>
        </div>
        <div className="bg-primary-soft w-fit py-2 px-3 rounded-full text-text-primary flex items-center gap-1 text-xs">
        <GoDownload className="text-primary-col" size={15}/>
          <p>
            Ready to export
          </p>
        </div>
      </div>
      <div>
        <Stepper/>
      </div>
    </div>
  );
}
