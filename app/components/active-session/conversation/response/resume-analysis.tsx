import { FC, useState } from "react"
import { IoIosArrowDropdown } from "react-icons/io";

interface ResumeAnalysisProps {
    content: string
}

const ResumeAnalysis: FC<ResumeAnalysisProps> = (props): JSX.Element => {

    // TODO BotEvaluation, split using regex
    const evaluation: Array<string> = props.content.split(/\n\/\/\/BREAK\/\/\/\n/);

    return (
        <div className="space-y-6 p-3">
            {evaluation.map((item, index) => (
                <div key={index} className="p-3 rounded-2xl bg-gray-50">
                    <h1>
                        {item}
                    </h1>
                    <button
                        className="mt-3 inline-flex items-center gap-1 p-1.5 pl-3 pr-3 rounded-2xl bg-emerald-400/10 hover:bg-emerald-400/20 text-emerald-600"
                        onClick={() => {
                            
                        }}
                    ><IoIosArrowDropdown className={``} />Analysis</button>
                </div>
            ))}
        </div>
    )
}

export default ResumeAnalysis