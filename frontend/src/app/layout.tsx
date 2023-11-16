import type { Metadata } from 'next'
import './globals.css'
import { NextAuthProvider } from '@/provider/AuthProvider';
import Navbar from '@/components/Navbar';


export const metadata: Metadata = {
  title: 'ShareShip',
  description: 'ShareShip is a renting platform.',
}

type Props = {
  children: React.ReactNode;
};


export default function RootLayout({
  children,
}: 
  Props
) {
  return (
    <html lang="en">
      <body className={''}>
			<Navbar />
      <NextAuthProvider>
        {children}
      </NextAuthProvider>
      </body>
    </html>
  )
}