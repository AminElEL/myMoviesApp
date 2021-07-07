import React, { FunctionComponent } from 'react'
import MediaCard from '../components/Card'
import { useStores } from '../hooks/useStores'
import { observer } from 'mobx-react-lite'
import InfiniteScroll from 'react-infinite-scroll-component'

const MoviesList: FunctionComponent = () => {
  const { generalStore, userStore } = useStores()
  return (
    <InfiniteScroll
      className="media-container"
      dataLength={generalStore.movies.length}
      next={generalStore.getNextPageOfMovies}
      hasMore={true}
    >
      {generalStore.movies &&
        generalStore.movies.map((movie) => {
          return <MediaCard media={movie} key={movie.id} id={movie.id} />
        })}
    </InfiniteScroll>
  )
}

export default observer(MoviesList)
