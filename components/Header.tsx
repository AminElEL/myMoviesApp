import Router from '../services/Router'
import Filters from '../components/Filters'
import { useStores } from '../hooks/useStores'
import SortIcon from '@material-ui/icons/Sort'
import { observer } from 'mobx-react-lite'
import React, { FC, useState } from 'react'
import { useRouter } from 'next/router'
import { Button } from '@material-ui/core'
import Expand from 'react-expand-animated'
const transitions = ['height', 'opacity', 'background']
const Header: FC = () => {
  const { generalStore } = useStores()
  const [open, setOpen] = useState(false)

  const toggle = () => {
    setOpen(!open)
  }
  const pathname = useRouter()
  const isFilterShown: boolean =
    pathname.pathname !== ('/favorites' && '/[...media-details]')

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
        <div className={'expand-wrapper'}>
          <Button onClick={toggle}>{`${
            open ? 'Close sort' : 'Open sort'
          }`}</Button>

          <Expand
            open={open}
            duration={1000}
            transitions={transitions}
            className={'expand'}
          >
            <div className="sort-wrapper">
              <div
                className="sort"
                onClick={() => sortByRating(pathname.pathname)}
              >
                <SortIcon className="sort-icon" fontSize="large" />
                Sort by rating
              </div>
              <div
                className="sort"
                onClick={() => sortByName(pathname.pathname)}
              >
                <SortIcon className="sort-icon" fontSize="large" />
                Sort by name
              </div>
              <div
                className="sort"
                onClick={() => sortByYear(pathname.pathname)}
              >
                <SortIcon className="sort-icon" fontSize="large" />
                Sort by Year
              </div>
            </div>
          </Expand>
        </div>
      ) : null}
      <Router />
    </div>
  )
}

export default observer(Header)
