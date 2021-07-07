import React, { FunctionComponent } from 'react'
import MediaCard from '../components/Card'
import api from '../services/UserApi'
import { useStores } from '../hooks/useStores'
import { observer } from 'mobx-react-lite'
import InfiniteScroll from 'react-infinite-scroll-component'

interface IHomeProps {
  tvShows: IMedia
  genres: IGenre
}

const TVShows: FunctionComponent = () => {
  const { generalStore } = useStores()

  return (
    <InfiniteScroll
      className="media-container"
      dataLength={generalStore.tvShows.length}
      next={generalStore.getNextPageOfTVShows}
      hasMore={true}
    >
      {generalStore.tvShows &&
        generalStore.tvShows.map((tvShow) => (
          <MediaCard media={tvShow} key={tvShow.id} isMovie={false} />
        ))}
    </InfiniteScroll>
  )
}

export async function getServerSideProps(): any {
  const tvShows = await api.getPopularTVShows()
  const genres = await api.getAllGenres()

  return {
    props: { initialState: { generalStore: { tvShows, genres } } },
  }
}

export default observer(TVShows)
