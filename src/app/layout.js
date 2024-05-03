import { Inter } from 'next/font/google'
import './globals.css'
import Image from 'next/image'
import Link from 'next/link'
import Navbar from './components/Nabvar'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Dashboard Usuriaga collection',
  description: 'Dashboard Usuriaga collection',
}

export default function RootLayout({ children }) {
  return (
    <html lang="es">
       <body className={'relative ' + inter.className}>
        <Navbar />
        {children}
      </body>
    </html>
  )
}
