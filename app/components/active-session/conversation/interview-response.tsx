import React, { FC } from "react"
import { Editor } from "@monaco-editor/react";
import { FaCode } from "react-icons/fa6";
import { TfiWrite } from "react-icons/tfi"
import { LuSendHorizonal } from 'react-icons/lu';

interface InterviewResponseInputProps {
    inputPhase: string;
    updateInputPhase: (newPhase: string) => void;
    userResponse: string;
    updateUserResponse: (newResponse: string) => void;
    onSubmit: (text: string) => Promise<void>;
    updateConversation: (isOpen: boolean) => void;
}

const InterviewResponseInput: FC<InterviewResponseInputProps> = (props): JSX.Element => {

    // change input phase
    const toWritePhase = () => {
        props.updateUserResponse('')
        props.updateInputPhase('write')
    }
    const toCodePhase = () => {
        props.updateUserResponse('')
        props.updateInputPhase('code')
    }
    function handleEditorChange(value: any) {
        props.updateUserResponse(value)
    }

    // handle textarea change
    const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        props.updateUserResponse(event.target.value)
    }
    const handleSubmit = () => {
        if (props.userResponse.trim() !== '') {
            props.onSubmit(props.userResponse);
            props.updateUserResponse('');
            props.updateConversation(false)
        }
    };

    // interface for input phases
    interface UserInputPhase {
        [key: string]: React.ReactNode;
    }
    const currInput: UserInputPhase = {
        write:
            <>
                <div>
                    <textarea
                        value={props.userResponse}
                        onChange={handleInputChange}
                        className="w-full p-3 border focus:border-indigo-600 shadow focus:outline-none rounded-2xl resize-none scrollbar-hide"
                        rows={18}
                    >
                    </textarea>
                </div>
                <div>
                    <div className="inline-flex items-center bg-gray-50 shadow rounded">
                        <button onClick={toCodePhase} className="p-3 pt-1.5 pb-1.5 pl-6 hover:text-indigo-600 flex items-center justify-center gap-1 ">
                            <FaCode />Code
                        </button>
                        <button onClick={handleSubmit} className="p-3 pt-1.5 pb-1.5 pr-6 hover:text-indigo-600 flex items-center justify-center gap-1 ">
                            <LuSendHorizonal />Submit
                        </button>
                    </div>
                </div>

            </>,

        code:
            <>
                <div className="w-full p-3 border shadow rounded-2xl">
                    <Editor
                        height={432}
                        onChange={handleEditorChange}
                    />
                </div>
                <div>
                    <div className="inline-flex items-center bg-gray-50 shadow rounded">
                        <button onClick={toWritePhase} className="p-3 pt-1.5 pb-1.5 pl-6 hover:text-indigo-600 flex items-center justify-center gap-1 ">
                            <TfiWrite />Write
                        </button>
                        <button onClick={handleSubmit} className="p-3 pt-1.5 pb-1.5 pr-6 hover:text-indigo-600 flex items-center justify-center gap-1 ">
                            <LuSendHorizonal />Submit
                        </button>
                    </div>
                </div>

            </>

    }

    return (
        <>
            {currInput[props.inputPhase]}
        </>
    )
}

export default InterviewResponseInput