import React, { FC, useState, useEffect } from "react"
import Image from "next/image";
import InterviewResponseInput from "./interview-response";
import WebcamSession from "./webcam";
import { GoRocket } from "react-icons/go";
import { RiWebcamLine } from "react-icons/ri";
import { FaRegEyeSlash } from "react-icons/fa";

interface DialogItem {
    role: string
    content: string
}

interface ConversationPopupProps {
    question: DialogItem;
    c_logo: string | undefined;
    c_name: string | undefined;
    position: string | undefined;
    languages: Array<string> | undefined;
    inputPhase: string;
    updateInputPhase: (newPhase: string) => void;
    userResponse: string;
    updateUserResponse: (newResponse: string) => void;
    onSubmit: (text: string) => Promise<void>;
}

const ConversationPopup: FC<ConversationPopupProps> = (props): JSX.Element => {
    // webcam session state
    const [openWebcam, setOpenWebcam] = useState(false)

    // handle open, close conversation popup
    const [openConversation, setOpenConversation] = useState(false)
    const updateConversation = (isOpen: boolean) => {
        setOpenConversation(isOpen)
    }
    const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
            updateConversation(false)
        }
    }
    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    })

    return (
        <>
            <button
                className="w-full p-6 border hover:border-indigo-600 shadow rounded-2xl flex items-center justify-center gap-3"
                onClick={() => {
                    updateConversation(true)
                }}
            >
                <GoRocket className="text-xl" /> Respond to question
            </button>

            {openConversation && (
                <div className="fixed inset-0 flex items-center justify-center backdrop-blur">
                    <div className="bg-white p-6 border shadow rounded-2xl w-11/12 h-5/6 grid grid-cols-3">

                        <div className="h-full flex flex-col pr-6 border-r">
                            <div className="flex-grow max-h-fit">
                                <h1>{props.question.content}</h1>
                            </div>

                            <div className="border-t pt-6 flex items-center justify-between">
                                <div className="flex items-center justify-start gap-3">
                                    <Image
                                        src={props.c_logo || "https://logo.clearbit.com/cohere.ai"}
                                        alt="logo"
                                        width={60}
                                        height={60}
                                        className="w-fit rounded"
                                    />
                                    <div>
                                        <h1>{props.c_name}</h1>
                                        <p className="text-xs">{props.position}</p>
                                        <p className="text-xs">{props.languages?.join(', ')}
                                        </p>
                                    </div>
                                </div>
                                <div className="h-full bg-black relative">
                                    <div className="absolute right-0 bottom-0">
                                        <button
                                            className="bg-gray-50 hover:bg-gray-100 p-3 pt-1.5 pb-1.5 rounded shadow flex items-center justify-center gap-1"
                                            onClick={() => {
                                                setOpenWebcam(!openWebcam)
                                            }}
                                        >
                                            {openWebcam ? (
                                                <>
                                                    <FaRegEyeSlash />Close
                                                </>
                                            ) : (
                                                <>
                                                    <RiWebcamLine />Webcam
                                                </>
                                            )}

                                        </button>
                                    </div>

                                </div>
                            </div>
                        </div>

                        <div className="col-span-2 pl-6 flex items-center justify-center">
                            <>
                                {openWebcam ? (
                                    <div>
                                        <WebcamSession />
                                    </div>
                                ) : (
                                    <div className="w-full h-full flex flex-col justify-between">
                                        <InterviewResponseInput inputPhase={props.inputPhase} updateInputPhase={props.updateInputPhase} userResponse={props.userResponse} updateUserResponse={props.updateUserResponse} onSubmit={props.onSubmit} updateConversation={updateConversation} />
                                    </div>
                                )}

                            </>
                        </div>
                    </div>
                </div >
            )}
        </>
    )
}

export default ConversationPopup