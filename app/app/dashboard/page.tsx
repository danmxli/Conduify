'use client'
import { withPageAuthRequired } from '@auth0/nextjs-auth0/client';
import { useState, useEffect, useRef } from 'react';
import Loading from '@/components/shared/loading';
import Sidebar from '@/components/shared/sidebar';

export default withPageAuthRequired(function Dashboard({ user }) {
    const [loading, setLoading] = useState(false)
    const fetchExecuted = useRef(false)

    // access user information
    const access = async (name: string | null | undefined, email: string | null | undefined) => {
        if (name === null || name === undefined || email === null || email === undefined) {
            console.log('Name and email are required');
            return;
        }
        const requestBody = {
            name: name,
            email: email
        }
        setLoading(true)
        try {
            const response = await fetch('http://127.0.0.1:5000/users/access', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody),
            })
            if (response.ok) {
                setLoading(false)
            }
            else {
                console.error('Request failed with status:', response.status);
            }
        }
        catch (error) {
            console.error('Fetch request error:', error);
        }
    }

    useEffect(() => {
        if (!fetchExecuted.current) {
            access(user.name, user.email)
            fetchExecuted.current = true
        }
    })

    return (
        <>
            {loading ? (
                <Loading />
            ) : (
                <div className='flex-h-screen'>
                    <Sidebar name={user.name} email={user.email} picture={user.picture} />
                    <main className='flex-1'>

                    </main>
                </div>
            )}
        </>
    )
})