import React, { FunctionComponent } from 'react'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import api from '../services/UserApi'
import { useState } from 'react'
import ReactPlayer from 'react-player'
import { observer } from 'mobx-react-lite'
import Typography from '@material-ui/core/Typography'
let mediaData: any
let trailerKey: any
const MediaDetail: FunctionComponent = () => {
  const [isDataFetched, setIsDataFetched] = useState(false)
  const [hasTrailer, setHasTrailer] = useState(false)
  const pathname = useRouter()

  useEffect(() => {
    if (pathname.query['media-details']) {
      const showName = pathname.query['media-details'][1].replaceAll('-', ' ')
      const showType =
        // eslint-disable-next-line no-constant-condition
        pathname.query['media-details'][0] !== 'tv-shows' ? 'movie' : 'tv'
      const fetchShow = async () => {
        mediaData = await api.searchByName(showName, showType)
        trailerKey = await api.getTrailer(mediaData[0]?.id ?? null, showType)
        setIsDataFetched(!!mediaData)
        setHasTrailer(!!trailerKey[0]?.key)
      }

      fetchShow()
    }
  }, [pathname.query['media-details']])
  const checkForBackDrop = (media: any): string => {
    if (media[0].backdrop_path) {
      return `${process.env.IMG_URL}${media[0].backdrop_path}`
    } else {
      return 'https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_2-d537fb228cf3ded904ef09b136fe3fec72548ebc1fea3fbbd1ad9e36364db38b.svg'
    }
  }

  return (
    <>
      {isDataFetched ? (
        <div className={'media-container__mediaDetail'}>
          <div
            className={'backGround'}
            style={{
              backgroundImage: `url(${checkForBackDrop(mediaData)})`,
            }}
          ></div>
          <div className={'content'}>
            <img
              src={checkForBackDrop(mediaData)}
              alt="Banner"
              width="400px"
              height="200px"
            />
            <div className={'text-content'}>
              <Typography gutterBottom variant="h5" component="h2">
                <b>Title: </b>{' '}
                {(mediaData[0]?.title || mediaData[0]?.name) ?? ' '}
              </Typography>
              <Typography gutterBottom variant="h5" component="h2">
                <b>Average rating: </b>{' '}
                {mediaData[0]?.vote_average || 'No rating'}
              </Typography>
              <Typography
                variant="body2"
                color="textPrimary"
                component="h4"
                paragraph={true}
              >
                {' '}
                <b>Overview: </b>
                {mediaData[0]?.overview ||
                  'There is no overview for selected show.'}
              </Typography>

              <Typography variant="body2" component="h3">
                <b>Release date: </b>
                {mediaData[0]?.first_air_date || mediaData[0]?.release_date}
              </Typography>
            </div>
          </div>
          {hasTrailer ? (
            <ReactPlayer
              className={'player'}
              url={`https://www.youtube.com/watch?v=${
                trailerKey[0]?.key ?? null
              }`}
            />
          ) : (
            <img src={checkForBackDrop(mediaData)} width="400" height="200" />
          )}
        </div>
      ) : null}
    </>
  )
}

export default observer(MediaDetail)
