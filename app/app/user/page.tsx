'use client'
import { withPageAuthRequired } from '@auth0/nextjs-auth0/client'
import React, { useState, useEffect, useRef } from 'react';
import Loading from '@/components/shared/loading';
import Sidebar from '@/components/shared/info-sidebar'

export default withPageAuthRequired(function User({ user }) {
    const [loading, setLoading] = useState(false)
    const fetchExecuted = useRef(false)

    return (
        <div className='flex'>
            <Sidebar name={user.name} email={user.email} picture={user.picture} />
            <main className='flex-1'>
                user info
            </main>
        </div>
    )
})