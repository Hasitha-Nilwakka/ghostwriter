import "server-only";
import type { GenerateRequest } from "@/schema/contentTypeSchema";
import type { RunpodVllmInput } from "./runpod";
import type { QualityIssue } from "./qualityValidation";

export function buildEmailPrompt(
  request: Extract<GenerateRequest, { content_type: "email" }>,
): { systemPrompt: string; userPrompt: string } {
  const { purpose, recipient_context, key_points, tone, urgency, cta } =
    request.parameters;

  const systemPrompt = [
    "You are Ghostwriter, an executive communications and professional email drafting assistant.",
    "Your objective is to produce high-impact, context-aware emails with professional structure and clarity.",
    "Format your response with clear Markdown headers to define section boundaries:",
    "- Use a top-level H1 header '# Subject: <Subject Line>' for the email subject line.",
    "- Use a second-level H2 header '## Email Body' for the main email body copy.",
    "Rules:",
    "- Cover every single provided key point accurately without omitting any.",
    "- Reflect the specified tone and urgency level naturally in the writing style.",
    "- Seamlessly incorporate the Call-to-Action (CTA).",
    "- Never invent facts, contact details, links, or sender identities not provided in the input.",
    "- Do not include placeholders like '[Your Name]' or '[Signature]'.",
    "- Do not output conversational preambles or commentary outside the markdown sections.",
  ].join(" ");

  const userPrompt = [
    `Draft a professional email based on the following specifications:`,
    `- Purpose: ${purpose}`,
    `- Recipient Context: ${recipient_context}`,
    `- Tone: ${tone}`,
    `- Urgency Level: ${urgency}`,
    `- Call to Action: ${cta}`,
    `- Key Points to Include:`,
    ...key_points.map((p, i) => `  ${i + 1}. ${p}`),
    ``,
    `Format your response with clear markdown headers:`,
    `# Subject: <Concise, engaging subject line>`,
    ``,
    `## Email Body`,
    `<Well-formatted email body with paragraphs>`,
  ].join("\n");

  return { systemPrompt, userPrompt };
}

export function buildSocialMediaPrompt(
  request: Extract<GenerateRequest, { content_type: "social_media" }>,
): { systemPrompt: string; userPrompt: string } {
  const { product_service, platform, goal, tone, cta } = request.parameters;
  const isX = platform === "X";

  const systemPrompt = [
    "You are Ghostwriter, a viral social media strategist and content creator.",
    `Your objective is to produce platform-native, highly engaging social posts tailored specifically for ${platform}.`,
    "Format your response with clear Markdown headers to define section boundaries:",
    "- Use a second-level H2 header '## Post' for the main post content.",
    "- Use a second-level H2 header '## Hashtags' for the hashtags list.",
    "Rules:",
    `- Follow formatting, hook style, and spacing conventions of ${platform}.`,
    "- Place all hashtags strictly under the '## Hashtags' section header; never embed hashtags inside the post body.",
    isX
      ? "- STRICT CONSTRAINT FOR X: The combined character count of the post body and all space-separated hashtags MUST NOT exceed 280 characters."
      : "",
    "- Naturally integrate the Goal and Call-to-Action (CTA).",
    "- Use only facts and details provided; do not invent fake claims, stats, or features.",
    "- Do not output conversational preambles or commentary outside the markdown sections.",
  ]
    .filter(Boolean)
    .join(" ");

  const userPrompt = [
    `Create a high-performing post for ${platform}:`,
    `- Product/Service Context: ${product_service}`,
    `- Goal: ${goal}`,
    `- Tone: ${tone}`,
    `- Call to Action: ${cta}`,
    isX ? `- Hard Limit: Must stay within 280 characters combined.` : "",
    ``,
    `Format your response with clear markdown headers:`,
    `## Post`,
    `<Hook and engaging body copy without hashtags>`,
    ``,
    `## Hashtags`,
    `#tag1 #tag2 #tag3`,
  ]
    .filter(Boolean)
    .join("\n");

  return { systemPrompt, userPrompt };
}

