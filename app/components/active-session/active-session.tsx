import React, { FC, useRef, useEffect, useState } from "react"
import SessionOptions from "./session-options"
import ChatHistory from "./chat-history"
import ExpandingInput from "./expanding-input"
import ConversationPopup from "./conversation/conversation-popup"
import DisabledInput from "../shared/disabled-input"
import SessionInfo from "./session-info"

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
    interviewee: string,
    resume: string,
    languages: Array<string>
}

interface ActiveSessionProps {
    userName: string | null | undefined,
    userEmail: string | null | undefined,
    picture: string | null | undefined

    chatData: ChatDataItem | undefined;

    inputState: string;
    updateInputState: (newInputState: string) => void;
    updatePhase: (newPhase: string) => void;
}

const ActiveSession: FC<ActiveSessionProps> = (props): JSX.Element => {

    // copy of interview_sessions
    const [chatHistory, setChatHistory] = useState<Array<DialogItem>>([]);

    const appendToChatHistory = (role: string, content: string) => {
        const newDialogItem: DialogItem = {
            role,
            content,
        };
        setChatHistory((prevChatHistory) => [...prevChatHistory, newDialogItem]);
    };

    useEffect(() => {
        setChatHistory(props.chatData?.interview_sessions || []);
    }, [props.chatData?.interview_sessions]);

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
        appendToChatHistory('user', text)
        setLoading(true)
        try {
            const response = await fetch('http://127.0.0.1:5000/session/new', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody),
            })
            if (response.ok) {
                const data = await response.json();
                if (data) {
                    appendToChatHistory('bot', data["response"]["content"])
                    props.updateInputState(data["session_status"])
                    setLoading(false)
                }
            }
            else {
                console.error('Request failed with status:', response.status);
            }
        }
        catch (error) {
            console.error('Fetch request error:', error);
        }
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

    // user phases
    interface UserPhases {
        [key: string]: React.ReactNode;
    }
    const currUserPhase: UserPhases = {
        ask: <ExpandingInput userResponse={userResponse} updateUserResponse={updateUserResponse} onSubmit={handleInputSubmit} inputPhase={inputPhase} updateInputPhase={updateInputPhase} />,
        conversation: <ConversationPopup question={chatHistory.slice(-1)[0]} userResponse={userResponse} updateUserResponse={updateUserResponse} onSubmit={handleInputSubmit} />
    }

    return (
        <div className="h-screen grid grid-cols-3">
            {props.chatData && (
                <>
                    <div className="col-span-2 h-screen">
                        <div className="flex flex-col h-screen">
                            <div ref={chatContainerRef} className="flex-grow max-h-fit overflow-scroll scrollbar-hide">
                                {chatHistory.length > 0 ? (
                                    <>
                                        <ChatHistory picture={props.picture} interview_sessions={chatHistory} />
                                    </>
                                ) : (
                                    <SessionOptions onChoose={handleInputSubmit} />
                                )}
                            </div>
                            <div className="pb-12 pl-12 pr-12 flex items-center justify-center">
                                {loading ? (
                                    <DisabledInput />
                                ) : (
                                    <>
                                    {currUserPhase[props.inputState]}
                                    </>
                                )}
                            </div>
                        </div>

                    </div>
                    <SessionInfo companyName={props.chatData.c_name} companyBusiness={props.chatData.c_business} companyDescription={props.chatData.c_description} userResume={props.chatData.resume} />
                </>
            )}

        </div>
    )
}

export default ActiveSession