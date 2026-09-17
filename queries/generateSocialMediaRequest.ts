import { GenerateRequest } from "@/schema/contentTypeSchema"
import { SocialMediaConfigSchema } from "@/schema/socialConfigSchema"
import { useMutation } from "@tanstack/react-query"
import axios from "axios"

export const useGenerateSocial = () => {
    return useMutation({
        mutationFn : async ( data : SocialMediaConfigSchema) => {
            const requestData : GenerateRequest = {
                content_type : 'social_media',
                parameters : {
                    product_service : data.product_service,
                    platform : data.platform,
                    goal : data.goal,
                    tone : data.tone.toString(),
                    cta : data.cta
                }
            }

            const response = await axios.post<{ jobId : string, status : string}>('/api/start', requestData)
            return response.data
        },
        onSuccess : () => {
            console.log('Request sent')
        },
        onError : (error) => {
            console.error(error)
        }   
    })
}