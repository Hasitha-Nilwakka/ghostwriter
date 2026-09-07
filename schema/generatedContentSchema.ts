import { z } from 'zod'

const generatedText = z.string().trim().min(1)

export const emailOutputSchema = z.strictObject({
    subject : generatedText.max(200),
    body : generatedText.max(10_000),
})

const hashtagSchema = z.string().trim().regex(
    /^#[\p{L}\p{N}_]+$/u,
    "Each hashtag must begin with # and contain no spaces",
)

export const socialMediaOutputSchema = z.strictObject({
    post_body : generatedText.max(5_000),
    hashtags : z.array(hashtagSchema).min(1).max(15)
})

export const storyOutputSchema = z.strictObject({
  title: generatedText.max(200),
  story: generatedText.max(20_000),
});

export type EmailOutput = z.infer<typeof emailOutputSchema>
export type SocialMediaOutput = z.infer<typeof socialMediaOutputSchema>
export type StoryOutput = z.infer<typeof storyOutputSchema>

export type GeneratedContent =
  | EmailOutput
  | SocialMediaOutput
  | StoryOutput;
