import { z } from "zod";

import { generateRequestSchema } from "@/schema/contentTypeSchema";
import { buildRunpodRetryInput } from "@/lib/ghostwriter/prompts";
import { submitRunpodJob } from "@/lib/ghostwriter/runpod";

const retryRequestSchema = z.strictObject({
  request: generateRequestSchema,
  issues: z.array(
    z.strictObject({
      code: z.enum([
        "HASHTAG_IN_POST_BODY",
        "X_CHARACTER_LIMIT_EXCEEDED",
        "STORY_WORD_COUNT_OUT_OF_RANGE",
        "STORY_CHARACTER_MISSING",
      ]),
      message: z.string(),
    }),
  ).min(1),
});

export const runtime = "nodejs";

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return Response.json(
      {
        error: {
          code: "INVALID_JSON",
          message: "The request body must be valid JSON.",
        },
      },
      { status: 400 },
    );
  }

  const validation = retryRequestSchema.safeParse(body);

  if (!validation.success) {
    return Response.json(
      {
        error: {
          code: "INVALID_REQUEST",
          message: "The retry request is invalid.",
          issues: validation.error.issues.map((issue) => ({
            path: issue.path.join("."),
            message: issue.message,
          })),
        },
      },
      { status: 400 },
    );
  }

  try {
    const runpodInput = buildRunpodRetryInput(
      validation.data.request,
      validation.data.issues,
    );

    const job = await submitRunpodJob(runpodInput);

    return Response.json(
      {
        jobId: job.id,
        status: job.status,
        contentType: validation.data.request.content_type,
        attempt: 1,
      },
      { status: 202 },
    );
  } catch (error) {
    console.error("Failed to submit RunPod retry job:", error);

    return Response.json(
      {
        error: {
          code: "RUNPOD_RETRY_FAILED",
          message: "The retry generation job could not be started.",
        },
      },
      { status: 502 },
    );
  }
}