export function buildStoryPrompt(
  request: Extract<GenerateRequest, { content_type: "story" }>,
): { systemPrompt: string; userPrompt: string } {
  const {
    genre,
    setting,
    characters,
    length_words,
    style,
    target_audience,
    mood,
  } = request.parameters;
  const minWords = Math.floor(length_words * 0.9);
  const maxWords = Math.ceil(length_words * 1.1);

  const characterDescriptions = characters.map(
    (c, i) => `  ${i + 1}. ${c.name} (${c.role}): ${c.description}`,
  );

  const systemPrompt = [
    "You are Ghostwriter, an acclaimed fiction author and narrative architect.",
    "Your objective is to craft complete, immersive short stories with compelling exposition, rising action, climax, and satisfying resolution.",
    "Format your response with clear Markdown headers to define titles and narrative section boundaries:",
    "- Use a top-level H1 header '# <Title>' for the story title.",
    "- Use second-level H2 headers '## <Section Name>' (such as '## Introduction', '## Rising Action', '## Climax', '## Resolution') to define narrative section boundaries.",
    "Rules:",
    `- Target length: Approximately ${length_words} words. The story MUST fall strictly within the ${minWords} to ${maxWords} word range (±10%).`,
    "- Actively include and meaningfully feature EVERY listed character by their exact name.",
    "- Ground the scene deeply in the specified setting.",
    "- Adhere closely to the requested genre, style, target audience, and mood.",
    "- Do not end abruptly; complete the narrative arc fully.",
    "- Do not output conversational preambles or commentary outside the markdown sections.",
  ].join(" ");

  const userPrompt = [
    `Write a complete short story adhering to these creative constraints:`,
    `- Genre: ${genre}`,
    `- Setting: ${setting}`,
    `- Tone / Mood: ${mood}`,
    `- Narrative Style: ${style}`,
    `- Target Audience: ${target_audience}`,
    `- Target Word Count: ${length_words} words (strict range: ${minWords}–${maxWords} words)`,
    `- Characters to Feature:`,
    ...characterDescriptions,
    ``,
    `Format your response with clear markdown headers:`,
    `# <Evocative, genre-appropriate title>`,
    ``,
    `## Introduction`,
    `<Opening narrative scene establishing setting and characters...>`,
    ``,
    `## Narrative Development`,
    `<Rising action, scene progression, and character interaction...>`,
    ``,
    `## Climax & Resolution`,
    `<Dramatic turning point and complete resolution...>`,
  ].join("\n");

  return { systemPrompt, userPrompt };
}

export function buildRunpodInput(
  request: GenerateRequest,
): RunpodVllmInput {
  switch (request.content_type) {
    case "email": {
      const { systemPrompt, userPrompt } = buildEmailPrompt(request);
      return {
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
        sampling_params: {
          temperature: 0,
          max_tokens: 600,
        },
      };
    }

    case "social_media": {
      const { systemPrompt, userPrompt } = buildSocialMediaPrompt(request);
      return {
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
        sampling_params: {
          temperature: 0,
          max_tokens: 300,
        },
      };
    }

    case "story": {
      const { systemPrompt, userPrompt } = buildStoryPrompt(request);
      return {
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
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
}

export function buildRunpodRetryInput(
  request: GenerateRequest,
  issues: QualityIssue[],
): RunpodVllmInput {
  const originalInput = buildRunpodInput(request);
  const issueCodes = new Set(issues.map((issue) => issue.code));

  const corrections = [
    "The previous generation failed automated quality validation.",
    "Generate a completely new response.",
    "Format your response with clear Markdown headers (# for title/subject and ## for section headings).",
  ];

  if (
    request.content_type === "story" &&
    issueCodes.has("STORY_WORD_COUNT_OUT_OF_RANGE")
  ) {
    const minimumWords = Math.floor(request.parameters.length_words * 0.9);
    const maximumWords = Math.ceil(request.parameters.length_words * 1.1);

    corrections.push(
      `CRITICAL: The story must contain between ${minimumWords} and ${maximumWords} words.`,
      `Target approximately ${request.parameters.length_words} words.`,
      "Do not exceed the maximum word count.",
      "Prefer a slightly shorter story over exceeding the limit.",
      "Keep pacing concise and avoid unnecessary description or repeated dialogue.",
      "Plan the climax and ending early enough to provide a complete resolution within the allowed range.",
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
      `CRITICAL: You must explicitly mention and include EVERY required character by name: ${characterNames}.`,
    );
  }

  if (
    request.content_type === "social_media" &&
    issueCodes.has("X_CHARACTER_LIMIT_EXCEEDED")
  ) {
    corrections.push(
      "CRITICAL: The combined X post body and space-separated hashtags MUST NOT exceed 280 characters.",
      "Shorten the post text before returning it.",
    );
  }

  if (
    request.content_type === "social_media" &&
    issueCodes.has("HASHTAG_IN_POST_BODY")
  ) {
    corrections.push(
      "CRITICAL: Remove every hashtag from post_body and place hashtags strictly under the '## Hashtags' header.",
    );
  }

  if (issueCodes.has("INAPPROPRIATE_CONTENT_DETECTED")) {
    corrections.push(
      "CRITICAL: Ensure the content is completely professional, safe, and appropriate for the intended audience.",
    );
  }

  const existingSystemPrompt = originalInput.messages[0].content;

  return {
    ...originalInput,
    messages: [
      {
        role: "system",
        content: `${existingSystemPrompt} ${corrections.join(" ")}`,
      },
      originalInput.messages[1],
    ],
  };
}