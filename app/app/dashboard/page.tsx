'use client'
import { withPageAuthRequired } from '@auth0/nextjs-auth0/client';
import React, { useState, useEffect, useRef } from 'react';
import Loading from '@/components/shared/loading';
import Sidebar from '@/components/shared/session-sidebar';
import NewSession from '@/components/new-session/new-session';
import ActiveSession from '@/components/active-session/active-session';

export default withPageAuthRequired(function Dashboard({ user }) {
    const [loading, setLoading] = useState(false)
    const fetchExecuted = useRef(false)

    // NewSession, ActiveSession
    const [phase, setPhase] = useState('NewSession')
    const updatePhase = (newPhase: string) => {
        setPhase(newPhase)
    }

    // interfaces
    interface SimpleHistoryItem {
        _id: string,
        company: string,
        position: string,
        languages: Array<string>
        c_logo: string
    }
    interface ChatDataItem {
        _id: string,
        c_business: string,
        c_name: string,
        c_description: string,
        c_logo: string,
        interview_sessions: Array<any> // TODO  
        interviewee: string,
        resume: string,
        languages: Array<string>
    }

    // simple history state
    const [simpleHistory, setSimpleHistory] = useState<SimpleHistoryItem[]>([])
    const updateSimpleHistory = (newHistory: SimpleHistoryItem[]) => {
        setSimpleHistory(newHistory)
    }

    // chat data state
    const [chatData, setChatData] = useState<ChatDataItem>()
    const updateChatData = (newChatData: ChatDataItem) => { // TODO sidebar
        setChatData(newChatData)
    }

    // user input state
    const [inputState, setInputState] = useState('ask')
    const updateInputState = (newInputState: string) => {
        setInputState(newInputState)
    }

    // sidebar item selection state
    const [selectedItem, setSelectedItem] = useState('')
    const updateSelectedItem = (newItem: string) => {
        setSelectedItem(newItem)
    }

    // component phases
    interface PagePhases {
        [key: string]: React.ReactNode;
    }
    const currPage: PagePhases = {
        NewSession: <NewSession userName={user.name} userEmail={user.email} updatePhase={updatePhase} updateSimpleHistory={updateSimpleHistory} updateChatData={updateChatData} updateInputState={updateInputState} updateSelectedItem={updateSelectedItem} />,
        ActiveSession: <ActiveSession userName={user.name} userEmail={user.email} picture={user.picture} chatData={chatData} inputState={inputState} updateInputState={updateInputState} updatePhase={updatePhase} />
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
                    <Sidebar name={user.name} email={user.email} picture={user.picture} updatePhase={updatePhase} simpleHistory={simpleHistory} updateChatData={updateChatData} updateInputState={updateInputState} selectedItem={selectedItem} updateSelectedItem={updateSelectedItem} />
                    <main className='flex-1'>
                        {currPage[phase]}
                    </main>
                </div>
            )}
        </>
    )
})