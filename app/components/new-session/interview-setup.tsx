import React, { FC, useState } from "react"

interface ChatDataItem {
    _id: string,
    c_business: string,
    c_name: string,
    c_description: string,
    c_logo: string,
    interview_sessions: Array<any> // TODO  
    interviewee: string,
    resume: string,
    languages: Array<string>
}

interface InterviewSetupProps {
    userName: string | null | undefined;
    userEmail: string | null | undefined;
    updatePhase: (newPhase: string) => void;

    updateSimpleHistory: (newHistory: Array<{
        _id: string,
        company: string,
        position: string,
        languages: Array<string>
        c_logo: string
    }>) => void;
    updateChatData: (newChatData: ChatDataItem) => void;

    selectedLanguages: Array<string>
    updateSelectedLanguages: (newLang: string) => void

    company: string
    updateCompany: (newCompany: string) => void

    position: string
    updatePosition: (newPosition: string) => void

    resumeUrl: string
    updateResumeUrl: (newResumeUrl: string) => void

    updateInputState: (newInputState: string) => void;
    updateSelectedItem: (newItem: string) => void;
}

const InterviewSetup: FC<InterviewSetupProps> = (props): JSX.Element => {

    const [loading, setLoading] = useState(false)

    const getCompanyDetails = async () => {
        const requestBody = {
            email: props.userEmail,
            position: props.position,
            languages: props.selectedLanguages,
            company: props.company,
            interviewee: props.userName,
            resume: props.resumeUrl
        }
        setLoading(true)
        try {
            const response = await fetch('http://127.0.0.1:5000/company/search', {
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
                        props.updateResumeUrl('Invalid resume url')
                        return
                    }
                    if (data["message"] === "no info") {
                        setLoading(false)
                        props.updateCompany('Try entering another company')
                        return
                    }

                    // TODO updateChatData
                    const chatData: ChatDataItem = {
                        _id: data["_id"],
                        c_business: data["info"]["business"],
                        c_name: data["info"]["c_name"],
                        c_description: data["info"]["description"],
                        c_logo: data["info"]["logo"],
                        interview_sessions: data["interview_sessions"],
                        interviewee: data["interviewee"],
                        resume: data["resume_url"],
                        languages: data["languages"]
                    }
                    props.updateChatData(chatData)
                    props.updateSimpleHistory(data["simple_history"])
                    props.updateInputState("ask")
                    props.updatePhase('ActiveSession')
                    props.updateSelectedItem(data["_id"])
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

    const positionOptions = [
        'Sofware Engineer', 'ML Engineer', 'Cloud Engineer', 'DevOps Engineer', 'Data Scientist', 'Quantitative Analyst', 'Fullstack Developer', 'Frontend Developer', 'Backend Developer', 'Automation Developer'
    ]
    const languageOptions = [
        'Python', 'C++', 'Go', 'Typescript', 'Javascript', 'Java', 'Rust', 'SQL', 'Swift', 'Ruby', 'C#', 'Kotlin', 'Bash', 'Other'
    ]

    return (
        <div className="grid sm:grid-cols-2">
            <div className="p-6">
                <label htmlFor="company" className="block">I am interested in applying to...</label>
                <input
                    className="w-full border-b focus:border-indigo-500 focus:outline-none"
                    type="text"
                    id="company"
                    name="company"
                    value={props.company}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        props.updateCompany(e.target.value)
                    }}
                >
                </input>
                <label htmlFor="position" className="mt-6 block">As a...</label>
                <select
                    className="w-full border-b focus:border-indigo-500 focus:outline-none"
                    id="position"
                    name="position"
                    value={props.position}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                        props.updatePosition(e.target.value)
                    }}
                >
                    {positionOptions.map((position, index) => (
                        <option key={index} value={position}>
                            {position}
                        </option>
                    ))}
                </select>
                <label htmlFor="resume" className="mt-6 block">Enter resume PDF link: </label>
                <input
                    className="w-full border-b focus:border-indigo-500 focus:outline-none"
                    type="text"
                    id="resume"
                    name="resume"
                    value={props.resumeUrl}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        props.updateResumeUrl(e.target.value)
                    }}
                >
                </input>
                {loading ? (
                    <div className="mt-6 w-full bg-indigo-500 text-white p-2 rounded text-center">Loading...
                    </div>
                ) : (
                    <button
                        className="mt-6 w-full bg-indigo-600 shadow-inner shadow-indigo-400 text-white p-2 rounded hover:bg-indigo-800"
                        onClick={getCompanyDetails}
                    >Start</button>
                )}

            </div>
            <div className="border-l">
                <h1 className="p-6 border-b">Programming skills of applicant:</h1>
                <div className='inline-grid grid-cols-1 md:grid-cols-3 gap-3 p-0 sm:p-6 break-words'>
                    {languageOptions.map((language, index) => (
                        <div key={index} className="bg-gray-50 rounded shadow">
                            <label className="flex items-center gap-1.5  p-1.5 pl-3 pr-3 hover:cursor-pointer">
                                <input
                                    type="checkbox"
                                    value={language}
                                    checked={props.selectedLanguages.includes(language)}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                        props.updateSelectedLanguages(e.target.value)
                                    }}
                                /> {language}
                            </label>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default InterviewSetup