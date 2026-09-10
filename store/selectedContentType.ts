"use client"
import {create} from 'zustand'

export enum contentType {
    'email', 
    'social_media',
    'story'
}

type contentStoreType = {
    selectedContent : contentType | null,
    setContentType : (content : contentType) => void,
    resetContentType : () => void
}

export const useContentTypeStore = create<contentStoreType>((set) => ({
    selectedContent : null,
    setContentType : (content) => set({selectedContent : content}),
    resetContentType : () => set({selectedContent : null})
}))
