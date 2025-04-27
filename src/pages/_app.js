// src/pages/_app.js

import '../styles/globals.css' // Correct relative path
import AuthContext from '../context/AuthContext';


export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />
}
