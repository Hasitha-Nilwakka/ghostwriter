import { GenerateRequest } from "@/schema/contentTypeSchema"
import { EmailOutput } from "@/schema/generatedContentSchema"
import axios from "axios"
import { create } from "zustand"

type JobStatus = "submitting" | "polling" | "idle" | "failed" | "completed"

interface EmailPollingStore {
    request : GenerateRequest | null
    jobId : string | null
    status : JobStatus
    attempt : 0 | 1
    result : EmailOutput | null
    error : string | null

    setRequest: (request: GenerateRequest) => void
    startJob: (jobId: string) => void
    setAttempt: (attempt: 0 | 1) => void
    setStatus: (status: JobStatus) => void
    reset: () => void
}

export const useEmailPollingStore = create<EmailPollingStore>((set) => ({
    request : null,
    jobId : null,
    status : "idle",
    attempt : 0,
    result : null,
    error : null,

    setRequest : (request) => set({request, status : "submitting"}),
    startJob : (jobId) => set({jobId, status : "polling"}),
    setAttempt : (attempt) => set({attempt}),
    setStatus : (status) => set({status}),
    reset : () => set({request : null, jobId : null, status : "idle", attempt : 0, result : null, error : null})
}))

export async function poll() {
    const {jobId, request, attempt} = useEmailPollingStore.getState()

    const response = await axios.post(`/api/status/${jobId}`, {
        request,
        attempt
    })

    return response.data
}

async function submitRetry(issues : {code : string; message : string}[]) {
    const request = useEmailPollingStore.getState()

    if (!request) return null

    const response = await axios.post('/api/retry', {
        request,
        issues
    })

    return response.data
}


export async function startPolling() {
    const pollIntervalMs = 2000
    const maxAttempts = 100

    for (let i = 0; i < maxAttempts; i++) {
        await new Promise(res => setTimeout(res, pollIntervalMs))

        const data = await poll()

        if (!data) return

        const terminalFailiure = ["FAILED", "CANCELLED", "TIMED_OUT"].includes(data.status)

        if (terminalFailiure) {
            useEmailPollingStore.setState({ 
                status: "failed",
                error: `Job ended with status: ${data.status}`
            })
            return
        }

        //status completed 
        if (data.status === "COMPLETED") {
            //check if the quality validation passed
            if (data.canRetry && data.quality?.issues?.length) {
                const retryJob = await submitRetry(data.quality.issues)

                if (!retryJob) {
                    useEmailPollingStore.setState({
                        status : 'failed',
                        error : 'Retry could not be submitted'
                    })
                    return
                }

                //retry issues a new job id, update the store to that job id
                //set the attempt to 1
                useEmailPollingStore.setState({
                    jobId : retryJob.jobId,
                    attempt : 1
                })

                //loop continues
                continue
            }

            //completed and validation passed
            //return data
            useEmailPollingStore.setState({
                status : 'completed',
                result : data.result
            })
            return
        }
        //loop continues
    }

    //max attempts exceeded
    useEmailPollingStore.setState({ 
        status: "failed",
        error: "Polling timed out"
    })
}