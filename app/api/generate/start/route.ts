import { generateRequestSchema } from "@/schema/contentTypeSchema";
import { buildRunpodInput } from "@/lib/ghostwriter/prompts";
import { submitRunpodJob } from "@/lib/ghostwriter/runpod";

export const runtime = "nodejs"

export async function POST(request : Request) {
    let body : unknown

    try {
        body = await request.json()
    } catch {
        return Response.json(
            {
                error : {
                    code : 'INVALID_JSON',
                    message : 'The request body must be valid JSON.'
                },

            },
            {status : 400}
        )
    }

    const validation = generateRequestSchema.safeParse(body)

    if (!validation.success) {
        return Response.json(
            {
                error : {
                    code : "INVALID_REQUEST",
                    message : 'The generation request is invalid.',
                    issues : validation.error.issues.map((issue) => ({
                        path : issue.path.join('.'),
                        message : issue.message
                    }))
                }
            },
            {status : 400}
        )
    }

    try {
        const runpodInput = buildRunpodInput(validation.data);
        const job = await submitRunpodJob(runpodInput);

        return Response.json(
            {
            jobId: job.id,
            status: job.status,
            contentType : validation.data.content_type
            },
            {
            status: 202,
            },
        );
    } catch (error) {
        console.error("Failed to submit RunPod job:", error);

        return Response.json(
            {
            error: {
                code: "RUNPOD_SUBMISSION_FAILED",
                message: "The generation job could not be started.",
            },
            },
            {
            status: 502,
            },
        );
    }
}