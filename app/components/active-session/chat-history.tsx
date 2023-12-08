import React, { FC } from "react"
import Image from "next/image"
import conduify from "../../public/conduify.svg"

interface DialogItem {
    role: string
    content: string
}

interface ChatHistoryProps {
    picture: string | null | undefined
    interview_sessions: Array<DialogItem>
}

const ChatHistory: FC<ChatHistoryProps> = (props): JSX.Element => {

    return (
        <div className="p-20 space-y-6">
            {props.interview_sessions.map((item, index) => (
                <div key={index}>
                    <div className={`flex ${item.role === 'user' ? 'justify-end ml-12' : 'mr-12'}`}>
                        {item.role === 'user' ? (

                            <div className="flex gap-1.5">
                                <div className="p-3 rounded-2xl bg-indigo-600 shadow-inner shadow-indigo-400 text-white tracking-wide leading-7 whitespace-pre-line">
                                    {item.content}
                                </div>
                                {props.picture && (
                                    <div className="flex-shrink-0">
                                        <Image src={props.picture} alt="user" width={30} height={30} className="rounded-full shadow" />
                                    </div>

                                )}
                            </div>

                        ) : (
                            <div className="flex gap-1.5">
                                {props.picture && (
                                    <div className="flex-shrink-0">
                                        <Image src={conduify} alt="bot" width={30} height={30} className="rounded-full shadow" />
                                    </div>
                                )}
                                <div className="p-3 rounded-2xl bg-gray-50 shadow text-gray-800 tracking-wide leading-7 whitespace-pre-line">
                                    {item.content}
                                </div>
                            </div>
                        )}
                    </div>

                </div>
            ))}
        </div>
    )
}

export default ChatHistory