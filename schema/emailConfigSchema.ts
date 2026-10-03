import * as z from 'zod'

const requiredText = z.string().min(5, 'minimum character length is 5')

const keyPointSchema = z.object({
    id: z.string(),
    text: requiredText
})

export const emailConfigSchema = z.object({
    purpose : requiredText.max(200),
    recipient_name : requiredText.max(150),
    recipient_background : requiredText.max(300),
    key_points : z.array(keyPointSchema).min(1, 'at least one point required').max(8),
    tone : z.array(z.string().min(1)).min(1, 'Select at least one tone').max(3, 'Maximum 3 tones allowed'),
    urgency : z.enum(["low", "normal", "high"]),
    cta : requiredText.max(300)
})

export type EmailConfigSchema = z.infer<typeof emailConfigSchema>