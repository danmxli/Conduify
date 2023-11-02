import { motion } from 'framer-motion'
import { useNavigate } from "react-router-dom";
import { AiFillAmazonCircle, AiFillGoogleCircle, AiFillApple } from 'react-icons/ai'
import { BiLogoMeta, BiLogoMicrosoft, BiLogoShopify } from 'react-icons/bi'
import { SiNotion, SiCoinbase } from 'react-icons/si'

const Landing = () => {

    const navigate = useNavigate();

    return (
        <div className="min-h-[100vh] sm:min-h-screen w-screen flex flex-col mb-8 sm:mb-0">
            <main className="flex flex-col justify-center h-[90%] w-screen overflow-scroll scrollbar-hide grid-rows-3 p-2 sm:p-16">
                <motion.h1
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                        delay: 0.15,
                        duration: 0.95,
                        ease: [0.165, 0.84, 0.44, 1],
                    }}
                    className="relative md:ml-[-10px] md:mb-[37px] text-[16vw] md:text-[130px] text-[#1E2B3A] leading-[0.9] tracking-[-2px] z-[100]">
                    Introducing the <br />
                    <span className="text-indigo-500">Conduify </span><span className='text-gray-400'>project.</span>
                </motion.h1>
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                        delay: 0.15,
                        duration: 0.95,
                        ease: [0.165, 0.84, 0.44, 1],
                    }}
                    className="flex flex-row justify-center z-20 mx-0 mb-0 mt-8 md:mt-0 md:mb-[35px] max-w-3xl md:space-x-8">
                    <div className="w-1/2">
                        <h2 className="flex items-center font-semibold sm:text-xl">
                            Forging the Conduit to Success.
                        </h2>
                        <p className="text-xs sm:text-sm leading-[20px] font-normal">
                            Aspiring engineer or computer scientist? Our mission is to prepare you for the next big step of your career path.
                        </p>
                    </div>
                    <div className="w-1/2 ml-3 sm:ml-0">
                        <h2 className="flex items-center font-semibold sm:text-xl">
                            Coherent and Clear.
                        </h2>
                        <p className="text-xs sm:text-sm leading-[20px] font-normal">
                            Our powerful assistant is driven by <a className='text-indigo-500' href='https://cohere.com/'>artificial intelligence.</a> Accelerate your productiveness with cutting edge technologies.
                        </p>
                    </div>
                    <a href='https://conduitcode.vercel.app/'>
                        <div className="ml-3 sm:ml-0 bg-gray-100 hover:bg-indigo-50 shadow-md p-1 rounded-xl">
                            <img
                                className='h-12'
                                src='/codeBuddy.svg' alt='code'
                            >
                            </img>
                            <h2 className="text-sm sm:text-base flex items-center">
                                Meet conduitCode.
                            </h2>
                            <p className='text-xs text-indigo-500'>
                                <code>your online code optimization assistant.</code>
                            </p>
                        </div>
                    </a>

                </motion.div>
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                        delay: 0.55,
                        duration: 0.55,
                        ease: [0.075, 0.82, 0.965, 1],
                    }}
                    className="flex gap-[15px] text-sm sm:text-base mt-8 md:mt-0">
                    <button
                        className='rounded-full w-56 py-4 font-semibold flex items-center justify-center bg-gray-900 text-white hover:cursor-pointer flex gap-x-2'
                        onClick={() => {
                            navigate('/home')
                        }}
                    >
                        Begin your journey
                    </button>
                    <button
                        className='rounded-full w-56 py-4 font-semibold flex items-center justify-center bg-gray-400 text-white hover:cursor-pointer flex gap-x-2'
                        onClick={() => {
                            navigate('/about')
                        }}
                    >
                        Learn more
                    </button>
                </motion.div>
            </main>
            <img
                className="z-50 fixed top-0 right-[-2px] w-[80%] md:w-1/3 h-screen opacity-0 sm:opacity-20"
                src='/interviewify.svg' alt='Logo'
            ></img>
            <div className="h-[60px] bg-gray-950 text-gray-400 fixed bottom-0 z-20 w-full flex flex-row items-center justify-evenly sm:text-2xl pl-2 sm:pl-0 pr-2 sm:pr-0">
                <>
                    <code className="text-xs sm:text-base">Practice interviews for companies including:</code>
                </>
                <div className='inline-flex'>
                    <AiFillAmazonCircle className='sm:text-3xl' />
                </div>
                <div className='inline-flex'>
                    <AiFillGoogleCircle className='sm:text-3xl' />
                </div>
                <div className='inline-flex'>
                    <BiLogoMeta className='sm:text-3xl' />
                </div>
                <div className='inline-flex'>
                    <AiFillApple className='sm:text-3xl' />
                </div>
                <div className='inline-flex'>
                    <BiLogoMicrosoft className='sm:text-3xl' />
                </div>
                <div className='inline-flex'>
                    <SiNotion className='sm:text-3xl' />
                </div>
                <div className='inline-flex'>
                    <SiCoinbase className='sm:text-3xl' />
                </div>
                <div className='inline-flex'>
                    <BiLogoShopify className='sm:text-3xl' />
                </div>

            </div>
        </div>
    )
}

export default Landing