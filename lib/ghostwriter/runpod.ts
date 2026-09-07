import "server-only"
import { z } from 'zod'

export type RunpodMessage = {
  role: "system" | "user" | "assistant";
  content: string;
};

export type RunpodVllmInput = {
  messages: RunpodMessage[];
  sampling_params: {
    temperature: number;
    max_tokens: number;
  };
};

const runpodJobStatusSchema = z.enum([
  "IN_QUEUE",
  "IN_PROGRESS",
  "RUNNING",
  "COMPLETED",
  "FAILED",
  "CANCELLED",
  "TIMED_OUT",
]);

const runpodRunResponseSchema = z.looseObject({
    id: z.string().min(1),
    status: runpodJobStatusSchema,
  })


const runpodStatusResponseSchema = z.looseObject({
    id: z.string().min(1),
    status: runpodJobStatusSchema,
    delayTime: z.number().optional(),
    executionTime: z.number().optional(),
    output: z.unknown().optional(),
  })

export type RunpodRunResponse = z.infer<
  typeof runpodRunResponseSchema
>;

export type RunpodStatusResponse = z.infer<
  typeof runpodStatusResponseSchema
>;

function getRunpodConfig(): {
  apiKey: string;
  baseUrl: string;
} {
  const apiKey = process.env.RUNPOD_API_KEY?.trim();
  const endpointId = process.env.RUNPOD_ENDPOINT_ID?.trim();

  if (!apiKey || !endpointId) {
    throw new Error(
      "Missing RUNPOD_API_KEY or RUNPOD_ENDPOINT_ID",
    );
  }

  return {
    apiKey,
    baseUrl: `https://api.runpod.ai/v2/${endpointId}`,
  };
}

async function runpodFetch(
  path: string,
  init: RequestInit,
): Promise<unknown> {
  const { apiKey, baseUrl } = getRunpodConfig();

  const headers = new Headers(init.headers);
  headers.set("Authorization", `Bearer ${apiKey}`);
  headers.set("Accept", "application/json");
  headers.set("Content-Type", "application/json");

  const response = await fetch(`${baseUrl}${path}`, {
    ...init,
    headers,
    cache: "no-store",
    signal: AbortSignal.timeout(15_000),
  });

  if (!response.ok) {
    const responseBody = await response.text();

    throw new Error(
      `RunPod request failed with status ${response.status}: ${responseBody.slice(0, 500)}`,
    );
  }

  return (await response.json()) as unknown;
}

export async function submitRunpodJob(
  input: RunpodVllmInput,
): Promise<RunpodRunResponse> {
  const response = await runpodFetch("/run", {
    method: "POST",
    body: JSON.stringify({
      input,
    }),
  });

  return runpodRunResponseSchema.parse(response);
}

export async function getRunpodJobStatus(
  jobId: string,
): Promise<RunpodStatusResponse> {
  const normalizedJobId = jobId.trim();

  if (!normalizedJobId) {
    throw new Error("RunPod job ID is required");
  }

  const response = await runpodFetch(
    `/status/${encodeURIComponent(normalizedJobId)}`,
    {
      method: "GET",
    },
  );

  return runpodStatusResponseSchema.parse(response);
}