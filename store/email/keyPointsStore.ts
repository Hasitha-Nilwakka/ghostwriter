import { z } from 'zod'
import { create } from 'zustand'

const keyPointSchema = z.string().trim().min(5, 'point must have atleast 5 characters').max(150)

export const keyPointObjectSchema = z.object({
    uuid : z.uuid(),
    key_point :  keyPointSchema,
})

export type KeyPointSchema = z.infer<typeof keyPointObjectSchema>
export type KeyPoint = z.infer<typeof keyPointSchema>


interface KeyPointState {
    keyPoints : KeyPointSchema[]
    addKeyPoint : (text : string) => void
    removeKeyPoint : (id : string) => void
    clearKeyPoints: () => void
}

export const useKeyPointStore = create<KeyPointState>((set) => ({
    keyPoints : [],
    addKeyPoint : (text) => 
        set((state) => ({
            keyPoints : [...state.keyPoints, { uuid : crypto.randomUUID() , key_point :text }]
        })),
    removeKeyPoint : (id) =>
        set((state) => ({
            keyPoints: state.keyPoints.filter(k => k.uuid !== id)
        })),
    clearKeyPoints: () => set({ keyPoints: [] })
})) 