import '../styles/globals.css'
import '../styles/custom.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { CookiesProvider } from 'react-cookie'

function MyApp({ Component, pageProps }) {
  return <CookiesProvider><Component {...pageProps} /></CookiesProvider>
}

export default MyApp;
