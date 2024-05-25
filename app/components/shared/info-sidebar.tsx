import React from "react"
import { RootState } from "@/lib/store"
import { useAppSelector } from "@/lib/hooks"
import UserItem from "./sidebar/user-item"

const Sidebar = (): JSX.Element => {

    const info = useAppSelector((state: RootState) => state.user.info)

    return (
        <main className="flex flex-col h-screen w-64 border-r p-2">
            <div className="flex flex-grow">

            </div>
            <div className="flex-none w-full">
                <UserItem />
            </div>
        </main>
    )
}

export default Sidebar