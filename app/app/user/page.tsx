'use client'
import { withPageAuthRequired } from '@auth0/nextjs-auth0/client'
import React, { useState, useEffect, useRef } from 'react';
import Sidebar from '@/components/shared/info-sidebar'
import { useAppDispatch } from '@/lib/hooks';
import { AppDispatch } from '@/lib/store';
import { updateInfo } from '@/lib/features/userSlice';

export default withPageAuthRequired(function User({ user }) {
    const fetchExecuted = useRef(false)
    const dispatch = useAppDispatch<AppDispatch>();

    useEffect(() => {
        if (!fetchExecuted.current) {
            dispatch(updateInfo(user))
            fetchExecuted.current = true;
        }
    })

    return (
        <div className='flex'>
            <Sidebar />
            <main className='flex-1'>
                user info
            </main>
        </div>
    )
})