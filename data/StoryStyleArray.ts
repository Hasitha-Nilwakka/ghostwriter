import { SelectElementType } from "@/types/selectElements";
import { GiWindHole, GiMicrophone, GiFilmProjector, GiTalk, GiPerson, GiFeather } from "react-icons/gi";
import { BsLightningCharge, BsEye } from "react-icons/bs";
import { MdOutlineTheaterComedy } from "react-icons/md";
import { IoSparklesOutline } from "react-icons/io5";
import { FaMinus } from "react-icons/fa6";

export const storyStyleArray: SelectElementType[] = [
    {
        value: 'atmospheric',
        label: 'Atmospheric',
        icon: GiWindHole
    },
    {
        value: 'lyrical',
        label: 'Lyrical',
        icon: GiMicrophone
    },
    {
        value: 'cinematic',
        label: 'Cinematic',
        icon: GiFilmProjector
    },
    {
        value: 'dialogue-driven',
        label: 'Dialogue-driven',
        icon: GiTalk
    },
    {
        value: 'character-focused',
        label: 'Character-focused',
        icon: GiPerson
    },
    {
        value: 'descriptive',
        label: 'Descriptive',
        icon: GiFeather
    },
    {
        value: 'intimate',
        label: 'Intimate',
        icon: BsEye
    },
    {
        value: 'fast-paced',
        label: 'Fast-paced',
        icon: BsLightningCharge
    },
    {
        value: 'fable-like',
        label: 'Fable-like',
        icon: IoSparklesOutline
    },
    {
        value: 'minimalist',
        label: 'Minimalist',
        icon: FaMinus
    },
    {
        value: 'humorous',
        label: 'Humorous',
        icon: MdOutlineTheaterComedy
    }
];

