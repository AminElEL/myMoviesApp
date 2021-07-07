import {
  Button,
  FormControl,
  Input,
  InputLabel,
  MenuItem,
  Select,
} from '@material-ui/core'
import React, {
  FunctionComponent,
  useCallback,
  useEffect,
  useState,
} from 'react'
import IGenre from '../interfaces/IGenre'
import { observer } from 'mobx-react-lite'
import { useStores } from '../hooks/useStores'
import api from '../services/UserApi'
import SingInModal from '../modals/signIn'
import { useRouter } from 'next/router'

type FilterProps = {
  genres?: IGenre[]
}

const Filters: FunctionComponent<FilterProps> = ({ genres }) => {
  const [selectedGenres, setSelectedGenres] = useState<string[]>([])
  const [genresID, setGenresID] = useState<string[]>([])
  const [selectedYear, setSelectedYear] = useState<string>('')
  const [searchByName, setSearchByName] = useState<string>('')
  const { generalStore, userStore } = useStores()
  const pathname = useRouter()

  const handleChange = useCallback(
    (event: React.ChangeEvent<{ value: string[] | string }>) => {
      setSelectedGenres(event.target.value as string[])
    },
    []
  )
  const handleGenreID = (id: string) => {
    setGenresID([...genresID, id])
  }
  const handleSubmit = async () => {
    if (searchByName) {
      generalStore.searchByName(searchByName, pathname.pathname)
    } else {
      generalStore.searchByGenreAndYear(
        genresID,
        selectedYear,
        pathname.pathname
      )
    }
    setSelectedGenres([])
    setGenresID([])
    setSelectedYear('')
    setSearchByName('')
  }

  const handleInputChange = useCallback(
    (event: React.ChangeEvent<{ value: string }>) => {
      const enteredYear = event.target.value
      setSelectedYear(enteredYear)
    },
    []
  )
  const handleSearch = (event: React.ChangeEvent<{ value: string }>) => {
    const enteredTitle = event.target.value
    setSearchByName(enteredTitle)
  }

  return (
    <div className={'filters-container'}>
      <FormControl>
        <InputLabel id="demo-simple-select-label" className={'genre-label'}>
          Search by genre
        </InputLabel>

        <Select
          labelId="demo-mutiple-name-label"
          id="demo-simple-select"
          onChange={handleChange}
          value={selectedGenres}
          multiple
          input={<Input />}
        >
          {generalStore.genres.map((genre) => (
            <MenuItem
              value={genre.name}
              key={genre.id}
              onClick={() => handleGenreID(genre.id)}
            >
              {genre.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Input
        placeholder={'Search by year'}
        onChange={handleInputChange}
        value={selectedYear}
        className="input-style"
      />
      <Input
        placeholder={'Search by title'}
        onChange={handleSearch}
        value={searchByName}
        className="input-style"
      />
      <Button
        variant="outlined"
        onClick={handleSubmit}
        className="submit-button"
      >
        Search
      </Button>
      <SingInModal userName={userStore.name} />
    </div>
  )
}
export default observer(Filters)
