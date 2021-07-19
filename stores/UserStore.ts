import { makeAutoObservable, runInAction } from 'mobx'
import { enableStaticRendering } from 'mobx-react-lite'

type Info = {
  id: string
  isMovie: boolean
}

interface IUserStore {
  favorites: Info[]
  savedShows: any[]
  isNotLogIn: boolean
  name: string
}

enableStaticRendering(typeof window === 'undefined')

export class UserStore implements IUserStore {
  public name = ''
  public favorites: Info[] = []
  public savedShows: any[] = []
  public isNotLogIn = true
  public constructor() {
    makeAutoObservable(this)
  }

  public setFavorite = (info: any): void => {
    runInAction(() => {
      this.favorites.push(info)
    })
  }
  public setLogIn = (value: boolean): void => {
    runInAction(() => {
      this.isNotLogIn = value
    })
  }
  public setSavedShows = (shows: any): void => {
    runInAction(() => {
      this.savedShows.push(shows)
    })

    this.savedShows = this.savedShows.filter(
      (show, index, self) => index === self.findIndex((t) => t.id === show.id)
    )
  }

  public setName = (name: string): void => {
    runInAction(() => {
      this.name = name
    })
  }
  public removeShows = (): void => {
    this.savedShows = []
  }
}
