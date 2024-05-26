import { AppDispatch } from "@/lib/store"
import { useAppDispatch } from "@/lib/hooks"
import { updateNewSessionPhase } from "@/lib/features/dashboardSlice"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"


const ConfigInterview = (): JSX.Element => {
    const dispatch = useAppDispatch<AppDispatch>();

    return (
        <Card>
            <CardHeader>
                <CardTitle>Configure Interview Options</CardTitle>
                <CardDescription>
                    Set the scope of your interviews and choose a specialized agent.
                </CardDescription>
            </CardHeader>
            <CardContent>
                TODO
            </CardContent>
            <CardFooter className="flex justify-between">
                <Button
                    onClick={() => {
                        dispatch(updateNewSessionPhase('uploadResume'))
                    }}
                    variant="secondary"
                >
                    Go back
                </Button>
                <Button
                    onClick={() => {
                        dispatch(updateNewSessionPhase('targetJobs'))
                    }}
                >
                    Proceed with configurations
                </Button>
            </CardFooter>
        </Card>
    )
}

export default ConfigInterview