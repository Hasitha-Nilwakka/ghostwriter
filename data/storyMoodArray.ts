import { SelectElementType } from "@/types/selectElements";
import { GiIronMask, GiMagnifyingGlass, GiCompass, GiBrain, GiGhost, GiTeapot, GiSparkles, GiHeartArmor } from "react-icons/gi";
import { BsSun, BsCloudRain, BsLightningCharge, BsEmojiSmile, BsEmojiTear } from "react-icons/bs";


export const storyMoodArray: SelectElementType[] = [
    {
        value: 'tense',
        label: 'Tense',
        icon: GiIronMask
    },
    {
        value: 'bittersweet',
        label: 'Bittersweet',
        icon: BsEmojiTear
    },
    {
        value: 'mysterious',
        label: 'Mysterious',
        icon: GiMagnifyingGlass
    },
    {
        value: 'hopeful',
        label: 'Hopeful',
        icon: BsSun
    },
    {
        value: 'melancholic',
        label: 'Melancholic',
        icon: BsCloudRain
    },
    {
        value: 'adventurous',
        label: 'Adventurous',
        icon: GiCompass
    },
    {
        value: 'eerie',
        label: 'Eerie',
        icon: GiGhost
    },
    {
        value: 'comforting',
        label: 'Comforting',
        icon: GiTeapot
    },
    {
        value: 'whimsical',
        label: 'Whimsical',
        icon: GiSparkles
    },
    {
        value: 'suspenseful',
        label: 'Suspenseful',
        icon: BsLightningCharge
    },
    {
        value: 'humorous',
        label: 'Humorous',
        icon: BsEmojiSmile
    },
    {
        value: 'joyful',
        label: 'Joyful',
        icon: BsSun
    },
    {
        value: 'reflective',
        label: 'Reflective',
        icon: GiBrain
    },
    {
        value: 'romantic',
        label: 'Romantic',
        icon: GiHeartArmor
    }
];
