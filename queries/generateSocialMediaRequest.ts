import { GenerateRequest } from "@/schema/contentTypeSchema"
import { SocialMediaConfigSchema } from "@/schema/socialConfigSchema"
import { startPolling, useSocialMediaPollingStore } from "@/store/socialMediaPolling"
import { useMutation } from "@tanstack/react-query"
import axios from "axios"

export const useGenerateSocial = () => {
    const { setRequest, startJob } = useSocialMediaPollingStore()

    return useMutation({
        mutationFn: async (data: SocialMediaConfigSchema) => {
            const requestData: GenerateRequest = {
                content_type: 'social_media',
                parameters: {
                    product_service: data.product_service,
                    platform: data.platform,
                    goal: data.goal,
                    tone: data.tone.join(", "),
                    cta: data.cta
                }
            }

            const response = await axios.post<{ jobId: string; status: string }>(
                '/api/start',
                requestData
            )

            setRequest(requestData)
            startJob(response.data.jobId)

            return response.data
        },
        onSuccess: () => {
            startPolling()
            console.log('Request sent')
        },
        onError: (error) => {
            console.error("Social media generation request failed:", error)
            const serverMessage = axios.isAxiosError(error) && error.response?.data?.error?.message
                ? error.response.data.error.message
                : "Unable to start the generation job. Please check your network connection and try again."
            useSocialMediaPollingStore.getState().setError(serverMessage)
        }
    })
}