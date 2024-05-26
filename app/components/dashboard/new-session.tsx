import { RootState } from "@/lib/store"
import { useAppSelector } from "@/lib/hooks"
import UploadResume from "./session-setup/upload-resume"
import ConfigInterview from "./session-setup/config-interview"
import TargetJobs from "./session-setup/target-jobs"

const NewSession = (): JSX.Element => {

    const newSessionPhase = useAppSelector((state: RootState) => state.dashboard.newSessionPhase)

    interface newSessionPhases {
        [key: string]: React.ReactNode;
    }

    const sessionSetup: newSessionPhases = {
        uploadResume: <UploadResume />,
        configInterview: <ConfigInterview />,
        targetJobs: <TargetJobs />
    }

    return (
        <main className="h-screen w-full flex items-center justify-center">
            {sessionSetup[newSessionPhase]}
        </main>
    )
}

export default NewSession