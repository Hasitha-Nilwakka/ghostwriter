import { IconType } from "react-icons";
import { RxEnvelopeClosed, RxPeople, RxCrumpledPaper } from "react-icons/rx";

interface ContentObject {
  id : "email" | "social_media" | "story"
  title : string
  desc : string
  icon : IconType
  color : string
  background : string
}

export const contentTypeArray : ContentObject[] = [
  {
    id: 'email',
    title: "Email",
    desc: "Write clear, effective emails that gets results",
    icon: RxEnvelopeClosed,
    color: "text-blue-500",
    background: "bg-blue-500/10",
  },
  {
    id: 'social_media',
    title: "Social Post",
    desc: "Create engaging posts that grow your audience",
    icon: RxPeople,
    color: "text-orange-400",
    background: "bg-orange-400/10",
  },
  {
    id: 'story',
    title: "Story",
    desc: "Generate creative stories with just few clicks",
    icon: RxCrumpledPaper,
    color: "text-red-500",
    background: "bg-red-500/10",
  }
]