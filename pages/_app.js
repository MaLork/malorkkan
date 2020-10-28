import '../styles/globals.css'
import '../styles/tailwind.css'
import '../styles/fonts.css'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <NavBar />
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
