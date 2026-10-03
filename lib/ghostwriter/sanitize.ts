const AI_PREAMBLE_PATTERNS = [
  /^(?:sure|certainly|here is|here's|as an ai|below is|of course)[^:\n]*:\s*/i,
  /^here is the (?:email|story|post|content)[^:\n]*:\s*/i,
  /^i hope this helps[!.]?\s*/i,
  /^let me know if you need any adjustments[!.]?\s*/i,
];

export function removeAiArtifacts(text: string): string {
  let cleaned = text.trim();

  for (const pattern of AI_PREAMBLE_PATTERNS) {
    cleaned = cleaned.replace(pattern, "").trim();
  }

  cleaned = cleaned.replace(/^```[a-z]*\n?/i, "").replace(/\n?```$/i, "");

  return cleaned;
}

export function sanitizeTextFormatting(text: string): string {
  let cleaned = removeAiArtifacts(text);

  cleaned = cleaned.replace(/\n{3,}/g, "\n\n");

  cleaned = cleaned
    .split("\n")
    .map((line) => line.trimEnd())
    .join("\n");

  cleaned = cleaned.replace(/[^\S\r\n]{2,}/g, " ");

  return cleaned.trim();
}

export function sanitizeHashtags(hashtags: string[]): string[] {
  return hashtags
    .map((tag) => tag.trim().replace(/^#+/, ""))
    .filter(Boolean)
    .map((tag) => `#${tag}`);
}
