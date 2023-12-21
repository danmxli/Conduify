import React, { FC } from "react"
import Image from "next/image"
import conduify from "../../public/conduify.svg"
import MessageIndication from "./conversation/message-indication"
import { parseResponse } from "@/modules/chatbot-response"

interface DialogItem {
    role: string
    content: string
    message_type: string
}

interface ChatHistoryProps {
    picture: string | null | undefined
    interview_sessions: Array<DialogItem>
}

const ChatHistory: FC<ChatHistoryProps> = (props): JSX.Element => {

    interface BotEvaluation {
        [key: string]: Array<string>
    }

    return (
        <div className="p-20 space-y-6">
            {props.interview_sessions.map((item, index) => (
                <div key={index}>
                    <div className={`flex ${item.role === 'user' ? 'justify-end ml-12' : 'mr-12'}`}>
                        {item.role === 'user' ? (

                            <div className="flex gap-1.5">
                                <div className="p-3 rounded-2xl bg-indigo-600 shadow-inner shadow-indigo-400 text-white whitespace-pre-line">
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
                                <div className="rounded-2xl shadow bg-indigo-50 text-gray-800 whitespace-pre-line">
                                    <MessageIndication message_type={item.message_type} />
                                    <div className="p-3 bg-white rounded-b-2xl">
                                        {item.content}
                                    </div>
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