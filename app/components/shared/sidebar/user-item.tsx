import { FC } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { RxAvatar } from "react-icons/rx";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { IoIosLogOut } from "react-icons/io";

interface UserItemProps {
    name: string | null | undefined
    picture: string | null | undefined
    action: string // user or dashboard

}

const UserItem: FC<UserItemProps> = (props): JSX.Element => {
    const router = useRouter()

    return (
        <div className="flex items-center gap-3 bg-gray-50 shadow p-3 mb-3 rounded">
            <div className="flex-shrink-0">
                {props.picture && (
                    <Image src={props.picture} alt="picture" width={60} height={60} className="rounded" />
                )}
            </div>

            <div className="space-y-1.5">
                {props.action === "user" ? (
                    <button
                        className="w-full inline-flex items-center justify-start gap-1 hover:translate-x-2 duration-300"
                        onClick={() => {
                            router.push('/user')
                        }}
                    >
                        User Info <RxAvatar />
                    </button>
                ) : (
                    <button
                        className="w-full inline-flex items-center justify-start gap-1 hover:translate-x-2 duration-300"
                        onClick={() => {
                            router.push('/dashboard')
                        }}
                    >
                        Dashboard <MdOutlineSpaceDashboard />
                    </button>
                )}

                <a className="w-full inline-flex items-center justify-start gap-1 hover:translate-x-2 duration-300"
                    href="/api/auth/logout"
                >
                    Logout <IoIosLogOut />
                </a>
            </div>
        </div>
    )
}

export default UserItem