import { FaGithub } from "react-icons/fa";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

const BriefDescription = () => {

    return (
        <div className='p-3 flex flex-col'>
            <div className='p-6 max-w-xl'>
                <Card>                    
                    <CardHeader>
                        <CardTitle>Interview <span className='text-indigo-800'>Guidance</span> and Resume <span className='text-indigo-800'>Evaluation</span> powered by AI.</CardTitle>
                        <CardDescription>Realize your full potential in the software industry.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p className='text-gray-600 mb-3'>
                            Conduify&apos;s LLM Agent specializes in crafting intuitive interview questions, and providing insightful resume tips to further highlight your skillset.
                        </p>
                    </CardContent>
                    <CardFooter>
                        <a className='text-indigo-900 flex items-center gap-1' href='https://github.com/danmxli/Conduify'>
                            <FaGithub />Version 0.1.0
                        </a>
                    </CardFooter>
                </Card>
            </div>
        </div>
    )
}

export default BriefDescription