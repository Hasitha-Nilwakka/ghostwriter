import { SelectElementType } from "@/types/selectElements";
import { LuBriefcaseBusiness } from "react-icons/lu";
import { LiaUserFriendsSolid } from "react-icons/lia";
import { TbSquareRoundedLetterB, TbRocket } from "react-icons/tb";
import { PiSunLight, PiSparkleThin , PiLightningLight, PiChatCircleDotsLight, PiHandFist, PiHeartLight, PiQuotesLight } from "react-icons/pi";
import { LuBookOpenText, LuWrench } from "react-icons/lu";

export const socialPostToneArray : SelectElementType[] = [
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
        value : 'conversational',
        label : 'Conversational',
        icon : PiChatCircleDotsLight
    },
    {
        value : 'energetic',
        label : 'Energetic',
        icon : PiLightningLight
    },
    {
        value : 'playful',
        label : 'Playful',
        icon : PiSparkleThin
    },
    {
        value : 'confident',
        label : 'Confident',
        icon : PiHandFist
    },
    {
        value : 'informative',
        label : 'Informative',
        icon : LuBookOpenText
    },
    {
        value : 'warm',
        label : 'Warm',
        icon : PiSunLight
    },
    {
        value : 'practical',
        label : 'Practical',
        icon : LuWrench
    },
    {
        value : 'bold',
        label : 'Bold',
        icon : TbSquareRoundedLetterB
    },
    {
        value : 'motivational',
        label : 'Motivational',
        icon : TbRocket
    },
    {
        value : 'appreciative',
        label : 'Appreciative',
        icon : PiHeartLight
    },
    {
        value : 'witty',
        label : 'Witty',
        icon : PiQuotesLight
    }
]
