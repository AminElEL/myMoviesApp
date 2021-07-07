import { observer } from 'mobx-react-lite'
import { GetServerSideProps } from 'next'
import Head from 'next/head'
import MoviesList from './MovieList'
import TVShows from './TvShowsList'
import { useEffect } from 'react'
import { useStores } from '../hooks/useStores'
import api from '../services/UserApi'
import IGenre from '..models/IGenre'
import IMedia from '../models/IMedia'

interface IHomeProps {
  movies: IMedia
  genres: IGenre
}

export const Home = (): JSX.Element => {
  const { generalStore } = useStores()

  return (
    <div className="container">
      <Head>
        <title>My movie place</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <MoviesList />
      </main>
    </div>
  )
}

export async function getServerSideProps(): any {
  const movies = await api.getPopularMovies()
  const genres = await api.getAllGenres()

  return {
    props: { initialState: { generalStore: { movies, genres } } },
  }
}

export default observer(Home)
