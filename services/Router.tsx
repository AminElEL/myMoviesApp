import Link from 'next/link'
import Button from '@material-ui/core/Button'
import { useRouter } from 'next/router'

const Router = () => {
  const router = useRouter()
  return (
    <div className="router-wrapper">
      <Link href="/movies">
        <Button
          style={{
            color:
              router.asPath === '/' || router.asPath === '/movies'
                ? 'orange'
                : 'black',
          }}
        >
          Popular Movies
        </Button>
      </Link>
      <Link href="/tv-shows">
        <Button
          style={{
            color: router.asPath === '/tv-shows' ? 'orange' : 'black',
          }}
        >
          Popular TV Shows
        </Button>
      </Link>
      <Link href="/favorites">
        <Button
          style={{ color: router.asPath === '/favorites' ? 'orange' : 'black' }}
        >
          Favorites
        </Button>
      </Link>
    </div>
  )
}

export default Router
