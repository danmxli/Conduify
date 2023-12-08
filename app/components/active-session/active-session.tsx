import React, { FC, useRef, useEffect, useState } from "react"
import SessionOptions from "./session-options"
import ChatHistory from "./chat-history"
import ExpandingInput from "./expanding-input"
import DisabledInput from "../shared/disabled-input"

interface DialogItem {
    role: string
    content: string
}

interface ChatDataItem {
    _id: string,
    c_business: string,
    c_name: string,
    c_description: string,
    c_logo: string,
    interview_sessions: Array<DialogItem> // TODO  
    interviewee: string
    languages: Array<string>
}

interface ActiveSessionProps {
    userName: string | null | undefined,
    userEmail: string | null | undefined,
    picture: string | null | undefined

    chatData: ChatDataItem | undefined;
    updatePhase: (newPhase: string) => void;
}

const ActiveSession: FC<ActiveSessionProps> = (props): JSX.Element => {

    // copy of interview_sessions
    const [chatHistory, setChatHistory] = useState<Array<DialogItem>>([]);

    useEffect(() => {
        setChatHistory([...(props.chatData?.interview_sessions || [])])
    }, [props.chatData?.interview_sessions])

    // input phase, write or code
    const [inputPhase, setInputPhase] = useState('write')
    const updateInputPhase = (newPhase: string) => {
        setInputPhase(newPhase)
    }

    // user response state
    const [userResponse, setUserResponse] = useState('')
    const updateUserResponse = (newResponse: string) => {
        setUserResponse(newResponse)
    }


    const [loading, setLoading] = useState(false)

    const handleInputSubmit = async (text: string) => {
        const requestBody = {
            _id: props.chatData?._id,
            name: props.userName,
            email: props.userEmail,
            input: text,
        }
        console.log(requestBody)
    }

    // ref to scroll to bottom whenever historyCopy value updates
    const chatContainerRef = useRef<HTMLDivElement | null>(null);
    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [chatHistory]);

    // reset active session state
    useEffect(() => {
        setInputPhase('write')
        setUserResponse('')
    }, [props.chatData])

    return (
        <div className="h-screen grid grid-cols-3">
            {props.chatData && (
                <>
                    <div className="col-span-2 h-screen">
                        <div className="flex flex-col h-screen">
                            <div ref={chatContainerRef} className="flex-grow max-h-fit overflow-scroll scrollbar-hide">
                                {props.chatData.interview_sessions.length > 0 ? (
                                    <>
                                        <ChatHistory picture={props.picture} interview_sessions={chatHistory} />
                                    </>
                                ) : (
                                    <SessionOptions />
                                )}
                            </div>
                            <div className="pb-12 pl-12 pr-12 flex items-center justify-center">
                                {loading ? (
                                    <DisabledInput />
                                ) : (
                                    <ExpandingInput userResponse={userResponse} updateUserResponse={updateUserResponse} onSubmit={handleInputSubmit} inputPhase={inputPhase} updateInputPhase={updateInputPhase} />
                                )}
                            </div>
                        </div>

                    </div>
                    <div>
                        <div className="flex p-6 items-center bg-gray-200 h-screen">
                            <div>
                                <h1 className="text-3xl">{props.chatData.c_name}</h1>
                                <a href="https://www.trueup.io/" className="text-xs text-indigo-600">citations: trueup.io</a>
                                <p className="text-gray-400 text-xs mb-3">{props.chatData.c_business}</p>
                                <p className="text-gray-600">{props.chatData.c_description}</p>
                            </div>
                        </div>
                    </div>
                </>
            )}

        </div>
    )
}

export default ActiveSession