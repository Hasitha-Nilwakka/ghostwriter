import { SelectElementType } from "@/types/selectElements";
import { LuBriefcaseBusiness } from "react-icons/lu";
import { LiaUserFriendsSolid, LiaHandshake, LiaAngry } from "react-icons/lia";
import { TbEmpathize, TbUrgent } from "react-icons/tb";
import { PiCoffeeLight, PiHandsPrayingLight, PiHeadset, PiWarningLight, PiHandFist } from "react-icons/pi";


export const emailToneArray : SelectElementType[] = [
    {
        value : 'professional',
        label : 'Professional',
        icon : LuBriefcaseBusiness
    },
    {
        value : 'friendly',
        label : 'Friendly',
        icon : LiaUserFriendsSolid
    },
    {
        value : 'empathetic',
        label : 'Empathetic',
        icon : TbEmpathize
    },
    {
        value : 'supportive',
        label : 'Supportive',
        icon : LiaHandshake
    },
    {
        value : 'urgent',
        label : 'Urgent',
        icon : TbUrgent
    },
    {
        value : 'casual',
        label : 'Casual',
        icon : PiCoffeeLight
    },
    {
        value : 'apologetic',
        label : 'Apologetic',
        icon : PiHandsPrayingLight
    },
    {
        value : 'complaining',
        label : 'Complaining',
        icon : PiHeadset
    },
    {
        value : 'critical',
        label : 'Critical',
        icon : PiWarningLight
    },
    {
        value : 'angry',
        label : 'Angry',
        icon : LiaAngry
    },
    {
        value : 'assertive',
        label : 'Assertive',
        icon : PiHandFist
    }
]