import type { AppProps } from 'next/app'
import React from 'react'
import { StoreProvider } from '../contexts'
import Footer from '../components/Footer'
import Header from '../components/Header'
import '../styles/default.scss'

const MyApp = ({ Component, pageProps }: AppProps): JSX.Element => {
  return (
    <StoreProvider {...pageProps}>
      <Header />
      <Component {...pageProps} />
      <Footer />
    </StoreProvider>
  )
}
export default MyApp
