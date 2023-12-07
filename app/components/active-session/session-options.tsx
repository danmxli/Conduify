import Image from "next/image"
import conduify from "../../public/conduify.svg"

const SessionOptions = () => {

    const StartOptions = [
        {
            title: "Interview Simulation",
            description: "Conversate with a LLM that is custom tailored for the job description and based on your resume."
        },
        {
            title: "Resume Analysis",
            description: "Identify strengths and areas for improvement. Determine correlation to job description."
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
                    <button
                        key={index}
                        className="bg-gray-50 p-3 rounded shadow text-left transition ease-in-out delay-150 hover:scale-110"
                    >
                        <h1>{item.title}</h1>
                        <p className="text-xs text-gray-600">{item.description}</p>
                    </button>
                ))}

            </div>
        </div>
    )
}

export default SessionOptions