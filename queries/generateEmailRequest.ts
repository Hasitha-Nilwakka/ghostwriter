import { GenerateRequest } from '@/schema/contentTypeSchema'
import { EmailConfigSchema } from '@/schema/emailConfigSchema'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'

export const useGenerateEmail = () => {
    return useMutation({
        mutationFn : async (data : EmailConfigSchema) => {
            const {recipient_name, recipient_background} = data
            const recipient_context = `recipient: ${recipient_name}, background : ${recipient_background}`
            const keyPoints : string[] = data.key_points.map(k => k.text)
            const tones = data.tone.toString()
            const requestData : GenerateRequest = {
                content_type : "email",
                parameters : {
                    purpose : data.purpose,
                    recipient_context : recipient_context,
                    key_points : keyPoints,
                    tone : tones,
                    urgency : data.urgency,
                    cta : data.cta
                }
            }

            const response = await axios.post<GenerateRequest>('/api/start', requestData)
            return response.data
        },
        onSuccess : () => {
          console.log('request sent')  
        },
        onError : (error) => {
            console.error(error)
        }
    })
}