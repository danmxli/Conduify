'use client'
import { withPageAuthRequired } from '@auth0/nextjs-auth0/client';
import React, { useState, useEffect, useRef } from 'react';
import Loading from '@/components/shared/loading';
import Sidebar from '@/components/shared/sidebar';
import NewSession from '@/components/new-session/new-session';
import ActiveSession from '@/components/active-session/active-session';

export default withPageAuthRequired(function Dashboard({ user }) {
    const [loading, setLoading] = useState(false)
    const fetchExecuted = useRef(false)

    // phases for rendering components
    const [phase, setPhase] = useState('NewSession')
    const updatePhase = (newPhase: string) => {
        setPhase(newPhase)
    }
    // simple history state
    const [simpleHistory, setSimpleHistory] = useState(Array<{
        _id: string,
        company: string,
        position: string,
        languages: Array<string>
        c_logo: string
    }>)
    const updateSimpleHistory = (newHistory: Array<{
        _id: string,
        company: string,
        position: string,
        languages: Array<string>
        c_logo: string
    }>) => {
        setSimpleHistory(newHistory)
    }

    interface PagePhases {
        [key: string]: React.ReactNode;
    }
    const currPage: PagePhases = {
        NewSession: <NewSession updatePhase={updatePhase} />,
        ActiveSession: <ActiveSession updatePhase={updatePhase} />
        
    }

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
                const data = await response.json();
                if (data) {
                    console.log(data)
                    updateSimpleHistory(data)
                    setLoading(false)
                }
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
                <div className='flex'>
                    <Sidebar name={user.name} email={user.email} picture={user.picture} simpleHistory={simpleHistory} updateSimpleHistory={updateSimpleHistory} />
                    <main className='flex-1'>
                        {currPage[phase]}
                    </main>
                </div>
            )}
        </>
    )
})