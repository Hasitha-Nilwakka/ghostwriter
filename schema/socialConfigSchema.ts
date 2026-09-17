import * as z from 'zod'

const requiredText = z.string().min(5, 'minimum character length is 5')

export const socialMediaConfigSchema = z.object({
    product_service : requiredText.max(300),
    platform : z.enum(["X", "LinkedIn", "Instagram", "Facebook"]),
    goal : requiredText,
    tone : z.array(requiredText).min(1, 'atleast one is required').max(3),
    cta : requiredText
})

export type SocialMediaConfigSchema = z.infer<typeof socialMediaConfigSchema>