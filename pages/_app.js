import '../styles/globals.css'
import '../styles/tailwind.css'
import '../styles/fonts.css'
import { ProvideAuth } from '../lib/userContext'

function MyApp({ Component, pageProps }) {
  return (
    <ProvideAuth>
      <Component {...pageProps} />
    </ProvideAuth>
  )
}

export default MyApp
