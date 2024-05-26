'use client'
import { withPageAuthRequired } from '@auth0/nextjs-auth0/client';
import React, { useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { RootState, AppDispatch } from '@/lib/store';
import { updateInfo } from '@/lib/features/userSlice';

import Sidebar from '@/components/shared/info-sidebar'
import NewSession from '@/components/dashboard/new-session';
import ExploreAgents from '@/components/dashboard/explore-agents';

export default withPageAuthRequired(function Dashboard({ user }) {
    const fetchExecuted = useRef(false)
    const dispatch = useAppDispatch<AppDispatch>();
    const navPhase = useAppSelector((state: RootState) => state.dashboard.navPhase)

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

    interface dashboardNavPhases {
        [key: string]: React.ReactNode;
    }
    const dashboardNav: dashboardNavPhases = {
        newSession: <NewSession />,
        explore: <ExploreAgents />
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
                {dashboardNav[navPhase]}
            </main>
        </div>
    )
})