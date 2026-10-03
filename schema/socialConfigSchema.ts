import * as z from "zod";

const requiredText = z.string().trim().min(5, "Minimum character length is 5");

export const socialMediaConfigSchema = z.object({
    product_service: requiredText.max(300),
    platform: z.enum(["X", "LinkedIn", "Instagram", "Facebook"]),
    goal: requiredText.max(300),
    tone: z.array(z.string().min(1)).min(1, "Select at least one tone").max(3, "Maximum 3 tones allowed"),
    cta: requiredText.max(300)
});

export type SocialMediaConfigSchema = z.infer<typeof socialMediaConfigSchema>;