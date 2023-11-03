import { BsFillArrowRightCircleFill } from 'react-icons/bs'
import { motion } from 'framer-motion';

const PromptNextPage = ({ open, toggleSidebar, companyData }) => {
    // CURRENTLY UNDER DEVELOPMENT
    return (
        <div className='bg-indigo-500 w-full sm:rounded-l-3xl flex flex-col justify-center items-center'>
            {open ? (<>
                <motion.div
                    initial={{ opacity: 0, y: -300 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                        delay: 0.75,
                        duration: 0.95,
                        ease: [0.165, 0.84, 0.44, 1],
                    }}
                    className="m-5 sm:mt-0 p-4 bg-indigo-800 rounded-3xl inline-grid text-white">
                    <p className="sm:text-3xl">Ready to take it to the next level?</p>
                    <p className="mt-1 mb-2 text-xs sm:text-base">Attempt a hands-on techincal interview!</p>
                    <button className='inline-flex'>
                        <BsFillArrowRightCircleFill className={`rounded-md text-2xl sm:text-5xl duration-700 cursor-pointer text-indigo-300 hover:text-white`}
                            onClick={() => toggleSidebar(!open)} />
                    </button>
                </motion.div>
            </>) : (<></>)}

            {open ? (<></>) : (<>
                <motion.div
                    initial={{ opacity: 0, y: -300 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                        delay: 0.75,
                        duration: 0.95,
                        ease: [0.165, 0.84, 0.44, 1],
                    }}
                    className='flex flex-col justify-center items-center'>
                    <div className='m-5 p-4 max-w-lg bg-indigo-400 rounded-3xl inline-grid text-white'>
                        <p>Remember that a hands-on technical interview focuses on solving real-world problems, often using code. Be prepared to think spontaneously and critically!</p>
                        <button className='inline-flex'
                            onClick={() => toggleSidebar(!open)}>
                            <div
                                className='bg-indigo-700 p-1 pl-4 pr-4 mt-1 rounded'>
                                Back to session
                            </div>
                        </button>
                    </div>
                    <div className="m-5 sm:mb-0 p-4 bg-indigo-950 rounded-3xl inline-grid text-white">
                        <ul className={`text-sm sm:text-base break-words`}>
                            <b className='text-purple-400'>Hands-on Techinical Interview</b>
                            <li>
                                <strong>Company:</strong> {companyData.name}
                            </li>
                            <li>
                                <strong>Applied Position:</strong> {companyData.position}
                            </li>
                            <li>
                                <strong>Proficient Languages:</strong> {companyData.languages.join(', ')}
                            </li>
                        </ul>
                        <button
                            className='mt-2 text-indigo-950 font-bold bg-indigo-300 hover:bg-white transition duration-300 mb-2 p-2 rounded-xl text-xs sm:text-base'
                            type='submit'
                            onClick={() => {

                            }}
                        >
                            Start
                        </button>
                        <div className='bg-purple-500/30 text-center rounded-lg text-purple-400'>
                            This feature is in development.
                        </div>
                    </div>
                </motion.div>
            </>)}

        </div>
    );
}

export default PromptNextPage