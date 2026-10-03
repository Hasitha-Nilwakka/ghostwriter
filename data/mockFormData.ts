import type { EmailConfigSchema } from "@/schema/emailConfigSchema";
import type { SocialMediaConfigSchema } from "@/schema/socialConfigSchema";
import type { StoryConfigSchema } from "@/schema/storyConfigSchema";

export interface MockPreset<T> {
    id: string;
    label: string;
    description: string;
    data: T;
}

export const emailMockPresets: MockPreset<EmailConfigSchema>[] = [
    {
        id: "email-preset-1",
        label: "Strategic Partnership",
        description: "B2B integration proposal with SaaS partner",
        data: {
            purpose: "Propose a strategic B2B integration partnership to combine our analytics engine with their customer portal.",
            recipient_name: "Sarah Jenkins",
            recipient_background: "VP of Product Strategy at CloudScale Technologies, focused on enterprise partner ecosystems.",
            key_points: [
                {
                    id: "kp-1",
                    text: "Highlight mutual customer overlap and demand for synchronized workflow analytics."
                },
                {
                    id: "kp-2",
                    text: "Provide free sandbox API access and a dedicated solutions architect for a 30-day proof of concept."
                },
                {
                    id: "kp-3",
                    text: "Propose a 20-minute joint architectural review call next Tuesday or Wednesday."
                }
            ],
            tone: ["Professional", "Persuasive"],
            urgency: "normal",
            cta: "Let's schedule a 20-minute introductory sync next Tuesday at 2 PM EST to explore technical feasibility."
        }
    },
    {
        id: "email-preset-2",
        label: "Executive Incident Escalation",
        description: "High-urgency release update and mitigation plan",
        data: {
            purpose: "Notify executive stakeholders about the Q3 mobile app release security audit findings and mitigation roadmap.",
            recipient_name: "Marcus Vance",
            recipient_background: "Chief Technology Officer, overseeing engineering compliance, security posture, and production deadlines.",
            key_points: [
                {
                    id: "kp-1",
                    text: "Third-party penetration testing identified two medium-severity API rate-limiting vulnerabilities."
                },
                {
                    id: "kp-2",
                    text: "Engineering team has developed hotfix patches currently undergoing automated regression testing."
                },
                {
                    id: "kp-3",
                    text: "Deployment is scheduled for midnight UTC with zero planned downtime for active users."
                }
            ],
            tone: ["Formal", "Urgent", "Authoritative"],
            urgency: "high",
            cta: "Please review the attached vulnerability assessment summary and reply with executive sign-off by 5 PM today."
        }
    },
    {
        id: "email-preset-3",
        label: "Customer Success Follow-up",
        description: "Warm early-access invitation following user feedback",
        data: {
            purpose: "Follow up with an enterprise customer regarding their recent feedback on dashboard performance and export capabilities.",
            recipient_name: "Elena Rostova",
            recipient_background: "Head of Operations at FinEdge Global, championing daily reporting efficiency for 150+ analysts.",
            key_points: [
                {
                    id: "kp-1",
                    text: "Thank Elena and her team for their detailed feedback during last month's business review."
                },
                {
                    id: "kp-2",
                    text: "Announce that version 2.4 includes sub-second dashboard rendering and automated PDF export scheduling."
                },
                {
                    id: "kp-3",
                    text: "Invite their team for an exclusive early-access preview before public rollout."
                }
            ],
            tone: ["Friendly", "Empathetic", "Grateful"],
            urgency: "low",
            cta: "Click the preview link or reply to this email to activate early access for your team."
        }
    }
];

