import {create} from 'zustand'

export enum currentStep {
    'step1',
    'step2',
    'step3'
}

type stepType = {
    currentStage : currentStep,
    setCurrentStep : (step : currentStep) => void
}

export const useCurrentStepStore = create<stepType>((set) => ({
    currentStage : currentStep.step1,
    setCurrentStep : (step : currentStep) => set({currentStage : step})
}))