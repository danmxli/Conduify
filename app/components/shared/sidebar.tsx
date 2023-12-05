import { FC } from "react"
import UserCard from "./user-card"
import Image from "next/image"

interface SidebarProps {
    name: string | null | undefined
    email: string | null | undefined
    picture: string | null | undefined
    updatePhase: (newPhase: string) => void;

    simpleHistory: Array<{
        _id: string,
        company: string,
        position: string,
        languages: Array<string>
        c_logo: string
    }>
}

const Sidebar: FC<SidebarProps> = (props): JSX.Element => {
    return (
        <main className="flex flex-col h-screen w-64 border-r">
            <div className="m-3 pb-3 grid justify-center border-b">
                <UserCard name={props.name} email={props.email} picture={props.picture} updatePhase={props.updatePhase} />
            </div>
            <ul className="m-3 mt-0 flex-grow max-h-fit overflow-scroll scrollbar-hide space-y-3">
                {props.simpleHistory.map((historyItem) => (
                    <li key={historyItem._id}>
                        <button className="w-full text-left hover:bg-gray-100 rounded">
                            <Image
                                src={historyItem.c_logo}
                                alt="logo"
                                width={40}
                                height={40}
                                className="w-fit rounded"
                            />
                            <div>
                                <h1>{historyItem.company}</h1>
                                <p className="text-xs">{historyItem.position}</p>
                                <p className="text-xs">{historyItem.languages.join(', ')}</p>
                            </div>
                        </button>

                    </li>
                ))}
            </ul>
        </main>
    )
}

export default Sidebar