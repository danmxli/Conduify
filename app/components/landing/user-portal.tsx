import { useRouter } from 'next/navigation';

const UserPortal = () => {
    const router = useRouter()
    return (
        <>
            <a
                className='rounded-full w-56 py-4 font-semibold flex items-center justify-center bg-gray-900 text-white hover:cursor-pointer flex gap-x-2'
                href='/api/auth/login'
            >
                Login
            </a>
            
        </>
    )
}

export default UserPortal