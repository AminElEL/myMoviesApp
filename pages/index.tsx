import { observer } from 'mobx-react-lite'
import Head from 'next/head'
import MoviesList from './movies'
import api from '../services/UserApi'
export const Home = (): JSX.Element => {
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

export async function getServerSideProps(): Promise<any> {
  const movies = await api.getPopularMovies()
  const genres = await api.getAllGenres()

  return {
    props: { initialState: { generalStore: { movies, genres } } },
  }
}

export default observer(Home)
