import React, { FC, useState } from 'react'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
import IMedia from '../models/IMedia'
import Switch from '@material-ui/core/Switch'
import { useStores } from '../hooks/useStores'
import { observer } from 'mobx-react-lite'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
type MediaCardProps = {
  media: IMedia
  isMovie: boolean
  id: number
}

const MediaCard: FC<MediaCardProps> = ({ media, isMovie = true, id }) => {
  const [color, setColor] = useState('default')
  const { userStore, generalStore } = useStores()
  const url = `${process.env.IMG_URL}${media.backdrop_path}`
  const pathname = useRouter()
  const isFilterShown: boolean = pathname.pathname !== '/Favorites'

  const handleChange = (event, id) => {
    const saveToLocal = {
      id: id,
      isMovie: isMovie,
    }
    userStore.favorites.push(saveToLocal)
    localStorage.setItem(userStore.name, JSON.stringify(userStore.favorites))
    setColor(event.target.checked ? 'blue' : 'default')
  }
  return (
    <Card className={'root-card'}>
      <CardActionArea>
        <CardMedia className={'root-card__media'} image={`${url}`} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {media.title || media.name}
          </Typography>
          <Typography paragraph={true} component="p">
            Average rating {media?.vote_average}
          </Typography>
          <Typography
            variant="body2"
            color="textSecondary"
            component="p"
            paragraph={true}
          >
            {media.overview}
          </Typography>
          <Typography variant="body2" component="h3">
            Release date: {media.first_air_date || media.release_date}
          </Typography>
        </CardContent>
      </CardActionArea>
      <div className="favorite">
        {!userStore.isNotLogIn && isFilterShown && (
          <div className="my-toggle">
            <Switch
              checked={userStore.savedShows.find((show) => show.id === id)}
              onChange={() => handleChange(event, media.id)}
              color="primary"
              value="dynamic-class-name"
            />
            <span>Make favorite</span>
          </div>
        )}
      </div>
    </Card>
  )
}
export default observer(MediaCard)
