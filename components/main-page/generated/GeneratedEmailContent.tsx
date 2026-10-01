"use client"

import { useEmailPollingStore } from "@/store/emailPolling"
import LoadingResult from "../LoadingResult"
import { Button } from "@/components/ui/button"
import { useCurrentStepStore, currentStep } from "@/store/currentStep"

export default function GeneratedEmailContent() {
    const { result, status, error } = useEmailPollingStore()
    const { setCurrentStep } = useCurrentStepStore()

    if (status === "submitting" || status === "polling") {
        return (
            <div className="flex flex-col lg:flex-1 w-full justify-center items-center">
                <LoadingResult />
            </div>
        )
    }

    if (status === "failed") {
        return (
            <div className="flex flex-col gap-4 items-center">
                <p>{error}</p>
                <Button onClick={() => setCurrentStep(currentStep.step2)}>
                    Try Again
                </Button>
            </div>
        )
    }

    if (!result) {
        return (
            <div>
                <p>No generated email yet.</p>
            </div>
        )
    }

    return (
        <div className="flex flex-col p-2">
            <div className="flex flex-col flex-1 gap-2">
                <div>
                    <p>Ghost has generated the content</p>
                    <p>Heres your requested email</p>
                </div>
                <div className="flex flex-col gap-2">
                    <div className="flex gap-2">
                        <p>Subject :</p>
                        <p>{result.subject}</p>
                    </div>
                    <div>
                        <p className="whitespace-pre-wrap">
                            {result.body}
                        </p>
                    </div>
                </div>
            </div>
            <div>
                <Button>Back</Button>
                <Button>Reset</Button>
            </div>
        </div>
    )
}