import "server-only";

import type { GenerateRequest } from "@/schema/contentTypeSchema";
import {
  emailOutputSchema,
  socialMediaOutputSchema,
  storyOutputSchema,
  type GeneratedContent,
} from "@/schema/generatedContentSchema";

export type QualityIssue = {
  code:
    | "HASHTAG_IN_POST_BODY"
    | "X_CHARACTER_LIMIT_EXCEEDED"
    | "STORY_WORD_COUNT_OUT_OF_RANGE"
    | "STORY_CHARACTER_MISSING"
    | "INAPPROPRIATE_CONTENT_DETECTED";
  message: string;
};

export type QualityMetrics = {
  xCharacterCount?: number;
  xCharacterLimit?: number;
  storyWordCount?: number;
  storyMinimumWords?: number;
  storyMaximumWords?: number;
};

export type QualityValidationResult = {
  valid: boolean;
  issues: QualityIssue[];
  metrics: QualityMetrics;
};

// Heuristic safety check for harmful or dangerous keywords
const UNSAFE_CONTENT_REGEX = /\b(?:kill yourself|suicide method|bomb threat|credit card stolen|cvv number)\b/i;

function containsHarmfulContent(text: string): boolean {
  return UNSAFE_CONTENT_REGEX.test(text);
}

export function validateGeneratedContent(
  request: GenerateRequest,
  content: GeneratedContent,
): QualityValidationResult {
  const issues: QualityIssue[] = [];
  const metrics: QualityMetrics = {};

  switch (request.content_type) {
    case "email": {
      const email = emailOutputSchema.parse(content);
      if (containsHarmfulContent(email.subject) || containsHarmfulContent(email.body)) {
        issues.push({
          code: "INAPPROPRIATE_CONTENT_DETECTED",
          message: "The generated email contains inappropriate or harmful content.",
        });
      }
      break;
    }

    case "social_media": {
      const social = socialMediaOutputSchema.parse(content);

      if (containsHarmfulContent(social.post_body)) {
        issues.push({
          code: "INAPPROPRIATE_CONTENT_DETECTED",
          message: "The generated social post contains inappropriate or harmful content.",
        });
      }

      if (/#[\p{L}\p{N}_]+/u.test(social.post_body)) {
        issues.push({
          code: "HASHTAG_IN_POST_BODY",
          message:
            "Hashtags must be returned only in the hashtags array.",
        });
      }

      if (request.parameters.platform === "X") {
        const renderedPost = [
          social.post_body.trim(),
          social.hashtags.join(" "),
        ].join(" ");

        const characterCount = Array.from(renderedPost).length;

        metrics.xCharacterCount = characterCount;
        metrics.xCharacterLimit = 280;

        if (characterCount > 280) {
          issues.push({
            code: "X_CHARACTER_LIMIT_EXCEEDED",
            message:
              `The combined X post contains ${characterCount} ` +
              "characters; the limit is 280.",
          });
        }
      }

      break;
    }

    case "story": {
      const generatedStory = storyOutputSchema.parse(content);

      if (containsHarmfulContent(generatedStory.title) || containsHarmfulContent(generatedStory.story)) {
        issues.push({
          code: "INAPPROPRIATE_CONTENT_DETECTED",
          message: "The generated story contains inappropriate or harmful content.",
        });
      }

      const requestedWords = request.parameters.length_words;

      const minimumWords = Math.floor(requestedWords * 0.9);
      const maximumWords = Math.ceil(requestedWords * 1.1);
      const wordCount =
        generatedStory.story.match(/\S+/gu)?.length ?? 0;

      metrics.storyWordCount = wordCount;
      metrics.storyMinimumWords = minimumWords;
      metrics.storyMaximumWords = maximumWords;

      if (
        wordCount < minimumWords ||
        wordCount > maximumWords
      ) {
        issues.push({
          code: "STORY_WORD_COUNT_OUT_OF_RANGE",
          message:
            `The story contains ${wordCount} words; ` +
            `the allowed range is ${minimumWords}–${maximumWords}.`,
        });
      }

      const normalizedStory =
        generatedStory.story.toLowerCase();

      for (const character of request.parameters.characters) {
        if (
          !normalizedStory.includes(
            character.name.toLowerCase(),
          )
        ) {
          issues.push({
            code: "STORY_CHARACTER_MISSING",
            message:
              `The character "${character.name}" does not ` +
              "appear in the generated story.",
          });
        }
      }

      break;
    }
  }

  return {
    valid: issues.length === 0,
    issues,
    metrics,
  };
}