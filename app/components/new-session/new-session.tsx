import React, { FC, useState } from "react"
import InterviewSetup from "./interview-setup";

interface NewSessionProps {
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
    updateChatData: (newChatData: {
        c_business: string,
        c_name: string,
        c_description: string,
        c_logo: string,
        interview_sessions: Array<any> // TODO  
        interviewee: string
        languages: Array<string>
    }) => void;

    updateSelectedItem: (newItem: string) => void;
}

const NewSession: FC<NewSessionProps> = (props): JSX.Element => {

    // programming language preference state
    const [selectedLanguages, setSelectedLanguages] = useState(["Python"]);
    const updateSelectedLanguages = (newLang: string) => {
        if (selectedLanguages.includes(newLang)) {
            setSelectedLanguages(selectedLanguages.filter(lang => lang !== newLang))
        }
        else {
            setSelectedLanguages([...selectedLanguages, newLang])
        }
    }

    // company preference state
    const [company, setCompany] = useState('Cohere');
    const updateCompany = (newCompany: string) => {
        setCompany(newCompany)
    }

    // position preference state
    const [position, setPosition] = useState('Software Engineer');
    const updatePosition = (newPosition: string) => {
        setPosition(newPosition)
    }

    // resume url state
    const [resumeUrl, setResumeUrl] = useState('')
    const updateResumeUrl = (newResumeUrl: string) => {
        setResumeUrl(newResumeUrl)
    }

    return (
        <div className="h-screen overflow-y-scroll scrollbar-hide grid items-center justify-center">
            <div className="m-3 border rounded">
                <InterviewSetup
                    userName={props.userName}
                    userEmail={props.userEmail}
                    updatePhase={props.updatePhase}

                    updateSimpleHistory={props.updateSimpleHistory}
                    updateChatData={props.updateChatData}

                    selectedLanguages={selectedLanguages}
                    updateSelectedLanguages={updateSelectedLanguages}
                    company={company}
                    updateCompany={updateCompany}
                    position={position}
                    updatePosition={updatePosition}
                    resumeUrl={resumeUrl}
                    updateResumeUrl={updateResumeUrl}

                    updateSelectedItem={props.updateSelectedItem}  
                />
            </div>
        </div>
    )
}

export default NewSession