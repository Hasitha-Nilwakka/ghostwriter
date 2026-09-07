import { z } from "zod";

import { parseGeneratedContent } from "@/lib/ghostwriter/generatedOutput";
import { validateGeneratedContent } from "@/lib/ghostwriter/qualityValidation";
import { getRunpodJobStatus } from "@/lib/ghostwriter/runpod";
import { generateRequestSchema } from "@/schema/contentTypeSchema";

const statusRequestSchema = z.strictObject({
  request: generateRequestSchema,
  attempt: z.union([z.literal(0), z.literal(1)]),
});

export const runtime = "nodejs";

type RouteContext = {
  params: Promise<{
    jobId: string;
  }>;
};

export async function POST(
  request: Request,
  context: RouteContext,
) {
  const { jobId } = await context.params;

  if (!jobId.trim()) {
    return Response.json(
      {
        error: {
          code: "INVALID_JOB_ID",
          message: "A job ID is required.",
        },
      },
      { status: 400 },
    );
  }

  let requestBody: unknown;

  try {
    requestBody = await request.json();
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

  const statusValidation =
    statusRequestSchema.safeParse(requestBody);

  if (!statusValidation.success) {
    return Response.json(
      {
        error: {
          code: "INVALID_REQUEST",
          message: "The status request is invalid.",
          issues: statusValidation.error.issues.map((issue) => ({
            path: issue.path.join("."),
            message: issue.message,
          })),
        },
      },
      { status: 400 },
    );
  }

  const originalRequest = statusValidation.data.request;
  const attempt = statusValidation.data.attempt;

  let job;

  try {
    job = await getRunpodJobStatus(jobId);
  } catch (error) {
    console.error("RunPod status retrieval failed:", error);

    return Response.json(
      {
        error: {
          code: "RUNPOD_STATUS_FAILED",
          message: "The job status could not be retrieved.",
        },
      },
      { status: 502 },
    );
  }

  const jobDetails = {
    jobId: job.id,
    status: job.status,
    contentType: originalRequest.content_type,
    attempt,
    delayTime: job.delayTime ?? null,
    executionTime: job.executionTime ?? null,
  };

  if (job.status !== "COMPLETED") {
    const terminalFailure =
      job.status === "FAILED" ||
      job.status === "CANCELLED" ||
      job.status === "TIMED_OUT";

    return Response.json({
      ...jobDetails,
      result: null,
      quality: null,
      canRetry: terminalFailure && attempt === 0,
    });
  }

  try {
    const result = parseGeneratedContent(
      originalRequest.content_type,
      job.output,
    );

    const quality = validateGeneratedContent(
      originalRequest,
      result,
    );

    return Response.json({
      ...jobDetails,
      result,
      quality,
      canRetry: !quality.valid && attempt === 0,
    });
  } catch (error) {
    console.error("Invalid model output:", error);

    return Response.json(
      {
        ...jobDetails,
        result: null,
        quality: null,
        canRetry: attempt === 0,
        error: {
          code: "INVALID_MODEL_OUTPUT",
          message:
            "The model returned an invalid generation result.",
        },
      },
      { status: 502 },
    );
  }
}