import { GenerateRequest } from "@/schema/contentTypeSchema"
import { StoryOutput } from "@/schema/generatedContentSchema"
import { StoryConfigSchema } from "@/schema/storyConfigSchema"
import axios from "axios"
import { create } from "zustand"

type JobStatus =
    | "submitting"
    | "polling"
    | "idle"
    | "failed"
    | "completed"

interface StoryPollingStore {
    formData: StoryConfigSchema | null
    request: GenerateRequest | null
    jobId: string | null
    status: JobStatus
    attempt: 0 | 1
    result: StoryOutput | null
    error: string | null

    setFormData: (formData: StoryConfigSchema | null) => void
    setRequest: (request: GenerateRequest) => void
    startJob: (jobId: string) => void
    setAttempt: (attempt: 0 | 1) => void
    setStatus: (status: JobStatus) => void
    setResult: (result: StoryOutput) => void
    setError: (error: string) => void
    reset: () => void
}

let currentStoryPollId = 0

export const useStoryPollingStore = create<StoryPollingStore>((set) => ({
    formData: null,
    request: null,
    jobId: null,
    status: "idle",
    attempt: 0,
    result: null,
    error: null,

    setFormData: (formData) =>
        set({
            formData
        }),

    setRequest: (request) =>
        set({
            request,
            result: null,
            error: null,
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
        currentStoryPollId++
        set({
            formData: null,
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
    } = useStoryPollingStore.getState()

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
    const { request } = useStoryPollingStore.getState()

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
    const pollId = ++currentStoryPollId
    const pollIntervalMs = 2000
    const maxAttempts = 180
    let consecutiveErrors = 0

    for (let i = 0; i < maxAttempts; i++) {
        await new Promise((resolve) =>
            setTimeout(resolve, pollIntervalMs)
        )

        // Cancel if a newer polling loop was launched
        if (pollId !== currentStoryPollId) return

        const currentState = useStoryPollingStore.getState()
        // If already completed or reset, exit immediately
        if (currentState.status === "completed") return
        if (!currentState.jobId || currentState.status === "idle") return

        try {
            const data = await poll()

            if (pollId !== currentStoryPollId) return

            if (!data) {
                consecutiveErrors++
                if (consecutiveErrors >= 5) {
                    useStoryPollingStore
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
                if (pollId !== currentStoryPollId) return
                const message =
                    data.status === "TIMED_OUT"
                        ? "The generation request timed out while waiting for the AI service. Please try again."
                        : data.status === "CANCELLED"
                        ? "The generation request was cancelled. Please try again."
                        : "The AI service was unable to complete your story request. Please try again."

                useStoryPollingStore
                    .getState()
                    .setError(message)

                return
            }

            if (data.status === "COMPLETED") {
                if (pollId !== currentStoryPollId) return

                if (
                    data.canRetry &&
                    data.quality?.issues?.length
                ) {
                    const retryJob = await submitRetry(
                        data.quality.issues
                    )

                    if (pollId !== currentStoryPollId) return

                    if (!retryJob) {
                        useStoryPollingStore
                            .getState()
                            .setError(
                                "Retry could not be submitted"
                            )

                        return
                    }

                    useStoryPollingStore.setState({
                        jobId: retryJob.jobId,
                        attempt: 1,
                        status: "polling"
                    })

                    // Reset counter for the retry job so it gets its own full timeout window
                    i = 0
                    continue
                }

                useStoryPollingStore
                    .getState()
                    .setResult(data.result)

                return
            }
        } catch (error) {
            if (pollId !== currentStoryPollId) return
            if (useStoryPollingStore.getState().status === "completed") return

            consecutiveErrors++
            console.error(
                `Story polling error (attempt ${consecutiveErrors}/5):`,
                error
            )

            if (consecutiveErrors >= 5) {
                useStoryPollingStore
                    .getState()
                    .setError(
                        "An error occurred while checking the generated story"
                    )
                return
            }
        }
    }

    if (pollId !== currentStoryPollId) return
    if (useStoryPollingStore.getState().status === "completed") return

    useStoryPollingStore
        .getState()
        .setError(
            "The generation request timed out. Please try again."
        )
}
