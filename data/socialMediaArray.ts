import { socialMediaElementType } from "@/types/socialMediaType";
import { VscTwitter } from "react-icons/vsc";
import { BsFacebook } from "react-icons/bs";
import { IoLogoInstagram } from "react-icons/io5";
import { PiSnapchatLogoLight, PiYoutubeLogoLight } from "react-icons/pi";
import { ImLinkedin } from "react-icons/im";


export const socialMediaArray : socialMediaElementType[] = [
    {
        value : 'x',
        icon : VscTwitter
    },
    {
        value : 'facebook',
        icon : BsFacebook
    },
    {
        value : 'instagaram',
        icon : IoLogoInstagram
    },
    {
        value : 'snapchat',
        icon : PiSnapchatLogoLight
    },
    {
        value : 'yputube',
        icon : PiYoutubeLogoLight
    },
    {
        value : 'linkedin',
        icon : ImLinkedin
    }
]