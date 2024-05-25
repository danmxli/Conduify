import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { UserProvider } from '@auth0/nextjs-auth0/client';
import StoreProvider from './StoreProvider';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Conduify',
  description: 'your personal interview preparation assistant.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <UserProvider>
        <StoreProvider>
          <body className={inter.className}>{children}</body>
        </StoreProvider>
      </UserProvider>
    </html>
  )
}
