import * as z from "zod";

const requiredText = z.string().trim().min(1, "This field is required");

export const storyCharacterConfigSchema = z.object({
    id: z.string().optional(),
    name: z.string().trim().min(1, "Name is required").max(100),
    role: z.string().trim().min(1, "Role is required").max(100),
    description: z.string().trim().min(1, "Description is required").max(300)
});

export const storyConfigSchema = z.object({
    genre: z.array(z.string().min(1)).min(1, "Select at least one genre").max(2, "Select up to 2 genres"),
    characters: z.array(storyCharacterConfigSchema).min(1, "At least 1 character is required").max(4, "Maximum 4 characters allowed"),
    setting: requiredText.max(300),
    length_words: z.number().int().min(300, "Minimum 300 words").max(1000, "Maximum 1000 words"),
    style: z.array(z.string().min(1)).min(1, "Select at least one style").max(2, "Select up to 2 styles"),
    target_audience: z.array(z.string().min(1)).min(1, "Select a target audience").max(2, "Select up to 2 target audiences"),
    mood: z.array(z.string().min(1)).min(1, "Select at least one mood").max(2, "Select up to 2 moods")
});

export type StoryConfigSchema = z.infer<typeof storyConfigSchema>;
export type StoryCharacterConfig = z.infer<typeof storyCharacterConfigSchema>;
