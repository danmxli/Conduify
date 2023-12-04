import { FC } from "react"
import UserCard from "./user-card"

interface SidebarProps {
    name: string | null | undefined
    email: string | null | undefined
    picture: string | null | undefined
}

const Sidebar: FC<SidebarProps> = (props): JSX.Element => {
    return (
        <main className="flex flex-col h-screen w-56 border-r">
            <div className="m-3 pb-3 grid justify-center border-b">
                <UserCard name={props.name} email={props.email} picture={props.picture} />
            </div>
            
        </main>
    )
}

export default Sidebar