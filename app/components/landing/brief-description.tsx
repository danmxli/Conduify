import Image from 'next/image'
import conduify from '../../public/conduify.svg'
import { FaGithub } from "react-icons/fa";

const BriefDescription = () => {

    return (
        <div className='p-3 flex flex-col'>
            <div className='flex justify-center'>
                <Image src={conduify} alt='conduify' priority className='w-72' />
            </div>

            <div className='p-6 border rounded shadow max-w-xl'>
                <h1 className='sm:text-3xl'>
                    Interview <span className='text-indigo-800'>Guidance</span> and Resume <span className='text-indigo-800'>Evaluation</span> powered by AI.
                </h1>
                <p className='text-gray-400 text-sm mb-3'>
                    Realize your full potential in the software industry.
                </p>
                <p className='text-gray-600 mb-3'>
                    Conduify&apos;s LLM Agent specializes in crafting intuitive interview questions, and providing insightful resume tips to further highlight your skillset.
                </p>
                <a className='text-indigo-900 flex items-center gap-1' href='https://github.com/danmxli/Conduify'>
                    <FaGithub />Version 0.1.0
                </a>
            </div>
        </div>
    )
}

export default BriefDescription