export const socialMediaMockPresets: MockPreset<SocialMediaConfigSchema>[] = [
    {
        id: "social-preset-1",
        label: "LinkedIn Dev Tool Launch",
        description: "Thought-leadership announcement for engineers",
        data: {
            product_service: "Ghostwriter AI: An open-source local assistant that crafts production-ready emails, viral posts, and stories with sub-second latency.",
            platform: "LinkedIn",
            goal: "Drive awareness among engineering leaders and invite contributors to star the GitHub repository.",
            tone: ["Professional", "Bold", "Inspirational"],
            cta: "Check out the repo on GitHub and drop your thoughts in the comments below!"
        }
    },
    {
        id: "social-preset-2",
        label: "X Flash Sale Buzz",
        description: "High-energy promo optimized for character limit",
        data: {
            product_service: "Apex Wireless Earbuds with active noise cancellation, custom audio profiles, and 48-hour battery life.",
            platform: "X",
            goal: "Generate immediate impulse clicks and pre-orders during a 24-hour flash sale.",
            tone: ["Urgent", "Playful", "Enthusiastic"],
            cta: "Grab yours at 40% off before midnight — link in bio!"
        }
    },
    {
        id: "social-preset-3",
        label: "Instagram Brand Story",
        description: "Authentic origin story for specialty coffee",
        data: {
            product_service: "Artisan Roast Roastery: Sustainably sourced single-origin Ethiopian coffee beans roasted weekly in small batches.",
            platform: "Instagram",
            goal: "Build emotional connection with coffee enthusiasts and boost engagement with coffee origin education.",
            tone: ["Authentic", "Warm", "Informative"],
            cta: "Double-tap if your morning isn't complete without fresh coffee, and tell us your favorite brew method!"
        }
    }
];

export const storyMockPresets: MockPreset<StoryConfigSchema>[] = [
    {
        id: "story-preset-1",
        label: "Cyberpunk Netrunner",
        description: "High-octane sci-fi heist in Neo-Kyoto",
        data: {
            genre: ["Cyberpunk", "Sci-Fi"],
            characters: [
                {
                    id: "char-1",
                    name: "Kaelen Voss",
                    role: "Rogue Netrunner",
                    description: "Cynical hacker with biometric implants searching for his sister's encrypted memory shard."
                },
                {
                    id: "char-2",
                    name: "Dr. Aris Thorne",
                    role: "Megacorp Director",
                    description: "Ruthless director of NeuroCore Systems who will silence anyone uncovering the AI glitch."
                }
            ],
            setting: "Neon-drenched subterranean alleyways of Neo-Kyoto beneath perpetual acid rain and flickering holographic billboards.",
            length_words: 350,
            style: ["Fast-paced & Action-driven", "Cinematic"],
            target_audience: ["Young Adults (13-18)"],
            mood: ["Dark & Gritty", "Tense"]
        }
    },
    {
        id: "story-preset-2",
        label: "Sunken Citadel Quest",
        description: "Rich high-fantasy exploration in a petrified forest",
        data: {
            genre: ["Fantasy", "Adventure"],
            characters: [
                {
                    id: "char-1",
                    name: "Lyra Moonshadow",
                    role: "Elven Scout",
                    description: "Resourceful archer bound by an ancient oath to protect the sacred celestial compass."
                },
                {
                    id: "char-2",
                    name: "Gorran the Stout",
                    role: "Dwarven Runesmith",
                    description: "Boisterous blacksmith armed with an ancestral warhammer and an unyielding loyalty to his companions."
                }
            ],
            setting: "The Sunken Citadel of Oakhaven, hidden inside an ancient petrified forest guarded by whispering stone gargoyles.",
            length_words: 400,
            style: ["Descriptive & Vivid", "Atmospheric & Immersive"],
            target_audience: ["General Audience"],
            mood: ["Epic", "Adventurous"]
        }
    },
    {
        id: "story-preset-3",
        label: "Lighthouse Mystery",
        description: "Noir psychological suspense during a hurricane",
        data: {
            genre: ["Psychological Thriller", "Mystery"],
            characters: [
                {
                    id: "char-1",
                    name: "Silas Wright",
                    role: "Retired Detective",
                    description: "Haunted investigator whose final unsolved cold case suddenly reopened with a mysterious static transmission."
                },
                {
                    id: "char-2",
                    name: "The Stranger",
                    role: "Enigmatic Drifter",
                    description: "Soaked traveler seeking shelter who knows secrets Silas thought were buried thirty years ago."
                }
            ],
            setting: "An isolated cliffside lighthouse battered by a category-four hurricane along the jagged coast of Maine.",
            length_words: 350,
            style: ["Noir & Gritty", "Atmospheric & Immersive"],
            target_audience: ["Adults"],
            mood: ["Eerie", "Suspenseful"]
        }
    }
];
