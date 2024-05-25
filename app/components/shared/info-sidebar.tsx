import React from "react"
import { RootState } from "@/lib/store"
import { useAppSelector } from "@/lib/hooks"
import UserItem from "./sidebar/user-item"
import { Button } from "../ui/button"
import { Bot } from "lucide-react"
import DashboardNav from "./sidebar/dashboard-nav"

const Sidebar = (): JSX.Element => {
    const currentPage = useAppSelector((state: RootState) => state.user.currentPage)

    interface SidebarPhases {
        [key: string]: React.ReactNode;
    }

    const sidebarContent: SidebarPhases = {
        dashboard: (
            <DashboardNav />
        ),
        user: (
            <div className="flex flex-grow">
                user
            </div>
        )
    }

    return (
        <main className="flex flex-col h-screen w-64 border-r p-2">
            {sidebarContent[currentPage]}
            <div className="flex-none w-full">
                <UserItem />
            </div>
        </main>
    )
}

export default Sidebar