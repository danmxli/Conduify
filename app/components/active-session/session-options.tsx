import React, { FC } from "react"
import Image from "next/image"
import conduify from "../../public/conduify.svg"

interface SessionOptionsProps {
    onChoose: (text: string) => Promise<void>;
}

const SessionOptions: FC<SessionOptionsProps> = (props): JSX.Element => {

    const StartOptions = [
        {
            title: "Interview Simulation",
            description: "Conversate with a LLM that is custom tailored for the job description and based on your resume.",
            prompt: "Conduct my interview"
        },
        {
            title: "Resume Analysis",
            description: "Identify strengths and areas for improvement. Determine correlation to job description.",
            prompt: "Analyze my resume"
        }
    ]

    return (
        <div className="h-full m-12 grid items-center justify-center">
            <div className="flex items-center justify-center gap-3">
                <Image src={conduify} alt="conduify" width={60} height={60} />
                <h1 className="text-3xl">Let&apos;s get started.</h1>
            </div>

            <div className="grid grid-cols-2 gap-6">
                {StartOptions.map((item, index) => (
                    <div key={index}>
                        <button
                            className="bg-gray-50 p-3 rounded shadow text-left transition ease-in-out delay-150 hover:scale-110"
                            onClick={() => {
                                props.onChoose(item.prompt)
                            }}
                        >
                            <h1>{item.title}</h1>
                            <p className="text-xs text-gray-600">{item.description}</p>
                        </button>

                    </div>
                ))}

            </div>
        </div>
    )
}

export default SessionOptions