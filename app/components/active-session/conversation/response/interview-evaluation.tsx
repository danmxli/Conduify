import { FC } from "react"
import { parseResponse } from "@/modules/chatbot-response"
import { BsLightningCharge, BsBarChart } from "react-icons/bs";

interface InterviewEvaluationProps {
    content: string
}

const InterviewEvaluation: FC<InterviewEvaluationProps> = (props): JSX.Element => {

    interface BotEvaluation {
        [key: string]: Array<string>
    }
    const evaluation: BotEvaluation = parseResponse(props.content)
    console.log(Object.entries(evaluation))

    return (
        <div className="space-y-3">
            {Object.entries(evaluation).map(([category, comments]) => (
                <div key={category} className={`p-3 rounded-2xl ${category === "Strengths" ? "bg-indigo-50/50" : "bg-gray-50"}`}>
                    <>
                        {
                            category === "Strengths" ? (
                                <div className="mb-3 inline-flex items-center gap-1 p-1.5 pl-3 pr-3 rounded-2xl bg-indigo-100 text-indigo-600">
                                    <BsLightningCharge />
                                    {category}
                                </div>
                            ) : (
                                <div className="mb-3 inline-flex items-center gap-1 p-1.5 pl-3 pr-3 rounded-2xl bg-gray-200 text-gray-600">
                                    <BsBarChart />
                                    {category}
                                </div>
                            )
                        }
                    </>
                    <ul className="space-y-1.5">
                        {comments.map((comment, index) => (
                            <li key={index}>{comment}</li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    )
}

export default InterviewEvaluation