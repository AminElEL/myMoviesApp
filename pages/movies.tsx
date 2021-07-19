import React, { FunctionComponent } from 'react'
import MediaCard from '../components/Card'
import { useStores } from '../hooks/useStores'
import { observer } from 'mobx-react-lite'
import InfiniteScroll from 'react-infinite-scroll-component'
import api from '../services/UserApi'

const MoviesList: FunctionComponent = () => {
  const { generalStore } = useStores()
  return (
    <InfiniteScroll
      className="media-container"
      dataLength={generalStore.movies.length}
      next={generalStore.getNextPageOfMovies}
      hasMore={true}
      loader={<div></div>}
    >
      {generalStore.movies &&
        generalStore.movies.map((movie) => {
          return <MediaCard media={movie} key={movie.id} id={movie.id} />
        })}
    </InfiniteScroll>
  )
}
export async function getServerSideProps(): Promise<any> {
  const movies = await api.getPopularMovies()
  const genres = await api.getAllGenres()

  return {
    props: { initialState: { generalStore: { movies, genres } } },
  }
}
export default observer(MoviesList)
