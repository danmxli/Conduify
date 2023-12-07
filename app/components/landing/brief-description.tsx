import Image from 'next/image'
import conduify from '../../public/conduify.svg'
import { useRouter } from 'next/navigation';

const BriefDescription = () => {
    const router = useRouter()
    
    return (
        <>
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
            <button onClick={() => {
                router.push('/about')
            }}>
                <div className="ml-3 sm:ml-0 bg-gray-100 hover:bg-indigo-50 shadow-md p-1 rounded-xl">
                    <Image src={conduify} alt='conduify' width={35} height={35} />
                    <h2 className="text-sm sm:text-base">
                        About Conduify.
                    </h2>
                    <p className='text-xs text-indigo-500'>
                        <code>Built with passion, available for all.</code>
                    </p>
                </div>
            </button>
        </>
    )
}

export default BriefDescription