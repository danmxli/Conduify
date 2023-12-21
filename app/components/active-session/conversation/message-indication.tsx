import { FC } from "react"

interface MessageIndicationProps {
    message_type: string
}

const MessageIndication: FC<MessageIndicationProps> = (props): JSX.Element => {
    if (props.message_type === 'resume_analysis') {
        return (
            <div className="p-3 text-indigo-600">
                <h1>
                    Resume Analysis
                </h1>
            </div>
        )
    }
    else if (props.message_type === 'response_evaluation') {
        return (
            <div className="p-3 text-indigo-600">
                <h1>
                    Response Evaluation
                </h1>
            </div>
        )
    }
    else {
        return (
            <div className="p-3 text-indigo-600">
                <h1>
                    Interview
                </h1>
            </div>
        )
    }
}

export default MessageIndication