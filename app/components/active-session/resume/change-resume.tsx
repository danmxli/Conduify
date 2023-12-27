import { FC, useState, useEffect, ChangeEvent } from "react"

interface ChangeResumeProps {
    updateToggleChangeResume: (isChanging: boolean) => void
}

const ChangeResume: FC<ChangeResumeProps> = (props): JSX.Element => {

    const [resumeUrl, setResumeUrl] = useState('')

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
                    <button className="p-6 pt-1.5 pb-1.5 rounded bg-indigo-200 hover:bg-indigo-300 text-indigo-800">
                        Submit
                    </button>
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