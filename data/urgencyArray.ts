import type { SelectElementType } from "@/types/selectElements";
import { RiCheckboxBlankCircleFill } from "react-icons/ri";

export const urgencyArray : SelectElementType[] = [
    {
        value : 'low',
        label : 'Low',
        icon : RiCheckboxBlankCircleFill,
        color : '#3B82F6'
    },
    {
        value : 'normal',
        label : 'Normal',
        icon : RiCheckboxBlankCircleFill,
        color : '#F59E0B'
    },
    {
        value : 'high',
        label : 'High',
        icon : RiCheckboxBlankCircleFill,
        color : '#EF4444'
    }
]