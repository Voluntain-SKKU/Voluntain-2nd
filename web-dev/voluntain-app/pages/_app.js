import '../styles/globals.css'
import '../styles/custom.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { CookiesProvider, useCookies } from 'react-cookie'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import * as ga from '../lib/ga'
import Head from 'next/head'

function MyApp({ Component, pageProps }) {
  const router = useRouter()
  const [cookies, setCookie, removeCookie] = useCookies(['noAnalytics']);

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

  return (
    <>
      <Head>
        <script async src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`} />
        <script dangerouslySetInnerHTML={{
          __html: `
      window['ga-disable-${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}'] = ${cookies.noAnalytics};
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}');
      `
        }} />
      </Head>
      <CookiesProvider><Component {...pageProps} /></CookiesProvider>
    </>
  );
}

export default MyApp;
