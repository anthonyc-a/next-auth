import { SessionProvider } from "next-auth/react"
import type { AppProps } from "next/app"
import "../styles/globals.css";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session} refetchInterval={0}>
      <Component {...pageProps} />
    </SessionProvider>
  )
}