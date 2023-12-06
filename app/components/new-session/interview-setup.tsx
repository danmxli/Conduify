import React, { FC, useState } from "react"

interface ChatDataItem {
    c_business: string,
    c_name: string,
    c_description: string,
    c_logo: string,
    interview_sessions: Array<any> // TODO  
    interviewee: string
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
}

const InterviewSetup: FC<InterviewSetupProps> = (props): JSX.Element => {

    const [loading, setLoading] = useState(false)

    const getCompanyDetails = async () => {
        const requestBody = {
            email: props.userEmail,
            position: props.position,
            languages: props.selectedLanguages,
            company: props.company,
            interviewee: props.userName
        }
        setLoading(true)
        console.log(requestBody)
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
                    if (data["message"] === "no info") {
                        setLoading(false)
                        props.updateCompany('Try entering another company')
                    }
                    else {
                        // TODO updateChatData
                        const chatData: ChatDataItem = {
                            c_business: data["info"]["business"],
                            c_name: data["info"]["c_name"],
                            c_description: data["info"]["description"],
                            c_logo: data["info"]["logo"],
                            interview_sessions: data["languages"],
                            interviewee: data["interviewee"],
                            languages: data["languages"]
                        }
                        props.updateChatData(chatData)
                        props.updateSimpleHistory(data["simple_history"])
                        props.updatePhase('ActiveSession')
                    }

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
            <div className="p-3">
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
                {loading ? (
                    <div className="mt-6 w-full bg-indigo-500 text-white p-2 rounded text-center">Loading...
                    </div>
                ) : (
                    <button
                        className="mt-6 w-full bg-indigo-500 text-white p-2 rounded hover:bg-indigo-600"
                        onClick={getCompanyDetails}
                    >Start</button>
                )}

            </div>
            <div>
                <h1 className="p-3 bg-gray-100">I am proficient in...</h1>
                <div className='inline-grid grid-cols-1 md:grid-cols-3 gap-6 p-0 sm:p-3 break-words bg-gray-50'>
                    {languageOptions.map((language, index) => (
                        <div key={index} className="">
                            <label>
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