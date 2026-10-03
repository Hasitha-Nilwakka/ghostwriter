import { GenerateRequest } from "@/schema/contentTypeSchema"
import { StoryConfigSchema } from "@/schema/storyConfigSchema"
import { startPolling, useStoryPollingStore } from "@/store/storyPolling"
import { useMutation } from "@tanstack/react-query"
import axios from "axios"

export const useGenerateStory = () => {
    const { setRequest, startJob } = useStoryPollingStore()

    return useMutation({
        mutationFn: async (data: StoryConfigSchema) => {
            const requestData: GenerateRequest = {
                content_type: "story",
                parameters: {
                    genre: Array.isArray(data.genre) ? data.genre.join(", ") : data.genre,
                    characters: data.characters.map((c) => ({
                        name: c.name.trim(),
                        role: c.role.trim(),
                        description: c.description.trim()
                    })),
                    setting: data.setting.trim(),
                    length_words: Number(data.length_words),
                    style: Array.isArray(data.style) ? data.style.join(", ") : data.style,
                    target_audience: Array.isArray(data.target_audience) ? data.target_audience.join(", ") : data.target_audience,
                    mood: Array.isArray(data.mood) ? data.mood.join(", ") : data.mood
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
            console.log("Story generation request sent")
        },
        onError: (error) => {
            console.error("Story generation request failed:", error)
            useStoryPollingStore.getState().setError(
                "Unable to start the generation job. Please check your network connection and try again."
            )
        }
    })
}
