import React, { FC, useState, useEffect } from "react"
import Image from "next/image";
import { GoRocket } from "react-icons/go";

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
    userResponse: string;
    updateUserResponse: (newResponse: string) => void;
    onSubmit: (text: string) => Promise<void>;
}

const ConversationPopup: FC<ConversationPopupProps> = (props): JSX.Element => {
    // handle open, close conversation popup
    const [openConversation, setOpenConversation] = useState(false)
    const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
            setOpenConversation(false)
        }
    }
    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    })

    // handle textarea change
    const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        props.updateUserResponse(event.target.value)
    }
    const handleSubmit = () => {
        if (props.userResponse.trim() !== '') {
            props.onSubmit(props.userResponse);
            props.updateUserResponse('');
            setOpenConversation(false)
        }
    };

    return (
        <>
            <button
                className="w-full p-6 border hover:border-indigo-600 shadow rounded-2xl flex items-center justify-center gap-3"
                onClick={() => {
                    setOpenConversation(true)
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

                            <div className="border-t pt-6 flex items-center justify-start gap-3">
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

                        </div>

                        <div className="col-span-2 pl-6 flex items-center justify-center">
                            <div>
                                <textarea
                                    value={props.userResponse}
                                    onChange={handleInputChange}
                                >
                                </textarea>
                                <button onClick={handleSubmit}>submit</button>
                            </div>
                        </div>
                    </div>
                </div >
            )}
        </>
    )
}

export default ConversationPopup