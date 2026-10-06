import "server-only";
import {
  emailOutputSchema,
  socialMediaOutputSchema,
  storyOutputSchema,
  type EmailOutput,
  type SocialMediaOutput,
  type StoryOutput,
} from "@/schema/generatedContentSchema";
import { sanitizeTextFormatting, sanitizeHashtags, removeAiArtifacts } from "./sanitize";

export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

export interface MarkdownHeader {
  level: HeadingLevel;
  text: string;
  raw: string;
  lineNumber: number;
}

export interface MarkdownSection {
  title: string;
  level: HeadingLevel;
  content: string;
  wordCount: number;
  characterCount: number;
  startLine: number;
  endLine: number;
}

export interface ParsedMarkdownStructure {
  title: string;
  headings: MarkdownHeader[];
  hierarchy: {
    h1: string[];
    h2: string[];
    h3: string[];
    h4: string[];
  };
  sections: MarkdownSection[];
  preamble: string;
  metadata: {
    wordCount: number;
    characterCount: number;
    estimatedReadTimeMinutes: number;
    hasHeaders: boolean;
    sectionCount: number;
  };
  rawText: string;
}

/**
 * Checks whether the provided text contains Markdown heading syntax (# Heading).
 */
export function isMarkdownFormatted(text: string): boolean {
  if (!text || typeof text !== "string") return false;
  return /(?:^|\n)#{1,6}\s+\S+/m.test(text);
}

/**
 * Parses raw text into structured Markdown headers and section boundaries.
 * Identifies H1 > H2 > H3 hierarchy, extracts metadata, and maps sections.
 */
export function parseMarkdownStructure(text: string): ParsedMarkdownStructure {
  let cleaned = (text ?? "").trim();
  cleaned = cleaned.replace(/<think>[\s\S]*?<\/think>/gi, "").trim();

  // Strip wrapping markdown code fences if model wrapped output in ```markdown ... ```
  cleaned = cleaned.replace(/^```(?:markdown)?\s*\n/i, "").replace(/\n```\s*$/i, "").trim();

  const lines = cleaned.split("\n");
  const headings: MarkdownHeader[] = [];

  const headingRegex = /^(#{1,6})\s+(.+?)(?:\s+#+)?$/;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    const match = line.match(headingRegex);
    if (match) {
      const level = match[1].length as HeadingLevel;
      const headingText = match[2].trim();
      headings.push({
        level,
        text: headingText,
        raw: line,
        lineNumber: i + 1,
      });
    }
  }

  const sections: MarkdownSection[] = [];
  let preamble = "";

  if (headings.length === 0) {
    preamble = cleaned;
  } else {
    // Capture preamble before first heading
    const firstHeaderLine = headings[0].lineNumber - 1;
    preamble = lines.slice(0, firstHeaderLine).join("\n").trim();

    for (let i = 0; i < headings.length; i++) {
      const current = headings[i];
      const startLineIdx = current.lineNumber; // 1-indexed, line after header is current.lineNumber
      const endLineIdx = i + 1 < headings.length ? headings[i + 1].lineNumber - 1 : lines.length;

      const sectionLines = lines.slice(startLineIdx, endLineIdx);
      const content = sectionLines.join("\n").trim();

      // If this is an H1 document title with no content of its own because subheadings follow immediately,
      // let it serve as the document title rather than an empty section.
      if (current.level === 1 && !content && headings.length > 1) {
        continue;
      }

      const words = content.match(/\S+/gu)?.length ?? 0;

      sections.push({
        title: current.text,
        level: current.level,
        content,
        wordCount: words,
        characterCount: content.length,
        startLine: current.lineNumber,
        endLine: endLineIdx,
      });
    }
  }

  // Hierarchy identification
  const hierarchy = {
    h1: headings.filter((h) => h.level === 1).map((h) => h.text),
    h2: headings.filter((h) => h.level === 2).map((h) => h.text),
    h3: headings.filter((h) => h.level === 3).map((h) => h.text),
    h4: headings.filter((h) => h.level === 4).map((h) => h.text),
  };

  // Derive document title: H1 preferred, then first heading, then first non-empty line
  let title = "";
  if (hierarchy.h1.length > 0) {
    title = hierarchy.h1[0];
  } else if (headings.length > 0) {
    title = headings[0].text;
  } else {
    const firstNonEmpty = lines.find((l) => l.trim().length > 0) ?? "Untitled";
    title = firstNonEmpty.slice(0, 100);
  }

  // Clean title prefix if any (e.g. "Subject: ...", "Title: ...")
  title = title.replace(/^(?:subject|title)\s*:\s*/i, "").trim();

  const totalWords = cleaned.match(/\S+/gu)?.length ?? 0;

  return {
    title,
    headings,
    hierarchy,
    sections,
    preamble,
    metadata: {
      wordCount: totalWords,
      characterCount: cleaned.length,
      estimatedReadTimeMinutes: Math.max(1, Math.ceil(totalWords / 200)),
      hasHeaders: headings.length > 0,
      sectionCount: sections.length,
    },
    rawText: cleaned,
  };
}

/**
 * Parses Markdown-formatted content into a structured Email output.
 * Extracts subject line from H1 or ## Subject header, and body from content sections.
 */
