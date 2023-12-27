import React, { FC } from "react"
import InterviewEvaluation from "./response/interview-evaluation";
import ResumeAnalysis from "./response/resume-analysis";
import { MdOutlineAnalytics, MdChecklistRtl, MdHdrStrong } from "react-icons/md";


interface BotMessageProps {
    message_type: string
    content: string
}

const BotMessage: FC<BotMessageProps> = (props): JSX.Element => {

    interface MessageTypeProps {
        [key: string]: React.ReactNode
    }
    const message_type: MessageTypeProps = {
        resume_analysis:
            <div className="rounded-2xl bg-emerald-100 shadow text-gray-800 whitespace-pre-line">
                <h1 className="p-3 text-emerald-800 flex items-center justify-between">Resume Analysis <MdOutlineAnalytics /></h1>
                <div className="p-3 bg-white rounded-b-2xl">
                    <ResumeAnalysis content={props.content} />
                </div>
            </div>,
        response_evaluation:
            <div className="rounded-2xl bg-indigo-100 shadow text-gray-800 whitespace-pre-line">
                <h1 className="p-3 text-indigo-800 flex items-center justify-between">Response Evaluation <MdChecklistRtl /></h1>
                <div className="p-3 bg-white rounded-b-2xl">
                    <InterviewEvaluation content={props.content} />
                </div>
            </div>,
        interview:
            <div className="rounded-2xl bg-fuchsia-100 shadow text-gray-800 whitespace-pre-line">
                <h1 className="p-3 text-fuchsia-800 flex items-center justify-between">Interview Simulation <MdHdrStrong /></h1>
                <div className="p-3 bg-white rounded-b-2xl">
                    {props.content}
                </div>
            </div>,
    }

    return (
        <>
            {message_type[props.message_type]}
        </>
    )
}

export default BotMessage