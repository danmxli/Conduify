import { motion } from 'framer-motion'
import { useNavigate } from "react-router-dom";
import { AiFillAmazonCircle, AiFillGoogleCircle, AiFillApple } from 'react-icons/ai'
import { BiLogoMeta, BiLogoMicrosoft, BiLogoShopify } from 'react-icons/bi'
import { SiNotion, SiCoinbase } from 'react-icons/si'

const Landing = () => {

    const navigate = useNavigate();

    return (
        <div className="min-h-[100vh] sm:min-h-screen w-screen flex flex-col overflow-hidden">
            <main className="flex flex-col justify-center h-[90%] static md:fixed w-screen overflow-hidden grid-rows-[1fr_repeat(3,auto)_1fr] z-[100] pt-[30px] pb-[320px] px-4 md:px-20 md:py-0">
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
                    className="flex flex-row justify-center z-20 mx-0 mb-0 mt-8 md:mt-0 md:mb-[35px] max-w-2xl md:space-x-8">
                    <div className="w-1/2">
                        <h2 className="flex items-center font-semibold sm:text-xl">
                            Forging the Conduit to Success.
                        </h2>
                        <p className="text-xs sm:text-sm leading-[20px] font-normal">
                            Our mission is to get you ready for the next big step on your path towards landing that dream tech job.
                        </p>
                    </div>
                    <div className="w-1/2">
                        <h2 className="flex items-center font-semibold sm:text-xl">
                            Coherent and Clear.
                        </h2>
                        <p className="text-xs sm:text-sm leading-[20px] font-normal">
                            Our powerful assistant is driven by artificial intelligence. Accelerate your productiveness with cutting edge technologies.
                        </p>
                    </div>
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                        delay: 0.55,
                        duration: 0.55,
                        ease: [0.075, 0.82, 0.965, 1],
                    }}
                    className="flex gap-[15px] mt-8 md:mt-0">
                    <button
                        className='rounded-full min-w-[180px] py-4 font-semibold flex items-center justify-center bg-gray-900 text-white hover:cursor-pointer flex gap-x-2'
                        href='https://github.com/danmxli/Conduify'
                        onClick={() => {
                            navigate('/home')
                        }}
                    >
                        Begin your journey
                    </button>
                </motion.div>
            </main>
            <img
                className="z-50 fixed top-0 right-[-2px] w-[80%] md:w-1/3 h-screen opacity-20"
                src='/interviewify.svg' alt='Logo'
            ></img>
            <div className="h-[60px] bg-gray-950 text-gray-700 fixed bottom-0 z-20 w-full flex flex-row items-center justify-evenly text-xs sm:text-2xl">
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