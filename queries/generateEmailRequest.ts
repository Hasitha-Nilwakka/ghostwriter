import { GenerateRequest } from '@/schema/contentTypeSchema'
import { EmailConfigSchema } from '@/schema/emailConfigSchema'
import { startPolling, useEmailPollingStore } from '@/store/emailPolling'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'

export const useGenerateEmail = () => {
    const { setRequest, startJob, setFormData } = useEmailPollingStore()

    return useMutation({
        mutationFn: async (data: EmailConfigSchema) => {
            setFormData(data)
            const {
                recipient_name,
                recipient_background
            } = data

            const recipient_context = `recipient: ${recipient_name}, background: ${recipient_background}`

            const keyPoints: string[] = data.key_points.map(
                k => k.text
            )

            const tones = data.tone.toString()

            const requestData: GenerateRequest = {
                content_type: "email",
                parameters: {
                    purpose: data.purpose,
                    recipient_context: recipient_context,
                    key_points: keyPoints,
                    tone: tones,
                    urgency: data.urgency,
                    cta: data.cta
                }
            }

            const response = await axios.post<{
                jobId: string
                status: string
            }>('/api/start', requestData)

            setRequest(requestData)
            startJob(response.data.jobId)

            return response.data
        },

        onSuccess: () => {
            startPolling()
            console.log('request sent')
        },

        onError: (error) => {
            console.error("Email generation request failed:", error)
            const serverMessage = axios.isAxiosError(error) && error.response?.data?.error?.message
                ? error.response.data.error.message
                : "Unable to start the generation job. Please check your network connection and try again."
            useEmailPollingStore.getState().setError(serverMessage)
        }
    })
}