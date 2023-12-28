import React, { useState } from "react"
import ChangeResume from "./resume/change-resume"

interface DialogItem {
    role: string
    content: string
    message_type: string
}

interface ChatDataItem {
    _id: string,
    c_business: string,
    c_name: string,
    c_description: string,
    c_logo: string,
    interview_sessions: Array<DialogItem> // TODO  
    interviewee: string,
    resume: string,
    languages: Array<string>,
    position: string
}

interface SessionInfoProps {
    _id: string,
    userName: string | null | undefined;
    userEmail: string | null | undefined;
    companyName: string,
    companyBusiness: string,
    companyDescription: string,
    userResume: string

    // update resume
    chatData: ChatDataItem | undefined;
    updateResume: (chatData: ChatDataItem, newResume: string) => void;
}

const SessionInfo: React.FC<SessionInfoProps> = (props): JSX.Element => {
    const [openResume, setOpenResume] = useState(false)

    const [toggleChangeResume, setToggleChangeResume] = useState(false)
    const updateToggleChangeResume = (isChanging: boolean) => {
        setToggleChangeResume(isChanging)
    }

    return (
        <div>
            {openResume ? (
                <div className="flex flex-col h-screen bg-gray-200">
                    <iframe className="w-full h-full" src={props.userResume}>
                    </iframe>
                    <div className="m-6 flex items-center justify-center gap-3">
                        <button
                            onClick={() => {
                                setOpenResume(false)
                            }}
                            className="border-b border-black hover:border-indigo-600"
                        >
                            Company info
                        </button>
                        <button
                            onClick={() => {
                                setToggleChangeResume(true)
                            }}
                            className="border-b border-black hover:border-indigo-600"
                        >
                            Change resume
                        </button>
                    </div>
                </div>
            ) : (
                <div className="flex items-center bg-gray-200 h-screen">
                    <div className="p-6">
                        <h1 className="text-3xl">{props.companyName}</h1>
                        <a href="https://www.trueup.io/" className="text-xs text-indigo-600">citations: trueup.io</a>
                        <p className="text-gray-400 text-xs mb-3">{props.companyBusiness}</p>
                        <p className="text-gray-600 mb-3">{props.companyDescription}</p>

                        <div className="w-full flex items-center gap-3">
                            <button
                                onClick={() => {
                                    setOpenResume(true)
                                }}
                                className="border-b border-black hover:border-indigo-600"
                            >
                                View resume
                            </button>
                            <button
                                onClick={() => {
                                    setToggleChangeResume(true)
                                }}
                                className="border-b border-black hover:border-indigo-600"
                            >
                                Change resume
                            </button>
                        </div>
                    </div>
                </div>

            )}
            {toggleChangeResume && <ChangeResume _id={props._id} userName={props.userName} userEmail={props.userEmail} updateToggleChangeResume={updateToggleChangeResume} chatData={props.chatData} updateResume={props.updateResume} />}
        </div>
    )
}

export default SessionInfo