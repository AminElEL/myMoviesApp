import { Context, createContext, ReactNode } from 'react'
import { GeneralStore } from '../stores/GeneralStore'
import { UserStore } from '../stores/UserStore'

export interface IStoreHub {
  generalStore: GeneralStore
  userStore: UserStore
}

interface IProviderProps {
  children: ReactNode
  initialState: IStoreHub
}

let storeHub: IStoreHub

export const RootStoreContext: Context<IStoreHub> = createContext<IStoreHub>(
  initializeStore()
)

export function StoreProvider({
  children,
  initialState,
}: IProviderProps): JSX.Element {
  const store = initializeStore(initialState)

  return (
    <RootStoreContext.Provider value={store}>
      {children}
    </RootStoreContext.Provider>
  )
}

function initializeStore(initialData = null) {
  const _storeHub = storeHub ?? {
    generalStore: new GeneralStore(),
    userStore: new UserStore(),
  }
  if (initialData) {
    _storeHub.generalStore.hydrate(initialData.generalStore)
  }

  if (typeof window === 'undefined') return _storeHub
  if (!storeHub) storeHub = _storeHub

  return _storeHub
}
