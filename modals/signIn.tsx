import React, { useState, FC } from 'react'
import Modal from '@material-ui/core/Modal'
import SignInUp from '../components/SignInUp'
import { useStores } from '../hooks/useStores'
import { observer } from 'mobx-react-lite'
import { useEffect } from 'react'
import Button from '@material-ui/core/Button'
type SingInModalProps = {
  userName: string
}
function rand() {
  return Math.round(Math.random() * 20) - 10
}

const SingInModal: FC<SingInModalProps> = ({ userName }) => {
  const { generalStore, userStore } = useStores()
  const [open, setOpen] = useState(false)

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleLogOut = () => {
    localStorage.clear()
    //userStore.setName(null)
    userStore.removeShows()
    userStore.setLogIn(true)
  }
  const handleDeleteProfile = () => {
    localStorage.removeItem(userName)
    userStore.setName('')
    userStore.setLogIn(true)
  }
  useEffect(() => {
    if (userStore.isNotLogIn) setOpen(true)
  }, [userStore.isNotLogIn])
  return (
    <div>
      {userStore.isNotLogIn ? (
        <Button variant="outlined" className="sing-in" onClick={handleOpen}>
          Sign In
        </Button>
      ) : (
        <div className="log-out-wrapper">
          <p>Welcome {userName}</p>
          <Button variant="outlined" className="log-out" onClick={handleLogOut}>
            Log out
          </Button>
          <Button
            variant="outlined"
            className="delete-profile"
            onClick={handleDeleteProfile}
          >
            Delete profile
          </Button>
        </div>
      )}

      <Modal open={open} onClose={handleClose}>
        <div>
          <SignInUp onSignInClose={handleClose} />
        </div>
      </Modal>
    </div>
  )
}

export default observer(SingInModal)
