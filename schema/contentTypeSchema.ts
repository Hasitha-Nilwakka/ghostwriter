import { z } from 'zod'

const requiredText = z.string().trim().min(1).max(1000)

export const emailRequestSchema = z.object({
    content_type : z.literal("email"),
    parameters : z.object({
        purpose : requiredText,
        recipient_context : requiredText,
        key_points : z.array(requiredText).min(1).max(8),
        tone : requiredText,
        urgency : z.enum(["low", "normal", "high"]),
        cta : requiredText
    }).strict()
}).strict()

export const socialMediaRequestSchema = z.object({
    content_type : z.literal("social_media"),
    parameters : z.object({
        product_service : requiredText,
        platform : z.enum(["X", "LinkedIn", "Instagram", "Facebook"]),
        goal : requiredText,
        tone : requiredText,
        cta : requiredText
    }).strict()
}).strict()

const storyCharacterSchema = z.object({
  name: requiredText,
  role: requiredText,
  description: requiredText 
}).strict()


export const storyRequestSchema = z.object({
    content_type: z.literal("story"),
    parameters: z.object({
        genre: requiredText,
        characters: z.array(storyCharacterSchema).min(1).max(4),
        setting: requiredText,
        length_words: z.number().int().min(300).max(1000),
        style: requiredText,
        target_audience: requiredText,
        mood: requiredText,
    }).strict()
}).strict()


export const generateRequestSchema = z.discriminatedUnion(
    "content_type",
    [
        emailRequestSchema,
        socialMediaRequestSchema,
        storyRequestSchema
    ]
)

export type GenerateRequest = z.infer<typeof generateRequestSchema>