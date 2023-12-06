import React, { FC, useState, useEffect, useRef } from 'react';
import { LuSendHorizonal } from "react-icons/lu";

interface ExpandingInputProps {
    onSubmit: (text: string) => void;
}

const ExpandingInput: FC<ExpandingInputProps> = (props): JSX.Element => {
    const [inputValue, setInputValue] = useState<string>('');
    const inputRef = useRef<HTMLTextAreaElement>(null);

    const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setInputValue(event.target.value);
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
        // Submit on Enter key press
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            handleSubmit();
        }
    };

    const handleSubmit = () => {
        if (inputValue.trim() !== '') {
            props.onSubmit(inputValue);
            setInputValue('');
        }
    };

    // Auto-expand textarea as you enter a newline
    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.style.height = 'auto';
            inputRef.current.style.height = inputRef.current.scrollHeight + 'px';

            // Limit the height to a maximum of 24rem
            const maxHeight = 24 * 16; // 1rem = 16px
            if (inputRef.current.scrollHeight > maxHeight) {
                inputRef.current.style.overflowY = 'auto';
                inputRef.current.style.height = maxHeight + 'px';
            } else {
                inputRef.current.style.overflowY = 'hidden';
            }
        }
    }, [inputValue]);

    return (
        <div className="relative w-full flex">
            <textarea
                ref={inputRef}
                value={inputValue}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}

                placeholder="Type your message..."
                className="w-full p-3 border focus:border-indigo-600 shadow-lg focus:outline-none rounded-2xl resize-none scrollbar-hide"
            />
            <button
                onClick={handleSubmit}
                className="absolute bottom-0 right-0 p-3"
            >
                <LuSendHorizonal />
            </button>
        </div>
    );
};

export default ExpandingInput;
