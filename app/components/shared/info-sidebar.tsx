import React, { FC } from "react"
import UserItem from "./sidebar/user-item"

interface SidebarProps {
    name: string | null | undefined
    email: string | null | undefined
    picture: string | null | undefined
}

const Sidebar: FC<SidebarProps> = (props): JSX.Element => {
    return (
        <main className="flex flex-col h-screen w-64 border-r">
            <div className="m-3 grid justify-center border-b">
                <UserItem name={props.name} picture={props.picture} action="dashboard" />
                
            </div>
        </main>
    )
}

export default Sidebar