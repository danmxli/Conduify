'use client'
import Image from 'next/image'
import conduify from '../../public/conduify.svg'
import { useRouter } from 'next/navigation';

const BriefDescription = () => {
    const router = useRouter()

    return (
        <div className='p-3 flex flex-col'>
            <div className='flex justify-center'>
                <Image src={conduify} alt='conduify' priority className='w-72' />
            </div>

            <div className='p-3 bg-gray-50 rounded shadow max-w-xl'>
                <h1 className='text-xl'>
                    AI powered interview guidance and evaluation platform.
                </h1>
                <p className='text-gray-600'>
                    👨🏻‍🏫 your personal interview preparation assistant.

                    💫 Ace your interviews with Conduify. With test-driven methodologies, you will be way ahead of the competition!
                </p>
            </div>
        </div>
    )
}

export default BriefDescription