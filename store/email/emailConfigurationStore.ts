import { z } from 'zod'
import { create } from 'zustand'

const keyPointSchema = z.string().trim().min(5, 'point must have atleast 5 characters').max(150)

export const keyPointObjectSchema = z.object({
    uuid : z.uuid(),
    key_point :  keyPointSchema,
})

export type KeyPointSchema = z.infer<typeof keyPointObjectSchema>

export const emailConfigurationObjectSchema = z.object({
    purpose : z.string().trim().min(10, '10 characters minimum input').max(150),
    reciientDetails : z.string().trim().min(10, '10 characters minimum input').max(150),
    keyPoints : z.array(keyPointObjectSchema).min(1, 'atleast 1 point required').max(8),
    tone : z.string().trim().min(1, 'select the tone'),
    urgency : z.enum(['low', 'normal', 'high']),
    cta : z.string().trim().min(5, 'mininmum character length of 5').max(150),
})

export type EmailConfigSchema = z.infer<typeof emailConfigurationObjectSchema>

interface EmailConfigState {
    config : EmailConfigSchema
    setFormConfig : (config : EmailConfigSchema) => void
}

export const useEmailConfigStore = create<EmailConfigState>((set) => ({
    config : {
        purpose : '',
        reciientDetails : '',
        keyPoints : [],
        tone : '',
        urgency : 'normal',
        cta : ''
    },
    setFormConfig : (config) => set({ config })
}))