import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from './components/Nabvar'
import { AuthProvider } from './lib/AuthContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Dashboard Usuriaga collection',
  description: 'Dashboard Usuriaga collection',
}

export default function RootLayout({ children }) {
  return (
    <html lang="es">
       <body className={'relative ' + inter.className}>
    <AuthProvider>

        <Navbar />
        {children}
    </AuthProvider>
      </body>
    </html>
  )
}
