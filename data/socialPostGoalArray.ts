import { SelectElementType } from "@/types/selectElements";
import { PiMegaphoneLight,PiTrophyLight, PiStorefrontLight, PiBriefcase, PiUserPlusLight, PiHandCoinsLight, PiGraduationCap, PiCalendarCheckLight, PiNewspaperClippingThin, PiUsersThreeLight } from "react-icons/pi";
import { LuHeartHandshake,  LuMousePointerClick, LuSearchCode } from "react-icons/lu";
import { LiaShoppingBagSolid, LiaTvSolid } from "react-icons/lia";
import { FiDownloadCloud } from "react-icons/fi";
import { HiOutlineCalendarDays } from "react-icons/hi2";
import { IoIosTimer } from "react-icons/io";
import { RiCustomerServiceLine } from "react-icons/ri";
import { TbClipboardList } from "react-icons/tb";

export const socialPostGoalArray : SelectElementType[] = [
  { 
    value : "brand_awareness", label: "Brand awareness", icon: PiMegaphoneLight },
  { 
    value : "engagement", label: "Engagement", icon: LuHeartHandshake },
  { 
    value : "sales", label: "Sales", icon: LiaShoppingBagSolid },
  { 
    value : "lead_generation", label: "Lead generation", icon: PiUserPlusLight },
  { 
    value : "product_education", label: "Product education", icon: PiGraduationCap },
  { 
    value : "event_registrations", label: "Event registrations", icon: PiCalendarCheckLight },
  { 
    value : "app_downloads", label: "App downloads", icon: FiDownloadCloud },
  { 
    value : "bookings", label: "Bookings", icon: HiOutlineCalendarDays },
  { 
    value : "waitlist_signups", label: "Waitlist sign-ups", icon: IoIosTimer },
  { 
    value : "demo_requests", label: "Demo requests", icon: LiaTvSolid },
  { 
    value : "website_traffic", label: "Website traffic", icon: LuMousePointerClick },
  { 
    value : "newsletter_subscriptions", label: "Newsletter subscriptions", icon: PiNewspaperClippingThin },
  { 
    value : "community_growth", label: "Community growth", icon: PiUsersThreeLight },
  { 
    value : "customer_retention", label: "Customer retention", icon: RiCustomerServiceLine },
  { 
    value : "fundraising", label: "Fundraising & Donations", icon: PiHandCoinsLight },
  { 
    value : "survey_responses", label: "Survey & Feedback", icon: TbClipboardList },
  { 
    value : "store_visits", label: "Foot traffic & Store visits", icon: PiStorefrontLight },
  { 
    value : "contest_entries", label: "Contest & Giveaway entries", icon: PiTrophyLight },
  { 
    value : "b2b_partnerships", label: "B2B Partnerships", icon: PiBriefcase },
  { 
    value : "talent_acquisition", label: "Talent acquisition", icon: LuSearchCode }
]
