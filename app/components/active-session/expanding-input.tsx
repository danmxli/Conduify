import React, { FC, useEffect, useRef } from 'react';
import { LuSendHorizonal } from 'react-icons/lu';

interface ExpandingInputProps {
    userResponse: string;
    updateUserResponse: (newResponse: string) => void;
    onSubmit: (text: string) => Promise<void>;
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


    return (
        <div className="relative w-full flex">
            <textarea
                ref={inputRef}
                value={props.userResponse}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                placeholder="Type your message..."
                className="w-full p-3 border focus:border-indigo-600 shadow focus:outline-none rounded-2xl resize-none scrollbar-hide"
            />
            <button onClick={handleSubmit} className="absolute bottom-3 right-3">
                <LuSendHorizonal />
            </button>
        </div>
    );
};

export default ExpandingInput;
