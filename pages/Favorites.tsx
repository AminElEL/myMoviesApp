import React, { FunctionComponent, useEffect } from 'react'
import MediaCard from '../components/Card'
import IMedia from '../models/IMedia'
import api from '../services/UserApi'
import { useStores } from '../hooks/useStores'
import { observer } from 'mobx-react-lite'
import Skeleton from '@material-ui/lab/Skeleton'
type MoviesListProps = {
  media?: IMedia[]
}

const FavoriteList: FunctionComponent<MoviesListProps> = () => {
  const { userStore } = useStores()

  const getFavorites = async (formatSearch, isMovie) => {
    const shows = await api.getShowsByKeyword(formatSearch, isMovie)
    userStore.setSavedShows(shows)
  }

  useEffect(() => {
    const favoriteShows = localStorage.getItem(userStore.name)
    if (favoriteShows) {
      const praseForMapping = JSON.parse(favoriteShows)
      userStore.setFavorite(favoriteShows)
      praseForMapping
        .filter((movie) => movie.id)
        .map((movie) => getFavorites(movie.id, movie.isMovie))
    }
  }, [])
  return (
    <div className={'media-container'}>
      {userStore.savedShows.length > 0 ? (
        userStore.savedShows.map((movie) => {
          return <MediaCard media={movie} key={movie.id} id={movie.id} />
        })
      ) : (
        <div style={{ width: '100%' }}>
          {userStore.isNotLogIn
            ? userStore.setLogIn(true)
            : userStore.setLogIn(false)}
          <Skeleton variant="rect" height={700} width="100%" />
        </div>
      )}
    </div>
  )
}

export default observer(FavoriteList)
