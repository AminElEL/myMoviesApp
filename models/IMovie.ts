import IMedia from './IMedia'

interface IMovie extends IMedia {
  adult: boolean
  original_title: string
  release_date: string
  title: string
  video: boolean
}

export default IMovie
