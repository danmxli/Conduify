import { FC, useState } from "react";
import { parseAnalysis } from "@/modules/chatbot-response";
import { IoIosArrowDropdown } from "react-icons/io";

interface ResumeAnalysisProps {
    content: string;
}

interface BotAnalysis {
    chunk: string;
    feedback: string;
}

const ResumeAnalysis: FC<ResumeAnalysisProps> = (props): JSX.Element => {
    const analysis: BotAnalysis[] = parseAnalysis(props.content);

    // keep track of expanded items
    const [expandedItems, setExpandedItems] = useState<number[]>([]);

    const handleToggleExpand = (index: number): void => {
        setExpandedItems((prev) =>
            prev.includes(index) ? prev.filter((item) => item !== index) : [...prev, index]
        );
    };

    return (
        <div className="space-y-6 p-3">
            {analysis.map((item, index) => (
                <div key={index} className="p-3 rounded-2xl bg-gray-50">
                    <h1>{item.chunk}</h1>
                    <button
                        className="mt-3 inline-flex items-center gap-1 p-1.5 pl-3 pr-3 rounded-2xl bg-emerald-400/10 hover:bg-emerald-400/20 text-emerald-600"
                        onClick={() => handleToggleExpand(index)}
                    >
                        <IoIosArrowDropdown
                            className={`transform ${expandedItems.includes(index) ? 'rotate-180' : ''}`}
                        />
                        Analysis
                    </button>
                    {expandedItems.includes(index) && (
                        <div className="mt-3 text-gray-700">{item.feedback}</div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default ResumeAnalysis;
