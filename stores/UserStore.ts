import { makeAutoObservable, runInAction } from 'mobx'
import { enableStaticRendering } from 'mobx-react-lite'
import { IUser } from '../models/IUser'
import IMovie from '../models/IMovie'
import IGenre from '../models/IGenre'
import userApi from '../services/UserApi'
import IMedia from '../models/IMedia'
interface IUserStore {
  user: IUser
  favorites: IMedia[]
  savedShows: IMedia[]
}

enableStaticRendering(typeof window === 'undefined')

export class UserStore implements IUserStore {
  public name = ''
  public favorites: IMedia[] = []
  public savedShows: IMedia[] = []
  public isNotLogIn: boolean = true
  public constructor() {
    makeAutoObservable(this)
  }

  public setFavorite = (info: {}): void => {
    runInAction(() => {
      this.favorites.push(info)
    })
  }
  public setLogIn = (value: boolean) => {
    runInAction(() => {
      this.isNotLogIn = value
    })
  }
  public setSavedShows = (shows: IMedia) => {
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
  public removeShows = () => {
    this.savedShows = []
  }
}
