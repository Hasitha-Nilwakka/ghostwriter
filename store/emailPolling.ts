import { GenerateRequest } from "@/schema/contentTypeSchema"
import { EmailOutput } from "@/schema/generatedContentSchema"
import axios from "axios"
import { create } from "zustand"

type JobStatus =
    | "submitting"
    | "polling"
    | "idle"
    | "failed"
    | "completed"

interface EmailPollingStore {
    request: GenerateRequest | null
    jobId: string | null
    status: JobStatus
    attempt: 0 | 1
    result: EmailOutput | null
    error: string | null

    setRequest: (request: GenerateRequest) => void
    startJob: (jobId: string) => void
    setAttempt: (attempt: 0 | 1) => void
    setStatus: (status: JobStatus) => void
    setResult: (result: EmailOutput) => void
    setError: (error: string) => void
    reset: () => void
}

let currentEmailPollId = 0

export const useEmailPollingStore = create<EmailPollingStore>((set) => ({
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
        currentEmailPollId++
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
    } = useEmailPollingStore.getState()

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
    const { request } = useEmailPollingStore.getState()

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
    const pollId = ++currentEmailPollId
    const pollIntervalMs = 2000
    const maxAttempts = 150
    let consecutiveErrors = 0

    for (let i = 0; i < maxAttempts; i++) {
        await new Promise(resolve =>
            setTimeout(resolve, pollIntervalMs)
        )

        // Cancel if a newer polling loop was launched
        if (pollId !== currentEmailPollId) return

        const currentState = useEmailPollingStore.getState()
        // If already completed or reset, exit immediately
        if (currentState.status === "completed") return
        if (!currentState.jobId || currentState.status === "idle") return

        try {
            const data = await poll()

            if (pollId !== currentEmailPollId) return

            if (!data) {
                consecutiveErrors++
                if (consecutiveErrors >= 5) {
                    useEmailPollingStore
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
                if (pollId !== currentEmailPollId) return
                const message =
                    data.status === "TIMED_OUT"
                        ? "The generation request timed out while waiting for the AI service. Please try again."
                        : data.status === "CANCELLED"
                        ? "The generation request was cancelled. Please try again."
                        : "The AI service was unable to complete your email request. Please try again."

                useEmailPollingStore
                    .getState()
                    .setError(message)

                return
            }

            if (data.status === "COMPLETED") {
                if (pollId !== currentEmailPollId) return

                if (
                    data.canRetry &&
                    data.quality?.issues?.length
                ) {
                    const retryJob = await submitRetry(
                        data.quality.issues
                    )

                    if (pollId !== currentEmailPollId) return

                    if (!retryJob) {
                        useEmailPollingStore
                            .getState()
                            .setError(
                                "Retry could not be submitted"
                            )

                        return
                    }

                    useEmailPollingStore.setState({
                        jobId: retryJob.jobId,
                        attempt: 1,
                        status: "polling"
                    })

                    // Reset counter for the retry job so it gets its own full timeout window
                    i = 0
                    continue
                }

                useEmailPollingStore
                    .getState()
                    .setResult(data.result)

                return
            }

        } catch (error) {
            if (pollId !== currentEmailPollId) return
            if (useEmailPollingStore.getState().status === "completed") return

            consecutiveErrors++
            console.error(
                `Email polling error (attempt ${consecutiveErrors}/5):`,
                error
            )

            if (consecutiveErrors >= 5) {
                useEmailPollingStore
                    .getState()
                    .setError(
                        "An error occurred while checking the generated email"
                    )
                return
            }
        }
    }

    if (pollId !== currentEmailPollId) return
    if (useEmailPollingStore.getState().status === "completed") return

    useEmailPollingStore
        .getState()
        .setError(
            "The generation request timed out. Please try again."
        )
}