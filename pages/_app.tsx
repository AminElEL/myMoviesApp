import type { AppProps } from 'next/app'
import React from 'react'
import { StoreProvider } from '../contexts'
import Footer from '../components/Footer'
import Header from '../components/Header'
import '../styles/default.scss'
import { useRouter } from 'next/router'
import SmallHeader from '../components/HeaderSmall'
const MyApp = ({ Component, pageProps }: AppProps): JSX.Element => {
  const pathname = useRouter()
  const isSmallHeader: boolean =
    pathname.pathname !== '/favorites' &&
    pathname.pathname !== '/[...media-details]'

  return (
    <StoreProvider {...pageProps}>
      {isSmallHeader ? <Header /> : <SmallHeader />}
      <Component {...pageProps} />
      <Footer />
    </StoreProvider>
  )
}
export default MyApp
