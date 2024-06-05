import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from './components/Nabvar'
import { AuthProvider } from './lib/AuthContext'
import { AppProvider } from './lib/AppContext'
import { UploadPhotoProvider } from './lib/UploadPhotoContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Dashboard Usuriaga collection',
  description: 'Dashboard Usuriaga collection',
}

export default function RootLayout({ children, forms, alert }) {
  return (
    <html lang="es">
      <body className={'relative ' + inter.className}>
        <AuthProvider>
          <AppProvider>
            <UploadPhotoProvider>
                <Navbar />
                {children}
                {forms}
                {alert}
            </UploadPhotoProvider>
          </AppProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
