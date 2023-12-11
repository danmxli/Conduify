'use client'
import { FC } from "react";
import UserItem from "./user-item";
import { BsPlusSquare } from "react-icons/bs";


interface UserCardProps {
    name: string | null | undefined
    email: string | null | undefined
    picture: string | null | undefined
    updatePhase: (newPhase: string) => void;
    updateSelectedItem: (newItem: string) => void;
}

const UserCard: FC<UserCardProps> = (props): JSX.Element => {
    return (
        <div>
            <UserItem name={props.name} picture={props.picture} action="user" />
            <button
                className="p-0.5 pt-1.5 pb-1.5 rounded flex items-center justify-center gap-3 w-full bg-indigo-600 shadow-inner shadow-indigo-400 hover:bg-indigo-800 text-white"
                onClick={() => {
                    props.updateSelectedItem('')
                    props.updatePhase('NewSession')
                }}
            >
                New session
                <BsPlusSquare />
            </button>
        </div>
    )
}

export default UserCard