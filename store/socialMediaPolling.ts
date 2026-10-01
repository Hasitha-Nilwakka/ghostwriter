import { GenerateRequest } from "@/schema/contentTypeSchema"
import { SocialMediaOutput } from "@/schema/generatedContentSchema"
import axios from "axios"
import { create } from "zustand"

type JobStatus =
    | "submitting"
    | "polling"
    | "idle"
    | "failed"
    | "completed"

interface SocialMediaPollingStore {
    request: GenerateRequest | null
    jobId: string | null
    status: JobStatus
    attempt: 0 | 1
    result: SocialMediaOutput | null
    error: string | null

    setRequest: (request: GenerateRequest) => void
    startJob: (jobId: string) => void
    setAttempt: (attempt: 0 | 1) => void
    setStatus: (status: JobStatus) => void
    setResult: (result: SocialMediaOutput) => void
    setError: (error: string) => void
    reset: () => void
}

export const useSocialMediaPollingStore = create<SocialMediaPollingStore>((set) => ({
    request: null,
    jobId: null,
    status: "idle",
    attempt: 0,
    result: null,
    error: null,

    setRequest: (request) =>
        set({
            request,
            status: "submitting"
        }),

    startJob: (jobId) =>
        set({
            jobId,
            status: "polling"
        }),

    setAttempt: (attempt) =>
        set({
            attempt
        }),

    setStatus: (status) =>
        set({
            status
        }),

    setResult: (result) =>
        set({
            result,
            status: "completed",
            error: null
        }),

    setError: (error) =>
        set({
            error,
            status: "failed"
        }),

    reset: () =>
        set({
            request: null,
            jobId: null,
            status: "idle",
            attempt: 0,
            result: null,
            error: null
        })
}))

export async function poll() {
    const {
        jobId,
        request,
        attempt
    } = useSocialMediaPollingStore.getState()

    if (!jobId) {
        throw new Error("No job ID available")
    }

    const response = await axios.post(
        `/api/status/${jobId}`,
        {
            request,
            attempt
        }
    )

    return response.data
}

async function submitRetry(
    issues: {
        code: string
        message: string
    }[]
) {
    const { request } = useSocialMediaPollingStore.getState()

    if (!request) {
        return null
    }

    const response = await axios.post(
        '/api/retry',
        {
            request,
            issues
        }
    )

    return response.data
}

export async function startPolling() {
    const pollIntervalMs = 2000
    const maxAttempts = 100

    for (let i = 0; i < maxAttempts; i++) {
        await new Promise((resolve) =>
            setTimeout(resolve, pollIntervalMs)
        )

        try {
            const data = await poll()

            if (!data) {
                useSocialMediaPollingStore
                    .getState()
                    .setError(
                        "No response received while polling"
                    )

                return
            }

            const terminalFailure = [
                "FAILED",
                "CANCELLED",
                "TIMED_OUT"
            ].includes(data.status)

            if (terminalFailure) {
                useSocialMediaPollingStore
                    .getState()
                    .setError(
                        `Job ended with status: ${data.status}`
                    )

                return
            }

            if (data.status === "COMPLETED") {
                if (
                    data.canRetry &&
                    data.quality?.issues?.length
                ) {
                    const retryJob = await submitRetry(
                        data.quality.issues
                    )

                    if (!retryJob) {
                        useSocialMediaPollingStore
                            .getState()
                            .setError(
                                "Retry could not be submitted"
                            )

                        return
                    }

                    useSocialMediaPollingStore.setState({
                        jobId: retryJob.jobId,
                        attempt: 1,
                        status: "polling"
                    })

                    continue
                }

                useSocialMediaPollingStore
                    .getState()
                    .setResult(data.result)

                return
            }
        } catch (error) {
            console.error(
                "Polling error:",
                error
            )

            useSocialMediaPollingStore
                .getState()
                .setError(
                    "An error occurred while checking the generated social media post"
                )

            return
        }
    }

    useSocialMediaPollingStore
        .getState()
        .setError(
            "Polling timed out"
        )
}
