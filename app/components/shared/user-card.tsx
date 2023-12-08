import { FC } from "react";
import Image from "next/image";
import { BsPlusSquare } from "react-icons/bs";
import { RxAvatar } from "react-icons/rx";
import { IoIosLogOut } from "react-icons/io";


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
            <div className="flex items-center gap-3 bg-gray-50 shadow p-3 mb-3 rounded">
                {props.picture && (
                    <Image src={props.picture} alt="picture" width={60} height={60} className="rounded" />
                )}
                <div className="space-y-1.5">
                    <button className="w-full inline-flex items-center justify-start gap-1 hover:translate-x-2 duration-300">
                        User Info <RxAvatar />
                    </button>
                    <a className="w-full inline-flex items-center justify-start gap-1 hover:translate-x-2 duration-300"
                        href="/api/auth/logout"
                    >
                        Logout <IoIosLogOut />
                    </a>
                </div>

            </div>
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