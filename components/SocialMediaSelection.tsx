import { socialMediaElementType } from "@/types/socialMediaType";
import { socialMediaArray } from "@/data/socialMediaArray";
import { Card } from "./ui/card";

const socialMediaPlatformArray : socialMediaElementType[] = socialMediaArray

export default function SocialMediaSelection() {
  return (
    <div className="flex gap-3">
      {socialMediaPlatformArray.map(s => (
        <Card key={s.value} className="p-2 cursor-pointer hover:bg-gray-300 transition-colors duration-300 ease-in-out rounded-lg">
          <s.icon size={16} className="hover:text-primary"/>
        </Card>
      ))}
    </div>
  );
};
