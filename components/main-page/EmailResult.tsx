import { useEmailPollingStore } from "@/store/emailPolling"
import { Ghost } from "lucide-react"
import { FaGhost } from "react-icons/fa6"
import { Spinner } from "../ui/spinner"
import { VscVmPending } from "react-icons/vsc";
import { GoGitPullRequest } from "react-icons/go";

export default function EmailResult() {
    const {status, result} = useEmailPollingStore()

    return (
        <div className="flex flex-1 border-4">
            <div>
                <div className="p-5 flex gap-3">
                    <Ghost 
                        className="
                        text-gray-400
                        animate-heartbeat animate-duration-2000 animate-iteration-count-infinite animate-fill-mode-both"
                    />
                    <p className="text-light-text-background">
                        Ghost received your request
                    </p>
                </div>

                <div className="p-5 flex gap-3 items-center">
                    <Spinner/>
                    <VscVmPending/>
                    <p className="text-light-text-background">
                        Request in que
                    </p>
                </div>

                <div className="p-5 flex gap-3 items-center">
                    <Spinner/>
                    <GoGitPullRequest/>
                    <p className="text-light-text-background">
                        Polling the status
                    </p>
                </div>

                <div className="p-5 flex gap-3 items-center">
                    <Spinner/>
                    <p className="text-light-text-background">
                        content validating
                    </p>
                </div>

                <div className="p-5 flex gap-3 items-center">
                    <Spinner/>
                    <p className="text-light-text-background animate-pulse">
                        Validation failed. Sending retry
                    </p>
                </div>

                <div className="p-5 flex gap-3 items-center">
                    <Spinner/>
                    <p className="text-light-text-background animate-pulse">
                        Validation passed, content accepted
                    </p>
                </div>

                <p>{status}</p>
                <p>Generating content</p>
                <p>Checking status</p>
                <p>if good</p>
                {status === 'completed' && result && (
                    <div>
                        <p>{result.subject}</p>
                        <p>{result.body}</p>
                    </div>
                )}
            </div>
        </div>
    )
}