import React, { useState } from 'react';

const DialogueWindow = () => {
    const [messages, setMessages] = useState([]);
    const [userMessage, setUserMessage] = useState('');

    const handleUserInput = (e) => {
        setUserMessage(e.target.value);
    };

    const handleSendMessage = () => {
        if (userMessage.trim() === '') return;
        setMessages([...messages, { text: userMessage }]);
        setUserMessage('');
    };

    return (
        <div className="flex flex-col justify-between bg-gray-100 border border-gray-300 rounded-b-3xl p-4">
            <div className="h-96 sm:h-128 w-fit sm:w-150 overflow-scroll scrollbar-hide">
                {messages.map((message, index) => (
                    <div key={index} className="text-left mb-1">
                        {message.text}
                    </div>
                ))}
            </div>
            <div className="mt-4 sm:flex sm:gap-2 sm:h-40 overflow-y-scroll">
                <textarea
                    value={userMessage}
                    onChange={handleUserInput}
                    placeholder="Enter your response..."
                    className="w-full p-2 rounded-md border transition h-40 sm:flex-1 focus:outline-none focus:border-indigo-500 focus:border-2"
                ></textarea>
                <button onClick={handleSendMessage} className="w-full mr-2 sm:w-auto self-start bg-indigo-500 hover:bg-indigo-600 duration-300 text-white p-2 rounded-md">
                    Send
                </button>
            </div>
        </div>
    );

};

export default DialogueWindow;
