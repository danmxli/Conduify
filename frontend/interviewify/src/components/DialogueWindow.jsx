import React, { useState } from 'react';
import { FaUserAlt, FaUserAstronaut } from 'react-icons/fa'
import { AiOutlineSend, AiOutlineLoading3Quarters } from 'react-icons/ai'

const DialogueWindow = () => {
    const [messages, setMessages] = useState([]);
    const [userMessage, setUserMessage] = useState('');
    const [fetching, setFetching] = useState(false);
    const [dialogPreview, setDialogPreview] = useState(true);

    const handleUserInput = (e) => {
        setUserMessage(e.target.value);
    };

    const handleSendMessage = async () => {
        if (userMessage.trim() === '') return;

        // request body
        const requestBody = {
            response: userMessage,
        };
        setFetching(true)
        setDialogPreview(false)

        try {
            const response = await fetch('http://localhost:8001/interview/create_dialogue', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody),
            });

            if (!response.ok) {
                throw new Error('Request failed');
            }

            const data = await response.json();

            setMessages(data.dialogs.map((dialog) => ({
                text: dialog.message,
                speaker: dialog.speaker,
            })));

            setUserMessage('');
        } catch (error) {
            console.error('Error sending message:', error);
        }
        setFetching(false)
    };

    return (
        <div className="flex flex-col justify-between bg-gray-100 border border-gray-300 rounded-b-3xl pb-4">
            <div className="h-96 sm:h-128 w-fit sm:w-150 overflow-scroll scrollbar-hide text-xs sm:text-base">
                {dialogPreview ? (
                    <div className="text-gray-400 text-center mt-12 sm:mt-32">
                        <p className='text-2xl'>Welcome to Interviewify Dialogues!</p>
                        <div className='mt-3 inline-flex text-5xl gap-4'>
                            <FaUserAlt />
                            <AiOutlineSend />
                            <FaUserAstronaut />
                        </div>
                        <p className='m-0 sm:ml-10 sm:mr-10'>Your response will be assessed by the assistant based on the specifics of the interview question, the company objectives, and, of course, the quality of your voice!</p>

                    </div>
                ) : (
                    messages.map((message, index) => (
                        <div key={index} className={`text-left ${message.speaker === 'user' ? 'text-indigo-900 bg-indigo-50' : 'text-gray-700 bg-white'}`}>
                            <div className='p-2'>
                                {message.speaker === 'user' ? <FaUserAlt className='' /> : <FaUserAstronaut className='' />}
                                {message.text}
                            </div>
                            {message.speaker === 'user' ? (
                                <></> // Render nothing for user messages
                            ) : (
                                <div className='p-1 bg-indigo-500 text-white'>
                                    You are welcome to try answering again!
                                </div>
                            )}
                        </div>
                    ))
                )}


            </div>
            <div className="mt-4 sm:flex sm:gap-2 sm:h-40 overflow-y-scroll m-1">
                <textarea
                    value={userMessage}
                    onChange={handleUserInput}
                    placeholder="Enter your response..."
                    className="w-full p-2 rounded-md border text-sm sm:text-base transition h-40 sm:flex-1 focus:outline-none focus:border-indigo-500"
                ></textarea>
                <button onClick={handleSendMessage} className="mr-2 p-4 sm:w-auto self-start bg-indigo-500 hover:bg-indigo-600 duration-300 text-white p-2 rounded-md">
                    {fetching ? <AiOutlineLoading3Quarters className='animate-spin' /> : <AiOutlineSend />}
                </button>
            </div>
        </div>
    );
};

export default DialogueWindow;
