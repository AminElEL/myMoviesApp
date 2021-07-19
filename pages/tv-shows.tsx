import React, { FunctionComponent } from 'react'
import MediaCard from '../components/Card'
import api from '../services/UserApi'
import { useStores } from '../hooks/useStores'
import { observer } from 'mobx-react-lite'
import InfiniteScroll from 'react-infinite-scroll-component'
import IMedia from '../models/IMedia'
import IGenre from '../models/IGenre'

interface IHomeProps {
  tvShows: IMedia
  genres: IGenre
}

const TVShows: FunctionComponent<IHomeProps> = () => {
  const { generalStore } = useStores()
  return (
    <InfiniteScroll
      className="media-container"
      dataLength={generalStore.tvShows.length}
      next={generalStore.getNextPageOfTVShows}
      hasMore={true}
      loader={<div></div>}
    >
      {generalStore.tvShows &&
        generalStore.tvShows.map((tvShow) => (
          <MediaCard
            media={tvShow}
            key={tvShow.id}
            isMovie={false}
            id={tvShow.id}
          />
        ))}
    </InfiniteScroll>
  )
}

export async function getServerSideProps(): Promise<any> {
  const tvShows = await api.getPopularTVShows()
  const genres = await api.getAllGenres()

  return {
    props: { initialState: { generalStore: { tvShows, genres } } },
  }
}

export default observer(TVShows)
