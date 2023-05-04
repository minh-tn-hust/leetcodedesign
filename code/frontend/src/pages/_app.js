import '@/styles/globals.css'
import NavBar from "@/shared/navbar";

export default function App({ Component, pageProps }) {
  return (
      <>
        <NavBar/>
        <Component {...pageProps} />
      </>
  )
}
