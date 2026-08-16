import { SelectElementType } from "@/types/selectElements";
import { MdChildCare, MdFace, MdSchool, MdPerson, MdGroups } from "react-icons/md";


export const storyAudienceArray: SelectElementType[] = [
    {
        value: 'children',
        label: 'Children',
        icon: MdChildCare
    },
    {
        value: 'teen',
        label: 'Teen',
        icon: MdFace
    },
    {
        value: 'young-adult',
        label: 'Young Adult',
        icon: MdSchool
    },
    {
        value: 'adult',
        label: 'Adult',
        icon: MdPerson
    },
    {
        value: 'general',
        label: 'General',
        icon: MdGroups
    }
];

