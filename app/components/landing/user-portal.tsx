'use client'
import { useRouter } from 'next/navigation';
import { useUser } from '@auth0/nextjs-auth0/client';

import Image from 'next/image';
import conduify from '../../public/conduify.svg'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const UserPortal = () => {
    const router = useRouter()
    const { user, isLoading } = useUser()

    return (
        <main className='w-full h-screen flex items-center justify-center bg-gray-100'>
            <Card className='sm:w-96'>
                <div className='flex justify-center'>
                    <Image src={conduify} alt='conduify' priority className='w-48' />
                </div>
                <CardHeader className='flex items-center'>
                    <CardTitle>Conduify</CardTitle>
                    <CardDescription>{user ? `Welcome, ${user.name}!` : "Let's get you started."}</CardDescription>
                </CardHeader>
                <CardContent>
                    {user ? (
                        <div className='grid grid-cols-2 gap-3'>
                            
                            <Button
                                onClick={() => {
                                    router.push('/dashboard')
                                }}
                            >
                                Dashboard
                            </Button>
                            <Button variant="secondary"
                                onClick={() => {
                                    router.push('/user')
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
                                    User Info
                                </div>
                            </Button>
                        </div>

                    ) : (
                        <div className='flex justify-center'>
                            {isLoading ? (
                                <Button className='w-full' disabled>
                                    <span>Loading details...</span>
                                </Button>
                            ) : (
                                <Button className='w-full' asChild>
                                    <a href="/api/auth/login">Login</a>
                                </Button>
                            )}
                        </div>
                    )}
                </CardContent>

            </Card>
        </main>
    )
}

export default UserPortal