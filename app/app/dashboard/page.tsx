'use client'
import { withPageAuthRequired } from '@auth0/nextjs-auth0/client';
import React, { useState, useEffect, useRef } from 'react';
import { useAppDispatch } from '@/lib/hooks';
import { AppDispatch } from '@/lib/store';
import { updateInfo } from '@/lib/features/userSlice';

import Sidebar from '@/components/shared/info-sidebar'

export default withPageAuthRequired(function Dashboard({ user }) {
    const fetchExecuted = useRef(false)
    const dispatch = useAppDispatch<AppDispatch>();

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
        languages: Array<string>,
        position: string
    }

    // component phases
    interface PagePhases {
        [key: string]: React.ReactNode;
    }

    useEffect(() => {
        if (!fetchExecuted.current) {
            dispatch(updateInfo(user))
            fetchExecuted.current = true
        }
    })

    return (
        <div className='flex'>
            <Sidebar />
            <main className='flex-1'>
                
            </main>
        </div>
    )
})