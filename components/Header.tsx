import Router from '../services/Router'
import Filters from '../components/Filters'
import { useStores } from '../hooks/useStores'
import SortIcon from '@material-ui/icons/Sort'
import api from '../services/UserApi'
import { observer } from 'mobx-react-lite'
import React, { FC } from 'react'
import { useRouter } from 'next/router'

const Header: FC = () => {
  const { generalStore } = useStores()
  const pathname = useRouter()
  const isFilterShown: boolean = pathname.pathname !== '/Favorites'

  const sortByRating = (pathname: string): void => {
    generalStore.getSortByRating(pathname)
  }
  const sortByName = (pathname): void => {
    generalStore.sortByName(pathname)
  }

  const sortByYear = (pathname): void => {
    generalStore.sortByReleaseDate(pathname)
  }
  return (
    <div className="header-wrapper">
      <Filters genres={generalStore.genres} />
      {isFilterShown ? (
        <div className="sort-wrapper">
          <div className="sort" onClick={() => sortByRating(pathname.pathname)}>
            <SortIcon className="sort-icon" fontSize="large" />
            Sort by rating
          </div>
          <div className="sort" onClick={() => sortByName(pathname.pathname)}>
            <SortIcon className="sort-icon" fontSize="large" />
            Sort by name
          </div>
          <div className="sort" onClick={() => sortByYear(pathname.pathname)}>
            <SortIcon className="sort-icon" fontSize="large" />
            Sort by Year
          </div>
        </div>
      ) : null}
      <Router />
    </div>
  )
}

export default observer(Header)
