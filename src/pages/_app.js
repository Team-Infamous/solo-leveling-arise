// src/pages/_app.js
import '@/styles/globals.css' // Only global CSS import here

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />
}
