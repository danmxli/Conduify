'use client'
import { useRouter } from 'next/navigation';
import { useUser } from '@auth0/nextjs-auth0/client';
import Image from 'next/image';

const UserPortal = () => {
    const router = useRouter()
    const { user, isLoading } = useUser()

    return (
        <div className='p-3'>
            <h1 className='text-2xl sm:text-7xl text-center mb-9'>Introducing <br/>
                <span className="text-indigo-800">Conduify.</span>
            </h1>
            {user ? (
                <div className='grid sm:grid-cols-3 gap-3'>
                    
                    <button
                        className='sm:col-span-2 rounded p-3 flex items-center justify-center bg-indigo-600 shadow-inner shadow-indigo-400 hover:bg-indigo-800 text-white'
                        onClick={() => {
                            router.push('/dashboard')
                        }}
                    >
                        <div className='flex items-center gap-3'>
                            {user.picture ? (
                                <Image
                                    src={user.picture}
                                    alt='picture'
                                    width={20}
                                    height={20}
                                    className='rounded-full'
                                />
                            ) : (
                                <Image
                                    src={'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y'}
                                    alt='picture'
                                    width={20}
                                    height={20}
                                    className='rounded-full'
                                />
                            )}
                            Go to Dashboard
                        </div>
                    </button>
                    <a
                        className='rounded p-3 flex items-center justify-center bg-gray-400 hover:bg-gray-500/75 shadow text-white'
                        href="/api/auth/logout"
                    >
                        <div className='flex items-center gap-3'>
                            Logout
                        </div>
                    </a>
                </div>

            ) : (
                <div className='flex justify-center'>
                    {isLoading ? (
                        <div className='rounded p-3 pl-9 pr-9 inline-flex bg-gray-900 text-white'>
                            Loading details...
                        </div>
                    ) : (
                        <a
                            className='rounded p-3 pl-20 pr-20 inline-flex bg-indigo-600 shadow-inner shadow-indigo-400 hover:bg-indigo-800 text-white'
                            href='/api/auth/login'
                        >
                            Login
                        </a>
                    )}
                </div>
            )}
        </div>
    )
}

export default UserPortal