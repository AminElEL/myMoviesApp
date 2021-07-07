import { observer } from 'mobx-react-lite'
import { useCallback, FC } from 'react'
import { useStores } from '../hooks/useStores'
import TextField from '@material-ui/core/TextField'
import styles from '../styles/sample.module.scss'
import Button from '@material-ui/core/Button'
import { Checkbox } from '@material-ui/core'
import { useState } from 'react'

type MediaCardProps = {
  onSignInClose: Function
}
const SignInUp: FC<MediaCardProps> = ({ onSignInClose }) => {
  const { generalStore, userStore } = useStores()
  const [isSignUP, setIsSignUP] = useState(true)

  const changed = useCallback(
    (event) => userStore.setName(event.target.value),
    [userStore]
  )
  const handleSignIn = () => {
    const favoriteShows = localStorage.getItem(userStore.name)
    if (userStore.name && favoriteShows !== null) {
      userStore.setLogIn(false)
      onSignInClose()
    } else {
      setIsSignUP(false)
      userStore.setLogIn(true)
    }
  }

  const handleSignUp = () => {
    if (userStore.name) {
      localStorage.setItem(userStore.name, '')
      onSignInClose()
      userStore.setLogIn(false)
    }
  }
  return (
    <div className="sign-in-wrapper">
      <div className="sign">
        {isSignUP ? (
          <h2>
            If you have account please Log In or click outside of box for
            exploring the site
          </h2>
        ) : (
          <h2>You don`t have an account please Sign UP</h2>
        )}

        <Button variant="outlined" className="sing-in" onClick={handleSignIn}>
          Sign In
        </Button>
        <Button variant="outlined" className="sing-in" onClick={handleSignUp}>
          Sign Up
        </Button>
      </div>
      <TextField
        id="standard-basic"
        label="Enter name"
        onChange={changed}
        className={styles.myInput}
        error={userStore.isNotLogIn}
      />
    </div>
  )
}

export default observer(SignInUp)
