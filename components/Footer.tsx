import React, { FC } from 'react'
import Image from 'next/image'
import styles from '../styles/sample.module.scss'

const Footer: FC = () => {
  return (
    <footer className={styles.myFooter}>
      <a
        href="https://www.themoviedb.org"
        target="_blank"
        rel="noopener noreferrer"
      >
        Powered by{' '}
      </a>
      <Image
        src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg"
        alt="TMDB Logo"
        height={'32'}
        width={'64'}
      />
    </footer>
  )
}

export default Footer
