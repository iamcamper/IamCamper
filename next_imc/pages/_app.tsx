import '../styles/globals.css'
import type { AppProps } from 'next/app'
import '../com/main.css'

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
