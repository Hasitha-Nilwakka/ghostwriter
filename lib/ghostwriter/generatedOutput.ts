import 'server-only'
import { z } from 'zod'
import type { GenerateRequest } from '@/schema/contentTypeSchema'
import { emailOutputSchema, GeneratedContent, socialMediaOutputSchema, storyOutputSchema } from '@/schema/generatedContentSchema'
import { sanitizeTextFormatting, sanitizeHashtags } from './sanitize'
import {
  isMarkdownFormatted,
  parseEmailFromMarkdown,
  parseSocialMediaFromMarkdown,
  parseStoryFromMarkdown,
  parseMarkdownStructure,
} from './structureParser'

export {
  isMarkdownFormatted,
  parseEmailFromMarkdown,
  parseSocialMediaFromMarkdown,
  parseStoryFromMarkdown,
  parseMarkdownStructure,
}

const runpodOutputEnvelopeSchema = z.array(z.looseObject({
    choices : z.array(z.looseObject({
        finish_reason: z.string().nullable().optional(),
        message : z.looseObject({
            content : z.string().min(1)
        })
    })).min(1)
})).min(1)

export function extractJsonPayload(text: string): Record<string, unknown> {
    let cleaned = text.trim();
    cleaned = cleaned.replace(/<think>[\s\S]*?<\/think>/gi, "").trim();

    try {
        const parsed = JSON.parse(cleaned);
        if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
            return parsed as Record<string, unknown>;
        }
    } catch {}

    const markdownMatch = cleaned.match(/```(?:json)?\s*([\s\S]*?)\s*```/i);
    if (markdownMatch) {
        try {
            const parsed = JSON.parse(markdownMatch[1].trim());
            if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
                return parsed as Record<string, unknown>;
            }
        } catch {}
    }

    const firstBrace = cleaned.indexOf("{");
    const lastBrace = cleaned.lastIndexOf("}");
    if (firstBrace !== -1 && lastBrace > firstBrace) {
        const candidate = cleaned.slice(firstBrace, lastBrace + 1).trim();
        try {
            const parsed = JSON.parse(candidate);
            if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
                return parsed as Record<string, unknown>;
            }
        } catch {
            const withoutTrailingCommas = candidate.replace(/,\s*([}\]])/g, "$1").trim();
            try {
                const parsed = JSON.parse(withoutTrailingCommas);
                if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
                    return parsed as Record<string, unknown>;
                }
            } catch {}
        }
    }

    throw new Error("The model returned invalid JSON");
}

function parseFromJson(
    contentType: GenerateRequest["content_type"],
    messageContent: string
): GeneratedContent {
    const raw = extractJsonPayload(messageContent);

    switch (contentType) {
        case "email": {
            const normalized = {
                subject: sanitizeTextFormatting(String(raw.subject ?? raw.subject_line ?? raw.title ?? "Subject")),
                body: sanitizeTextFormatting(String(raw.body ?? raw.email_body ?? raw.content ?? raw.message ?? ""))
            };
            return emailOutputSchema.parse(normalized);
        }
        case "social_media": {
            const post_body = sanitizeTextFormatting(String(raw.post_body ?? raw.post ?? raw.content ?? raw.body ?? ""));
            let rawTags = raw.hashtags ?? raw.tags ?? [];
            if (typeof rawTags === "string") {
                rawTags = rawTags.match(/#?[\p{L}\p{N}_]+/gu) || [];
            }
            const hashtags = Array.isArray(rawTags)
                ? sanitizeHashtags(rawTags.map(String))
                : [];
            const normalized = {
                post_body,
                hashtags: hashtags.length > 0 ? hashtags : ["#ghostwriter"]
            };
            return socialMediaOutputSchema.parse(normalized);
        }
        case "story": {
            const normalized = {
                title: sanitizeTextFormatting(String(raw.title ?? raw.story_title ?? "Untitled Story")),
                story: sanitizeTextFormatting(String(raw.story ?? raw.story_text ?? raw.content ?? raw.body ?? ""))
            };
            return storyOutputSchema.parse(normalized);
        }
        default: {
            const unreachable: never = contentType;
            throw new Error(`Unsupported content type: ${String(unreachable)}`);
        }
    }
}

function parseFromMarkdownHeaders(
    contentType: GenerateRequest["content_type"],
    messageContent: string
): GeneratedContent {
    switch (contentType) {
        case "email":
            return parseEmailFromMarkdown(messageContent);
        case "social_media":
            return parseSocialMediaFromMarkdown(messageContent);
        case "story":
            return parseStoryFromMarkdown(messageContent);
        default: {
            const unreachable: never = contentType;
            throw new Error(`Unsupported content type: ${String(unreachable)}`);
        }
    }
}

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

    // 1. Primary Strategy: Parse Markdown headers (# Title, ## Section) to identify boundaries
    if (isMarkdownFormatted(messageContent)) {
        try {
            return parseFromMarkdownHeaders(contentType, messageContent);
        } catch (markdownError) {
            console.warn("Markdown header parsing failed, attempting JSON fallback:", markdownError);
        }
    }

    // 2. Secondary Strategy: Extract and parse structured JSON (for models returning JSON)
    try {
        return parseFromJson(contentType, messageContent);
    } catch {
        // 3. Final Fallback: Attempt Markdown structure parser even without explicit # syntax
        return parseFromMarkdownHeaders(contentType, messageContent);
    }
}