import '../styles/globals.css'
import '../styles/custom.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { CookiesProvider } from 'react-cookie'
<<<<<<< HEAD

function MyApp({ Component, pageProps }) {
=======
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import * as ga from '../lib/ga'

function MyApp({ Component, pageProps }) {
  const router = useRouter()

  useEffect(() => {
    const handleRouteChange = (url) => {
      ga.pageview(url)
    }
    // When the component is mounted, subscribe to router changes
    // and log those page views
    router.events.on('routeChangeComplete', handleRouteChange)

    // If the component is unmounted, unsubscribe
    // from the event with the `off` method
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])

>>>>>>> 80d387d2f4a2ea09ad7ee39e5994f8e1d3b3c6a3
  return <CookiesProvider><Component {...pageProps} /></CookiesProvider>
}

export default MyApp;
