import "server-only"
import type { GenerateRequest } from "@/schema/contentTypeSchema";
import type { RunpodVllmInput } from "./runpod";
import type { QualityIssue } from "./qualityValidation";

export const GHOSTWRITER_SYSTEM_PROMPT = [
  "You are Ghostwriter, a structured content-generation assistant.",
  "Generate exactly one result for the requested content_type and return only strict valid JSON with the exact required keys, no Markdown fence, and no commentary.",
  "For email and social_media, use only facts and identities supplied by the user; never invent names, dates, numbers, contact details, links, attachments, product features, guarantees, promotions, scarcity, or results.",
  "For email, return exactly subject and body, cover every key point, reflect tone and urgency, incorporate the CTA naturally, use no placeholders, and omit an unsupplied sender signature.",
  "For story, return exactly title and story, use every supplied character meaningfully, make the setting essential, follow genre, style, audience, and mood, include a complete narrative and satisfying resolution, and stay within 10 percent of length_words.",
  "For social_media, return exactly post_body and hashtags, with hashtags as an array of separate valid hashtag strings and no hashtags inside post_body; follow the selected platform, tone, goal, and CTA, and keep the combined X post and hashtags within 280 characters.",
].join(" ");

export function buildRunpodInput(
  request: GenerateRequest,
): RunpodVllmInput {
  const messages = [
    {
      role: "system" as const,
      content: GHOSTWRITER_SYSTEM_PROMPT,
    },
    {
      role: "user" as const,
      content: JSON.stringify(request),
    },
  ];

  switch (request.content_type) {
    case "email":
      return {
        messages,
        sampling_params: {
          temperature: 0,
          max_tokens: 600,
        },
      };

    case "social_media":
      return {
        messages,
        sampling_params: {
          temperature: 0,
          max_tokens: 300,
        },
      };

    case "story":
      return {
        messages,
        sampling_params: {
          temperature: 0.3,
          max_tokens: Math.min(
          2_500,
          Math.ceil(request.parameters.length_words * 2) + 300,
          ),
        },
      };
  }
}

export function buildRunpodRetryInput(
  request: GenerateRequest,
  issues: QualityIssue[],
): RunpodVllmInput {
  const originalInput = buildRunpodInput(request);
  const issueCodes = new Set(
    issues.map((issue) => issue.code),
  );

  const corrections = [
    "The previous generation failed automated validation.",
    "Generate a completely new response.",
    "Return only strict valid JSON using the required output keys.",
  ];

  if (
    request.content_type === "story" &&
    issueCodes.has("STORY_WORD_COUNT_OUT_OF_RANGE")
  ) {
    const minimumWords = Math.floor(
      request.parameters.length_words * 0.9,
    );
    const maximumWords = Math.ceil(
      request.parameters.length_words * 1.1,
    );

    corrections.push(
      `The story must contain between ${minimumWords} and ${maximumWords} words.`,
      `Target approximately ${request.parameters.length_words} words.`,
      "Do not exceed the maximum word count.",
      "Prefer a shorter story over exceeding the limit.",
      "Keep paragraphs concise and avoid unnecessary description or repeated dialogue.",
      "Plan the ending early enough to provide a complete resolution within the allowed range.",
    );
  }

  if (
    request.content_type === "story" &&
    issueCodes.has("STORY_CHARACTER_MISSING")
  ) {
    const characterNames = request.parameters.characters
      .map((character) => character.name)
      .join(", ");

    corrections.push(
      `Mention every required character by exact name: ${characterNames}.`,
    );
  }

  if (
    request.content_type === "social_media" &&
    issueCodes.has("X_CHARACTER_LIMIT_EXCEEDED")
  ) {
    corrections.push(
      "The combined X post body and space-separated hashtags must not exceed 280 characters.",
      "Shorten the post before returning it.",
    );
  }

  if (
    request.content_type === "social_media" &&
    issueCodes.has("HASHTAG_IN_POST_BODY")
  ) {
    corrections.push(
      "Remove every hashtag from post_body and return hashtags only in the hashtags array.",
    );
  }

  return {
    ...originalInput,
    messages: [
      {
        role: "system",
        content: [
          GHOSTWRITER_SYSTEM_PROMPT,
          ...corrections,
        ].join(" "),
      },
      {
        role: "user",
        content: JSON.stringify(request),
      },
    ],
  };
}