import axios from 'axios'
import IGenre from '../models/IGenre'
import IMovie from '../models/IMovie'
import ITVShow from '../models/ITVShows'

class Api {
  public getPopularMovies = async (page = 1): Promise<IMovie[]> => {
    const POPULAR_MOVIES = `${process.env.BASE_URL}/movie/popular?api_key=${process.env.API_KEY}&page=${page}`
    const { data } = await axios.get(POPULAR_MOVIES)
    return data.results
  }

  public getPopularTVShows = async (page = 1): Promise<ITVShow[]> => {
    const POPULAR_TV_SHOWS = `${process.env.BASE_URL}/tv/popular?api_key=${process.env.API_KEY}&page=${page}`
    const { data } = await axios.get(POPULAR_TV_SHOWS)
    return data.results
  }

  public getFilteredMovies = async (
    genre: string,
    year: string,
    type: string
  ): Promise<IMovie[]> => {
    const DISCOVER_API: string = `${process.env.BASE_URL}/discover/{type}?api_key=${process.env.API_KEY}&with_genres={genre}&year={year}`
    const { data } = await axios.get(
      DISCOVER_API.replace('{type}', type)
        .replace('{genre}', genre)
        .replace('{year}', year)
    )

    return data.results
  }

  public getShowsByKeyword = async (
    id: number,
    isMovie: boolean
  ): Promise<IMovie[] | ITVShow[]> => {
    const type = isMovie ? 'movie' : 'tv'
    const SHOWS_BY_KEYWORD: string = `${process.env.BASE_URL}/{type}/{id}?api_key=${process.env.API_KEY}&language=en-US`
    const { data } = await axios.get(
      SHOWS_BY_KEYWORD.replace('{type}', type).replace('{id}', id)
    )
    return data
  }

  public getAllGenres = async (): Promise<IGenre[]> => {
    const GENRES_API: string = `${process.env.BASE_URL}/genre/movie/list?api_key=${process.env.API_KEY}&language=en-US`
    const { data } = await axios.get(GENRES_API)

    return data.genres
  }
  public searchByName = async (
    searchString: string,
    showType: string
  ): Promise<IMovie[] | ITVShow[]> => {
    const SEARCH_BY_NAME = `${process.env.BASE_URL}/search/{showType}?api_key=${process.env.API_KEY}&language=en-US&page=1&query={searchString}&include_adult=false`
    const { data } = await axios.get(
      SEARCH_BY_NAME.replace('{showType}', showType).replace(
        '{searchString}',
        searchString
      )
    )
    return data.results
  }

  public sortByRating = async (
    type: string,
    page = 1
  ): Promise<IMovie[] | ITVShow[]> => {
    const SORT_BY_RATING = `${process.env.BASE_URL}/{type}/top_rated?api_key=${process.env.API_KEY}&language=en-US&page=${page}`

    const { data } = await axios.get(SORT_BY_RATING.replace('{type}', type))
    return data.results
  }

  public sortByReleaseDate = async (
    type: string,
    value: string
  ): Promise<IMovie[] | ITVShow[]> => {
    const SORT_BY_DATE = `${process.env.BASE_URL}/discover/{type}?api_key=${process.env.API_KEY}&language=en-US&sort_by={value}&page=1&with_watch_monetization_types=flatrate`
    const { data } = await axios.get(
      SORT_BY_DATE.replace('{type}', type).replace('{value}', value)
    )
    return data.results
  }
}

const api = new Api()
export default api
