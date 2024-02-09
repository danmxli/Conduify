import { FC, useState, useEffect, ChangeEvent } from "react"
import { AiOutlineLoading3Quarters } from "react-icons/ai";

interface DialogItem {
    role: string
    content: string
    message_type: string
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
    languages: Array<string>,
    position: string
}

interface ChangeResumeProps {
    _id: string,
    userName: string | null | undefined;
    userEmail: string | null | undefined;
    updateToggleChangeResume: (isChanging: boolean) => void

    // update resume
    chatData: ChatDataItem | undefined;
    updateResume: (chatData: ChatDataItem, newResume: string) => void;
}

const ChangeResume: FC<ChangeResumeProps> = (props): JSX.Element => {

    const [resumeUrl, setResumeUrl] = useState('')
    const [loading, setLoading] = useState(false)

    // run effect when component is mounted
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                props.updateToggleChangeResume(false)
            }
        }

        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [props])

    const submitUpdatedResume = async () => {
        if (!props.chatData) {
            return
        }
        const requestBody = {
            _id: props._id,
            name: props.userName,
            email: props.userEmail,
            resume: resumeUrl
        }
        setLoading(true)
        try {
            const response = await fetch('https://conduify-production.up.railway.app//users/change_resume', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody),
            })
            if (response.ok) {
                const data = await response.json();
                if (data) {
                    if (data["message"] === "invalid resume") {
                        setLoading(false)
                        setResumeUrl('Invalid resume url')
                        return
                    }
                    props.updateResume(props.chatData, data["url"])
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

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900/20 backdrop-blur">
            <div className="w-1/3 p-6 rounded bg-white">
                <label htmlFor="resume">Enter new resume PDF link</label>
                <input
                    className="w-full border-b focus:border-indigo-500 focus:outline-none"
                    type="text"
                    id="resume"
                    name="resume"
                    value={resumeUrl}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        setResumeUrl(e.target.value)
                    }}
                >
                </input>
                <div className="w-full mt-6 flex items-center gap-3">
                    {loading ? (
                        <div className="p-6 pt-1.5 pb-1.5 rounded bg-indigo-200 text-indigo-800 flex items-center justify-center gap-1">
                            Loading...<AiOutlineLoading3Quarters className="animate-spin" />
                        </div>
                    ) : (
                        <button
                            className="p-6 pt-1.5 pb-1.5 rounded bg-indigo-200 hover:bg-indigo-300 text-indigo-800"
                            onClick={submitUpdatedResume}
                        >
                            Submit Resume
                        </button>
                    )}
                    <button
                        className="p-6 pt-1.5 pb-1.5 rounded bg-gray-200 hover:bg-gray-300"
                        onClick={() => {
                            props.updateToggleChangeResume(false)
                        }}
                    >
                        Close
                    </button>
                </div>

            </div>
        </div>
    )
}

export default ChangeResume