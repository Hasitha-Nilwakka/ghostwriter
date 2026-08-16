import { SelectElementType } from "@/types/selectElements";
import { GiWizardStaff, GiRocket, GiMagnifyingGlass, GiCompass, GiHourglass, GiSparkles, GiTeapot, GiCastle, GiSprout } from "react-icons/gi";
import { MdOutlineLocationCity, MdOutlineTheaterComedy } from "react-icons/md";
import { BsLightningCharge, BsArrowThroughHeart } from "react-icons/bs";
import { BiBookOpen } from "react-icons/bi";


export const genreArray: SelectElementType[] = [
    {
        value: 'fantasy',
        label: 'Fantasy',
        icon: GiWizardStaff
    },
    {
        value: 'science-fiction',
        label: 'Science Fiction',
        icon: GiRocket
    },
    {
        value: 'mystery',
        label: 'Mystery',
        icon: GiMagnifyingGlass
    },
    {
        value: 'adventure',
        label: 'Adventure',
        icon: GiCompass
    },
    {
        value: 'historical-fiction',
        label: 'Historical Fiction',
        icon: GiHourglass
    },
    {
        value: 'magical-realism',
        label: 'Magical Realism',
        icon: GiSparkles
    },
    {
        value: 'contemporary-fiction',
        label: 'Contemporary Fiction',
        icon: MdOutlineLocationCity
    },
    {
        value: 'cozy-mystery',
        label: 'Cozy Mystery',
        icon: GiTeapot
    },
    {
        value: 'gothic-fiction',
        label: 'Gothic Fiction',
        icon: GiCastle
    },
    {
        value: 'suspense',
        label: 'Suspense',
        icon: BsLightningCharge
    },
    {
        value: 'slice-of-life',
        label: 'Slice of Life',
        icon: GiSprout
    },
    {
        value: 'romance',
        label: 'Romance',
        icon: BsArrowThroughHeart
    },
    {
        value: 'comedy',
        label: 'Comedy',
        icon: MdOutlineTheaterComedy
    },
    {
        value: 'folklore-inspired-fiction',
        label: 'Folklore-inspired Fiction',
        icon: BiBookOpen
    }
];
