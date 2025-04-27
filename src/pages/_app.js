// src/pages/_app.js

import '../styles/globals.css' // Correct relative path

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />
}
