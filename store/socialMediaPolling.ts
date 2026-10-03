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

let currentSocialPollId = 0

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

    reset: () => {
        currentSocialPollId++
        set({
            request: null,
            jobId: null,
            status: "idle",
            attempt: 0,
            result: null,
            error: null
        })
    }
}))

export async function poll() {
    const {
        jobId,
        request,
        attempt
    } = useSocialMediaPollingStore.getState()

    if (!jobId) {
        return null
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
    const pollId = ++currentSocialPollId
    const pollIntervalMs = 2000
    const maxAttempts = 150
    let consecutiveErrors = 0

    for (let i = 0; i < maxAttempts; i++) {
        await new Promise((resolve) =>
            setTimeout(resolve, pollIntervalMs)
        )

        // Cancel if a newer polling loop was launched
        if (pollId !== currentSocialPollId) return

        const currentState = useSocialMediaPollingStore.getState()
        // If already completed or reset, exit immediately
        if (currentState.status === "completed") return
        if (!currentState.jobId || currentState.status === "idle") return

        try {
            const data = await poll()

            if (pollId !== currentSocialPollId) return

            if (!data) {
                consecutiveErrors++
                if (consecutiveErrors >= 5) {
                    useSocialMediaPollingStore
                        .getState()
                        .setError(
                            "No response received while polling"
                        )
                    return
                }
                continue
            }

            consecutiveErrors = 0

            const terminalFailure = [
                "FAILED",
                "CANCELLED",
                "TIMED_OUT"
            ].includes(data.status)

            if (terminalFailure) {
                if (pollId !== currentSocialPollId) return
                const message =
                    data.status === "TIMED_OUT"
                        ? "The generation request timed out while waiting for the AI service. Please try again."
                        : data.status === "CANCELLED"
                        ? "The generation request was cancelled. Please try again."
                        : "The AI service was unable to complete your social post request. Please try again."

                useSocialMediaPollingStore
                    .getState()
                    .setError(message)

                return
            }

            if (data.status === "COMPLETED") {
                if (pollId !== currentSocialPollId) return

                if (
                    data.canRetry &&
                    data.quality?.issues?.length
                ) {
                    const retryJob = await submitRetry(
                        data.quality.issues
                    )

                    if (pollId !== currentSocialPollId) return

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

                    // Reset counter for the retry job so it gets its own full timeout window
                    i = 0
                    continue
                }

                useSocialMediaPollingStore
                    .getState()
                    .setResult(data.result)

                return
            }
        } catch (error) {
            if (pollId !== currentSocialPollId) return
            if (useSocialMediaPollingStore.getState().status === "completed") return

            consecutiveErrors++
            console.error(
                `Social media polling error (attempt ${consecutiveErrors}/5):`,
                error
            )

            if (consecutiveErrors >= 5) {
                useSocialMediaPollingStore
                    .getState()
                    .setError(
                        "An error occurred while checking the generated social media post"
                    )
                return
            }
        }
    }

    if (pollId !== currentSocialPollId) return
    if (useSocialMediaPollingStore.getState().status === "completed") return

    useSocialMediaPollingStore
        .getState()
        .setError(
            "The generation request timed out. Please try again."
        )
}
