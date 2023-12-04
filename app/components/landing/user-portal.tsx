import { useRouter } from 'next/navigation';
import { useUser } from '@auth0/nextjs-auth0/client';
import Image from 'next/image';

const UserPortal = () => {
    const router = useRouter()
    const { user, isLoading } = useUser()

    return (
        <>
            {user ? (
                <>
                    <button
                        className='rounded-full w-56 py-4 font-semibold flex items-center justify-center bg-gray-900 text-white hover:cursor-pointer flex gap-x-2'
                        onClick={() => {

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
                            <h1>Go to dashboard</h1>
                        </div>
                    </button>
                    <a
                        className='rounded-full w-56 py-4 font-semibold flex items-center justify-center bg-gray-400 text-white hover:cursor-pointer flex gap-x-2'
                        href="/api/auth/logout"
                    >
                        <div className='flex items-center gap-3'>
                            Logout
                        </div>
                    </a>
                </>

            ) : (
                <>
                    {isLoading ? (
                        <div className='rounded-full w-56 py-4 font-semibold flex items-center justify-center bg-gray-900 text-white hover:cursor-pointer flex gap-x-2'>
                            Loading details...
                        </div>
                    ) : (
                        <a
                            className='rounded-full w-56 py-4 font-semibold flex items-center justify-center bg-gray-900 text-white hover:cursor-pointer flex gap-x-2'
                            href='/api/auth/login'
                        >
                            Login
                        </a>
                    )}
                </>

            )}


        </>
    )
}

export default UserPortal