'use client'
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion'
import { AiFillDatabase, AiFillMail, AiFillGithub, AiFillLinkedin } from 'react-icons/ai'
import { FaUserAstronaut } from 'react-icons/fa'

export default function AboutMe () {
    const router = useRouter()
    return (
        <main className="grid grid-cols-1 sm:grid-cols-3">
            <div className='bg-gray-200 w-full h-screen items-center justify-center flex flex-col'>
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                        delay: 0.15,
                        duration: 0.95,
                        ease: [0.165, 0.84, 0.44, 1],
                    }}
                    className="bg-white mt-8 mb-8 ml-8 mr-8 sm:mr-0 p-8 h-screen rounded-3xl overflow-scroll scrollbar-hide"
                >
                    <button
                        className='text-sm font-bold text-indigo-600 bg-indigo-100 hover:bg-indigo-200 p-1 border border-indigo-400 rounded'
                        onClick={() => {
                           router.push('/') 
                        }}
                    >Back to Landing Page</button>
                    
                    <h1 className='text-2xl font-semibold text-zinc-600'>
                        A platform designed to convey your skills to the ever-expanding tech industry.
                    </h1>
                    <p className='mb-3 text-gray-400'><code>Streamlined and user friendly, Conduify optimizes interview preparation.</code></p>
                    <b>Our solution</b>
                    <p className='mb-3'>
                        We believe that conveying skills is not just about the description on paper - it is about how you present yourself in interviews. One of the most groundbreaking features of our platform is AI-powered interview simulation.
                    </p>
                    <b>A rapidly surging industry</b>
                    <p>
                        In the digital age, the tech industry is growing at an unprecedented pace. Job opportunities are abundant, but the competition is fierce. Job seekers, especially those with unconventional backgrounds, often struggle to effectively convey their skills and stand out in the crowd.
                    </p>
                </motion.div>
            </div>

            <div className="w-full sm:h-screen h-max bg-gray-200 items-center sm:items-start sm:pl-4 justify-center flex flex-col overflow-scroll scrollbar-hide gap-4 sm:rounded-r-3xl">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                        delay: 0.15,
                        duration: 0.95,
                        ease: [0.165, 0.84, 0.44, 1],
                    }}
                    className="bg-white w-11/12 p-6 rounded-3xl overflow-scroll scrollbar-hide"
                >
                    <h1 className='font-semibold text-2xl text-zinc-600'>
                        Innovative services.
                    </h1>
                    <p className='text-gray-400'><code>Standing on the shoulders of giants.</code></p>

                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                        delay: 0.55,
                        duration: 0.55,
                        ease: [0.075, 0.82, 0.965, 1],
                    }}
                    className="bg-indigo-950 w-1/2 p-4 rounded-3xl shadow-lg"
                >
                    <div className='text-white text-lg inline-flex items-center gap-1'>
                        <AiFillDatabase />
                        Data-Driven Insights
                    </div>
                    <p className='text-gray-400'>
                        We leverage data scraping to provide you with real-time company details.
                    </p>

                </motion.div>
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                        delay: 0.55,
                        duration: 0.55,
                        ease: [0.075, 0.82, 0.965, 1],
                    }}
                    className="bg-indigo-950 w-9/12 p-4 rounded-3xl shadow-lg"
                >
                    <div className='text-white text-lg inline-flex items-center gap-1'>
                        <FaUserAstronaut />
                        AI Assistant
                    </div>
                    <p className='text-gray-400'>
                        Our models operate effectively to analyze input and produce the best responses, from time complexity calculations to the conversion of pseudocode to Python.
                    </p>

                </motion.div>
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                        delay: 0.55,
                        duration: 0.55,
                        ease: [0.075, 0.82, 0.965, 1],
                    }}
                    className="bg-indigo-950 w-1/2 p-4 rounded-3xl shadow-lg"
                >
                    <div className='text-white text-lg inline-flex items-center gap-1'>
                        <AiFillDatabase />
                        Personalized Experience
                    </div>
                    <p className='text-gray-400'>
                        Customized responses, thanks to the integration of user and company data in the interview simulation.
                    </p>

                </motion.div>
            </div>
            <div className="w-full sm:h-screen h-max items-center justify-center flex flex-col overflow-scroll scrollbar-hide">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                        delay: 0.15,
                        duration: 0.95,
                        ease: [0.165, 0.84, 0.44, 1],
                    }}
                    className="bg-white p-8 m-4 rounded-3xl shadow-lg"
                >
                    <h1 className='text-2xl font-semibold text-zinc-600'>
                        About the creator.
                    </h1>
                    <div className='inline-flex gap-4 mt-3 mb-3'>
                        
                        <p className='text-gray-400'><code>Dan Li | Computer Engineering Candidate at The University of Waterloo.</code></p>
                    </div>


                    <p className='p-2 border border-2 border-indigo-100 bg-indigo-50/30 text-indigo-900 rounded-xl'>
                        As a student, finding internships is often a challenge. When I first embarked on the Conduify project, I wanted to build a platform that other people can use to practice interviews, research companies, and elevate their confidence. The future of the tech industry depends on capable engineers, scientists, and developers. Conduify will enable those individuals to shine brighter.
                    </p>
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                        delay: 0.55,
                        duration: 0.55,
                        ease: [0.075, 0.82, 0.965, 1],
                    }}
                    className="bg-white p-8 m-4 rounded-3xl shadow-lg text-center">
                    <h1 className='mb-2 text-lg font-semibold text-indigo-950'>
                        Open to connect.
                    </h1>
                    <div className="inline-grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 text-white">
                        <div className="bg-indigo-500 p-4 rounded-lg shadow-md hover:ring-4 ring-indigo-200 duration-300">
                            <a className="duration-300 cursor-pointer" href="mailto:danmuxingli@gmail.com">
                                <AiFillMail className="lg:text-4xl" />
                            </a>
                        </div>
                        <div className="bg-indigo-500 p-4 rounded-lg shadow-md hover:ring-4 ring-indigo-200 duration-300">
                            <a className="duration-300 cursor-pointer" href="https://www.linkedin.com/in/danli591/">
                                <AiFillLinkedin className="lg:text-4xl" />
                            </a>
                        </div>
                        <div className="bg-indigo-500 p-4 rounded-lg shadow-md hover:ring-4 ring-indigo-200 duration-300">
                            <a className="duration-300 cursor-pointer" href="https://github.com/danmxli">
                                <AiFillGithub className="lg:text-4xl" />
                            </a>
                        </div>
                    </div>
                </motion.div>
            </div>
        </main>
    )
}