export function parseEmailFromMarkdown(text: string): EmailOutput {
  const structure = parseMarkdownStructure(text);

  let subject = "";
  const bodyLines: string[] = [];

  // 1. Look for explicit H1 with Subject: or title
  if (structure.hierarchy.h1.length > 0) {
    const h1 = structure.hierarchy.h1[0];
    subject = h1.replace(/^(?:subject(?:\s*line)?|re)\s*:\s*/i, "").trim();
  }

  // 2. Look for section titled "Subject"
  const subjectSection = structure.sections.find((s) => /^subject(?:\s*line)?$/i.test(s.title));
  if (subjectSection && subjectSection.content) {
    subject = subjectSection.content.split("\n")[0].trim();
  }

  // 3. Fallback: check preamble for "Subject: ..." line
  if (!subject) {
    const subjectLineMatch = structure.rawText.match(/^(?:subject|re)\s*:\s*(.+)$/im);
    if (subjectLineMatch) {
      subject = subjectLineMatch[1].trim();
    }
  }

  // 4. Fallback: use first heading or first line
  if (!subject) {
    subject = structure.title || "Subject";
  }

  // Find body content:
  // Prefer section with header matching "Body", "Email Body", "Message", or "Content"
  const bodySection = structure.sections.find((s) =>
    /^(?:email\s*)?(?:body|content|message)$/i.test(s.title),
  );

  if (bodySection && bodySection.content) {
    bodyLines.push(bodySection.content);
  } else {
    // If no explicit body header, collect sections that aren't the subject header
    for (const section of structure.sections) {
      if (/^subject(?:\s*line)?$/i.test(section.title)) continue;
      // If H1 was the subject, section content under H1 is body content
      if (section.level === 1 && section.title === structure.headings[0]?.text) {
        if (section.content) bodyLines.push(section.content);
      } else {
        bodyLines.push(section.content);
      }
    }
  }

  // If no sections yielded body lines, fallback to preamble or full text without subject
  let body = bodyLines.filter(Boolean).join("\n\n").trim();
  if (!body) {
    body = structure.preamble || structure.rawText;
  }

  // Strip any duplicate leading Subject line from body
  body = body.replace(/^(?:#\s*)?(?:subject|re)\s*:[^\n]*\n+/i, "").trim();

  const normalized = {
    subject: sanitizeTextFormatting(subject || "Email Subject"),
    body: sanitizeTextFormatting(body),
  };

  return emailOutputSchema.parse(normalized);
}

/**
 * Parses Markdown-formatted content into a structured Social Media output.
 * Extracts post body from ## Post section, and hashtags from ## Hashtags section.
 */
export function parseSocialMediaFromMarkdown(text: string): SocialMediaOutput {
  const structure = parseMarkdownStructure(text);

  let postBody = "";
  const extractedTags: string[] = [];

  // Look for dedicated Hashtags section
  const hashtagsSection = structure.sections.find((s) =>
    /^(?:hashtags?|tags?|keywords?)$/i.test(s.title),
  );

  if (hashtagsSection && hashtagsSection.content) {
    const matched = hashtagsSection.content.match(/#?[\p{L}\p{N}_]+/gu);
    if (matched) {
      extractedTags.push(...matched);
    }
  }

  // Look for dedicated Post / Copy section
  const postSection = structure.sections.find((s) =>
    /^(?:post(?:\s*body|\s*content)?|content|copy|caption)$/i.test(s.title),
  );

  if (postSection && postSection.content) {
    postBody = postSection.content;
  } else {
    // Collect all sections that are NOT the hashtags section
    const nonTagSections = structure.sections.filter(
      (s) => !/^(?:hashtags?|tags?|keywords?)$/i.test(s.title),
    );

    if (nonTagSections.length > 0) {
      postBody = nonTagSections.map((s) => s.content).filter(Boolean).join("\n\n");
    } else {
      postBody = structure.preamble || structure.rawText;
    }
  }

  // Also collect any hashtags present anywhere in the text if none found in dedicated section
  if (extractedTags.length === 0) {
    const allHashTokens = structure.rawText.match(/#[\p{L}\p{N}_]+/gu);
    if (allHashTokens) {
      extractedTags.push(...allHashTokens);
    }
  }

  // Remove hashtags section heading and tags from postBody if they were bundled
  postBody = postBody.replace(/##\s*(?:hashtags?|tags?)[\s\S]*$/i, "").trim();

  // Strip standalone hashtag lines at end of post body to satisfy "no hashtags in post_body"
  postBody = postBody.replace(/(?:\n|^)(?:#[\p{L}\p{N}_]+\s*)+$/gu, "").trim();

  const sanitizedTags = sanitizeHashtags(extractedTags);

  const normalized = {
    post_body: sanitizeTextFormatting(postBody),
    hashtags: sanitizedTags.length > 0 ? sanitizedTags : ["#ghostwriter"],
  };

  return socialMediaOutputSchema.parse(normalized);
}

/**
 * Parses Markdown-formatted content into a structured Story output.
 * Extracts title from H1 and concatenates narrative sections.
 */
export function parseStoryFromMarkdown(text: string): StoryOutput {
  const structure = parseMarkdownStructure(text);

  const title = structure.title || "Untitled Story";

  // Reconstruct narrative story prose across section boundaries
  const narrativeParts: string[] = [];

  if (structure.sections.length > 0) {
    for (const section of structure.sections) {
      if (section.content) {
        narrativeParts.push(section.content);
      }
    }
  }

  let story = narrativeParts.filter(Boolean).join("\n\n").trim();
  if (!story) {
    story = structure.preamble || structure.rawText;
  }

  // If title was on the first line of the story, remove it
  const titleRegex = new RegExp(`^#*\\s*${title.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\s*\\n+`, "i");
  story = story.replace(titleRegex, "").trim();

  story = removeAiArtifacts(story);

  const normalized = {
    title: sanitizeTextFormatting(title),
    story: sanitizeTextFormatting(story),
  };

  return storyOutputSchema.parse(normalized);
}
