import { FC, useState, useEffect } from "react"
import { GoRocket } from "react-icons/go";

interface DialogItem {
    role: string
    content: string
}

interface ConversationPopupProps {
    question: DialogItem;
    userResponse: string;
    updateUserResponse: (newResponse: string) => void;
    onSubmit: (text: string) => Promise<void>;
}

const ConversationPopup: FC<ConversationPopupProps> = (props): JSX.Element => {

    const [openConversation, setOpenConversation] = useState(false)
    // set openReadme to false when hit escape key
    const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
            setOpenConversation(false)
        }
    }
    // run effect when component is mounted
    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [])

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
                    <div className="bg-white p-6 border shadow rounded-2xl w-11/12 h-5/6">
                        <h1>{props.question.content}</h1>
                    </div>
                </div>
            )}
        </>
    )
}

export default ConversationPopup