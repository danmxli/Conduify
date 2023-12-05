import React, { FC } from "react"

interface InterviewSetupProps {
    selectedLanguages: Array<string>
    updateSelectedLanguages: (newLang: string) => void

    company: string
    updateCompany: (newCompany: string) => void

    position: string
    updatePosition: (newPosition: string) => void
}

const InterviewSetup: FC<InterviewSetupProps> = (props): JSX.Element => {

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
                <button className="mt-6 w-full bg-indigo-500 text-white p-2 rounded hover:bg-indigo-600">Start</button>
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