import IMovie from './IMovie'
import ITVShow from './ITVShows'
interface IMedia extends IMovie,ITVShow  {
  backdrop_path: string
  genre_ids: number[]
  id: number
  original_language: string
  overview: string
  popularity: number
  poster_path: string
  vote_average: number
  vote_count: number
}

export default IMedia
