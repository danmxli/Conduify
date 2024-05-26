import { AppDispatch } from "@/lib/store"
import { useAppDispatch } from "@/lib/hooks"
import { updateNewSessionPhase } from "@/lib/features/dashboardSlice"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const TargetJobs = (): JSX.Element => {
    const dispatch = useAppDispatch<AppDispatch>();
    return (
        <Card>
            <CardHeader>
                <CardTitle>Select Your Target</CardTitle>
                <CardDescription>
                    Target specific companies and positions to practice for.
                </CardDescription>
            </CardHeader>
            <CardContent>
                TODO
            </CardContent>
            <CardFooter className="flex justify-between">
                <Button
                    onClick={() => {
                        dispatch(updateNewSessionPhase('configInterview'))
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
                    Finish setup
                </Button>
            </CardFooter>
        </Card>
    )
}

export default TargetJobs