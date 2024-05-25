import { RootState } from "@/lib/store"
import { useAppSelector } from "@/lib/hooks"
import { useAppDispatch } from '@/lib/hooks';
import { AppDispatch } from '@/lib/store';
import { updateNavPhase } from "@/lib/features/dashboardSlice";

import { Button } from "@/components/ui/button"
import { SquarePlus, Bot } from "lucide-react"

const DashboardNav = (): JSX.Element => {

    const dispatch = useAppDispatch<AppDispatch>();
    const navPhase = useAppSelector((state: RootState) => state.dashboard.navPhase)

    const toggleOptions = [
        { icon: SquarePlus, label: "New Session", phase: "newSession" },
        { icon: Bot, label: "Explore Agents", phase: "explore" }
    ]

    return (
        <>
            <div className="flex flex-col gap-1 pb-2 border-b">
                {toggleOptions.map((option, index) => {
                    const Icon = option.icon
                    return (
                        <Button
                            key={index}
                            onClick={() => dispatch(updateNavPhase(option.phase))}
                            variant={navPhase === option.phase ? "default" : "ghost"}
                            className="justify-start"
                        >
                            <Icon className="mr-2 h-4 w-4" />
                            {option.label}
                        </Button>
                    )
                })}
            </div>

            <div className="flex flex-grow">

            </div>
        </>
    )
}

export default DashboardNav