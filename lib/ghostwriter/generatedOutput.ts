import 'server-only'
import { z } from 'zod'
import type { GenerateRequest } from '@/schema/contentTypeSchema'
import { emailOutputSchema, GeneratedContent, socialMediaOutputSchema, storyOutputSchema } from '@/schema/generatedContentSchema'

const runpodOutputEnvelopeSchema = z.array(z.looseObject({
    choices : z.array(z.looseObject({
        finish_reason: z.string().nullable().optional(),
        message : z.looseObject({
            content : z.string().min(1)
        })
    })).min(1)
})).min(1)

export function parseGeneratedContent(
    contentType : GenerateRequest["content_type"],
    output : unknown
) : GeneratedContent {
    const envelope = runpodOutputEnvelopeSchema.parse(output)
    const choice = envelope[0].choices[0];

    if (choice.finish_reason === "length") {
    throw new Error(
        "The model output was truncated after reaching the token limit",
    );
    }

    const messageContent = choice.message.content;

    let parsedContent : unknown

    try {
        parsedContent = JSON.parse(messageContent) as unknown
    } catch {
        throw new Error(
            "The model returned invalid JSON"
        )
    }


    switch (contentType) {
        case "email" :
            return emailOutputSchema.parse(parsedContent)
        case "social_media" :
            return socialMediaOutputSchema.parse(parsedContent)
        case "story" :
            return storyOutputSchema.parse(parsedContent)
        default : {
            const unreachable : never = contentType
            throw new Error(
                `Unsupported content type : ${String(unreachable)}`
            )
        }
    }
}