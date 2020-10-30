import '../styles/globals.css'
import '../styles/tailwind.css'
import '../styles/fonts.css'
import { FirebaseProvider } from '../lib/firebaseContext'

function MyApp({ Component, pageProps }) {
  return (
    <FirebaseProvider>
      <Component {...pageProps} />
    </FirebaseProvider>
  )
}

export default MyApp
