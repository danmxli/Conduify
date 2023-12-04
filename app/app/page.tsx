'use client'
import { motion } from 'framer-motion'
import BriefDescription from '@/components/landing/brief-description';
import UserPortal from '@/components/landing/user-portal';
import CompanyFooter from '@/components/landing/company-footer';


export default function Landing() {
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
          <BriefDescription />
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
          <UserPortal />
        </motion.div>
      </main>
      <div className="h-[60px] bg-gray-950 text-gray-400 fixed bottom-0 z-20 w-full flex flex-row items-center justify-evenly sm:text-2xl pl-2 sm:pl-0 pr-2 sm:pr-0">
        <CompanyFooter />
      </div>
    </div>
  )
}
