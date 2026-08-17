import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";
import {contentTypeArray } from '../data/contentTypesArray'
import { useContentSelection, ContentType } from "@/store/contentTypeStore";

export default function ContentSelector() {
  const selectedContent = useContentSelection((state) => state.selectedContent)
  const setSelectedContent = useContentSelection((state) => state.setSelectedContent)

  return (
    <RadioGroup 
      value={selectedContent}
      onValueChange={(value) => setSelectedContent(value as ContentType)}
      className="grid gap-2 max-w-sm"
    >
      {contentTypeArray.map((item) => {
        const Icon = item.icon;
        return (
          <Label
            key={item.id}
            htmlFor={item.id}
            className={cn(
              "flex cursor-pointer items-center gap-3 rounded-lg border border-primary-col p-4 shadow-xs transition-all",
              "hover:bg-accent",
              "has-data-checked:bg-bg",
            )}
          >
            <div className={`${item.background} p-1.5 rounded-lg`}>
              <Icon className={item.color} size={20}/>
            </div>
            <div className="w-full">
              <div className="flex flex-col items-start gap-1">
                <p className="font-medium leading-none">{item.title}</p>
                <p className="text-xs text-muted-foreground font-normal text-left">
                  {item.desc}
                </p>
              </div>
            </div>
            <RadioGroupItem value={item.id} id={item.id}/>
          </Label>
        );
      })}
    </RadioGroup>
  )
};
