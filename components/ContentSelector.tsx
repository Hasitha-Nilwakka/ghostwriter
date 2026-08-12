import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";
import { IconType } from "react-icons";
import { RxEnvelopeClosed, RxPeople, RxCrumpledPaper } from "react-icons/rx";

interface ContentObject {
  id : string
  title : string
  desc : string
  icon : IconType
  color : string
  background : string
}

const contents : ContentObject[] = [
  {
    id: 'content-1',
    title: "Email",
    desc: "Write clear, effective emails that gets results",
    icon: RxEnvelopeClosed,
    color: "text-blue-500",
    background: "bg-blue-500/10",
  },
  {
    id: 'content-2',
    title: "Social Post",
    desc: "Create engaging posts that grow your audience",
    icon: RxPeople,
    color: "text-orange-400",
    background: "bg-orange-400/10",
  },
  {
    id: 'content-3',
    title: "Story",
    desc: "Generate creative stories with just few clicks",
    icon: RxCrumpledPaper,
    color: "text-red-500",
    background: "bg-red-500/10",
  }
]

export default function ContentSelector() {
  return (
    <RadioGroup defaultValue="content-1" className="grid gap-2 max-w-sm">
      {contents.map((item) => {
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
            <RadioGroupItem value={item.id} id={item.id} />
          </Label>
        );
      })}
    </RadioGroup>
  )
};
