import { makeAutoObservable, runInAction } from 'mobx'
import { enableStaticRendering } from 'mobx-react-lite'
import IMovie from '../models/IMovie'
import IGenre from '../models/IGenre'
import ITVShow from '../models/ITVShows'
import api from '../services/UserApi'

enableStaticRendering(typeof window === 'undefined')

export class GeneralStore {
  public movies = []
  public tvShows = []
  public genres = []
  public pageIndex = 1

  public constructor() {
    makeAutoObservable(this)
  }

  public setMovies = (movies: IMovie): void => {
    runInAction(() => {
      this.movies = movies
    })
  }

  public setTVShows = (tvShows: ITVShow): void => {
    runInAction(() => {
      this.tvShows = tvShows
    })
  }

  public setGeners = (genres: IGenre): void => {
    this.genres = genres
    runInAction(() => {
      this.genres = genres
    })
  }

  public sortShows = (what: string) => {
    generalStore[what].sort((a, b) => (a.title > b.title && 1) || -1)
  }

  public searchByGenreAndYear = async (
    genresID: string,
    selectedYear: string,
    pathname: string
  ): IMovie | ITVShow => {
    const isMovies = pathname !== '/TvShowsList'
    let movies = []
    let tvShows = []
    isMovies
      ? (movies = await api.getFilteredMovies(genresID, selectedYear, 'movie'))
      : (tvShows = await api.getFilteredMovies(genresID, selectedYear, 'tv'))
    runInAction(() => {
      ;(this.movies = movies), (this.tvShows = tvShows)
    })
  }

  public sortByName = (pathname: string): void => {
    const isMovies = pathname !== '/TvShowsList'
    if (pathname !== '/TvShowsList') {
      this.movies.sort((a, b) => (a.title > b.title && 1) || -1)
    } else {
      this.tvShows.sort((a, b) => (a.name > b.name && 1) || -1)
    }
  }

  public getSortByRating = async (pathname: string): void => {
    const isMovies = pathname !== '/TvShowsList'
    let movies = []
    let tvShows = []
    isMovies
      ? (movies = await api.sortByRating('movie'))
      : (tvShows = await api.sortByRating('tv'))
    runInAction(() => {
      ;(this.movies = movies), (this.tvShows = tvShows)
    })
  }

  public sortByReleaseDate = async (pathname: string): void => {
    const isMovies = pathname !== '/TvShowsList'
    let movies = []
    let tvShows = []
    isMovies
      ? (movies = await api.sortByReleaseDate('movie', 'release_date.asc'))
      : (tvShows = await api.sortByReleaseDate('tv', 'first_air_date.asc'))
    runInAction(() => {
      ;(this.movies = movies), (this.tvShows = tvShows)
    })
  }

  public getNextPageOfMovies = async () => {
    this.pageIndex++
    const data = await api.getPopularMovies(this.pageIndex)
    runInAction(() => {
      this.movies = [...this.movies, ...data]
    })
  }

  public getNextPageOfTVShows = async () => {
    this.pageIndex++
    const data = await api.getPopularTVShows(this.pageIndex)

    runInAction(() => {
      this.tvShows.push(...data)
    })
  }

  public searchByName = async (searchString: string, pathname: string) => {
    const isMovies = pathname !== '/TvShowsList'
    let movies = []
    let tvShows = []
    isMovies
      ? (movies = await api.searchByName(searchString, 'movie'))
      : (tvShows = await api.searchByName(searchString, 'tv'))
    runInAction(() => {
      ;(this.movies = movies), (this.tvShows = tvShows)
    })
  }

  public hydrate(data: any) {
    if (data.movies) this.movies = data.movies
    if (data.genres) this.genres = data.genres
    if (data.tvShows) this.tvShows = data.tvShows
  }
}
