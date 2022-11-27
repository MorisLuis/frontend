import '../styles/Globals.scss'
import type { AppProps } from 'next/app'
import { Toaster } from 'react-hot-toast'
import { AuthProvider } from '../context/auth/AuthProvider';
import { UIProvider } from '../context/ui/UIProvider';
import NextNProgress from 'nextjs-progressbar'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <NextNProgress color="#e23542" height={4} />
      <Toaster />
      <AuthProvider>
        <UIProvider>
          <Component {...pageProps} />
        </UIProvider>
      </AuthProvider>
    </>
  )
}
