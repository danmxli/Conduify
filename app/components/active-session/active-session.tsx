import React, { FC, useEffect, useState } from "react"
import Image from "next/image"
import SessionOptions from "./session-options"
import ExpandingInput from "./expanding-input"

interface ChatDataItem {
    c_business: string,
    c_name: string,
    c_description: string,
    c_logo: string,
    interview_sessions: Array<any> // TODO  
    interviewee: string
    languages: Array<string>
}

interface ActiveSessionProps {
    chatData: ChatDataItem | undefined;
    updatePhase: (newPhase: string) => void;
}

const ActiveSession: FC<ActiveSessionProps> = (props): JSX.Element => {

    // shallow copy of interview_sessions
    const [chatHistory, setChatHistory] = useState<Array<any>>(props.chatData?.interview_sessions || []);

    // input phase, Write or Code
    const [inputPhase, setInputPhase] = useState('Write')
    const updateInputPhase = (newPhase: string) => {
        setInputPhase(newPhase)
    }

    // user response state
    const [userResponse, setUserResponse] = useState('')
    const updateUserResponse = (newResponse: string) => {
        setUserResponse(newResponse)
    }
    useEffect(() => {
        setInputPhase('Write')
        setUserResponse('')
    }, [props.chatData])

    const handleInputSubmit = (text: string) => {
        console.log(text)
    }

    return (
        <div className="h-screen grid grid-cols-3">
            {props.chatData && (
                <>
                    <div className="col-span-2 h-screen">
                        <div className="flex flex-col h-screen">
                            <div className="flex-grow max-h-fit overflow- scrollbar-hide">
                                <SessionOptions />
                            </div>
                            <div className="pb-12 pl-12 pr-12 flex items-center justify-center">
                                <ExpandingInput userResponse={userResponse} updateUserResponse={updateUserResponse} onSubmit={handleInputSubmit} inputPhase={inputPhase} updateInputPhase={updateInputPhase} />
                            </div>
                        </div>

                    </div>
                    <div>
                        <div className="flex p-6 items-center bg-gray-50 h-screen">
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