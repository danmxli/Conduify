import { FC } from "react"

interface ResumeAnalysisProps {
    content: string
}

const ResumeAnalysis: FC<ResumeAnalysisProps> = (props): JSX.Element => {

    // TODO BotEvaluation, split using regex
    const evaluation: Array<string> = props.content.split(/\n\/\/\/BREAK\/\/\/\n/);

    return (
        <div>
            {evaluation.map((item, index) => (
                <div key={index}>
                    {item}
                </div>
            ))}
        </div>
    )
}

export default ResumeAnalysis