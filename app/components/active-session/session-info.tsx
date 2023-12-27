import React, { useState } from "react"
import ChangeResume from "./resume/change-resume"

interface SessionInfoProps {
    companyName: string,
    companyBusiness: string,
    companyDescription: string,
    userResume: string
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
                    <div className="m-6 flex justify-center">
                        <button
                            onClick={() => {
                                setOpenResume(false)
                            }}
                            className="border-b border-black hover:border-indigo-600"
                        >
                            Return to company info
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
                    {toggleChangeResume && <ChangeResume updateToggleChangeResume={updateToggleChangeResume} />}
                </div>

            )}

        </div>
    )
}

export default SessionInfo