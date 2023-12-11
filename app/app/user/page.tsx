'use client'
import { withPageAuthRequired } from '@auth0/nextjs-auth0/client'
import Sidebar from '@/components/shared/info-sidebar'

export default withPageAuthRequired(function User({ user }) {
    return (
        <div className='flex'>
            <Sidebar name={user.name} email={user.email} picture={user.picture} />
            <main className='flex-1'>
                user info
            </main>
        </div>
    )
})