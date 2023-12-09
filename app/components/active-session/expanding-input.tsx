import React, { FC, useState, useEffect, useRef } from 'react';
import { LuSendHorizonal } from 'react-icons/lu';
import { FaCode } from 'react-icons/fa6';
import { TfiWrite } from "react-icons/tfi";
import { Editor } from '@monaco-editor/react';

interface ExpandingInputProps {
    userResponse: string;
    updateUserResponse: (newResponse: string) => void;
    onSubmit: (text: string) => Promise<void>;
    inputPhase: string
    updateInputPhase: (newPhase: string) => void;
}

const ExpandingInput: FC<ExpandingInputProps> = (props): JSX.Element => {
    const inputRef = useRef<HTMLTextAreaElement>(null);

    const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        props.updateUserResponse(event.target.value);
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
        // Submit on Enter key press
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            handleSubmit();
        }
    };

    const handleSubmit = () => {
        if (props.userResponse.trim() !== '') {
            props.onSubmit(props.userResponse);
            props.updateUserResponse('');
        }
    };

    const handleWriteButtonClick = () => {
        props.updateUserResponse('');
        props.updateInputPhase('write');
    }
    const handleCodeButtonClick = () => {
        props.updateUserResponse('');
        props.updateInputPhase('code');
    };
    function handleEditorChange(value: any) {
        props.updateUserResponse(value)
    }

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.style.height = 'auto';
            inputRef.current.style.height = inputRef.current.scrollHeight + 'px';

            const maxHeight = 16 * 16;
            if (inputRef.current.scrollHeight > maxHeight) {
                inputRef.current.style.overflowY = 'auto';
                inputRef.current.style.height = maxHeight + 'px';
            } else {
                inputRef.current.style.overflowY = 'hidden';
            }
        }
    }, [props.userResponse]);

    // interface for input phases
    interface UserInputPhase {
        [key: string]: React.ReactNode;
    }
    const currInput: UserInputPhase = {
        write:
            <div className="relative w-full flex">
                <textarea
                    ref={inputRef}
                    value={props.userResponse}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}

                    placeholder="Type your message..."
                    className="w-full p-3 border focus:border-indigo-600 shadow focus:outline-none rounded-2xl resize-none scrollbar-hide"
                />
                <button onClick={handleCodeButtonClick} className="absolute bottom-3 right-9">
                    <FaCode />
                </button>
                <button onClick={handleSubmit} className="absolute bottom-3 right-3">
                    <LuSendHorizonal />
                </button>
            </div>,
        code:
            <div className='relative w-full p-3 flex border shadow focus:outline-none rounded-2xl'>
                <Editor
                    height={250}
                    onChange={handleEditorChange}
                />
                <button onClick={handleWriteButtonClick} className="absolute bottom-3 right-9">
                    <TfiWrite />
                </button>
                <button onClick={handleSubmit} className="absolute bottom-3 right-3">
                    <LuSendHorizonal />
                </button>
            </div>
    }

    return (
        <>
            {currInput[props.inputPhase]}
        </>
    );
};

export default ExpandingInput;
