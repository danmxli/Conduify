import { FC, useState, useEffect } from "react";
import Image from "next/image";
import { BsThreeDotsVertical, BsPlusSquare } from "react-icons/bs";
import { RxAvatar } from "react-icons/rx";
import { IoIosLogOut } from "react-icons/io";


interface UserCardProps {
    name: string | null | undefined
    email: string | null | undefined
    picture: string | null | undefined
}

const UserCard: FC<UserCardProps> = (props): JSX.Element => {

    // handle popup state
    const [isOpen, setIsOpen] = useState(false)
    const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
            setIsOpen(false)
        }
    }

    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown)

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [])

    return (
        <div>
            <h1 className="text-3xl text-center">{props.name}</h1>
            <button className="mb-3 p-0.5 pt-1.5 pb-1.5 rounded flex items-center justify-center gap-3 w-full bg-gray-100 hover:bg-gray-200"
                onClick={() => {
                    setIsOpen(true)
                }}
            >
                <h2 className="text-xs text-center break-all">{props.email}</h2>
                <BsThreeDotsVertical />
            </button>
            <button className="p-0.5 pt-1.5 pb-1.5 rounded flex items-center justify-center gap-3 w-full bg-indigo-50 hover:bg-indigo-100">
                New session
                <BsPlusSquare />
            </button>
            {isOpen && (
                <div className="fixed inset-0 flex items-center justify-center backdrop-blur">
                    <div className="p-6 border rounded-3xl bg-white">
                        <div className="w-full flex items-center justify-center gap-3 border-b pb-6 mb-3">
                            {props.picture && (
                                <Image src={props.picture} alt="picture" width={60} height={60} className="rounded-full" />
                            )}
                            <div>
                                <h1 className="text-xl">{props.name}</h1>
                                <h2 className="text-xs">{props.email}</h2>
                            </div>

                        </div>

                        <button className="w-full inline-flex items-center justify-start p-3 gap-1 hover:translate-x-2 duration-300">
                            User Info <RxAvatar />
                        </button>
                        <a className="w-full inline-flex items-center justify-start p-3 gap-1 hover:translate-x-2 duration-300"
                            href="/api/auth/logout"
                        >
                            Logout <IoIosLogOut />
                        </a>
                        <button className="w-full inline-flex items-center justify-start p-3 gap-1 hover:translate-x-2 duration-300"
                        onClick={() => {
                            setIsOpen(false)
                        }}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default UserCard