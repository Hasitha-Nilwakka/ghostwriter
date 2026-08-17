import { create } from 'zustand'

export type ContentType = "email" | "social_media" | "story"

interface ContentState {
    selectedContent : ContentType
    setSelectedContent : (content : ContentType) => void
    resetContent : () => void
}

export const useContentSelection = create<ContentState>((set) => ({
    selectedContent : 'email',
    setSelectedContent : (content) => set({ selectedContent: content }),
    resetContent : () => set({ selectedContent: 'email' })
}))
