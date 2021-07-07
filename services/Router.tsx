import Link from 'next/link'
import Button from '@material-ui/core/Button'
import { useRouter } from 'next/router'

const Router = () => {
  const router = useRouter()
  router.asPath
  return (
    <div className="router-wrapper">
      <Link href="/">
        <Button style={{ color: router.asPath === '/' ? 'orange' : 'black' }}>
          Popular Movies
        </Button>
      </Link>
      <Link href="/TvShowsList">
        <Button
          style={{
            color: router.asPath === '/TvShowsList' ? 'orange' : 'black',
          }}
        >
          Popular TV Shows
        </Button>
      </Link>
      <Link href="/Favorites">
        <Button
          style={{ color: router.asPath === '/Favorites' ? 'orange' : 'black' }}
        >
          Favorites
        </Button>
      </Link>
    </div>
  )
}

export default Router
