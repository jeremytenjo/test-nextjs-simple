import fetch from 'isomorphic-unfetch'
import Router from 'next/router'
import baserUrl from '../constants/baseUrl'

const Index = ({ movies }) => {
  console.log(movies)

  // const handlePosterClick = async () => {
  //   const res = await fetch('/api/movies')
  //   const data = await res.json()
  // }

  return (
    <div>
      asdf
      {movies.map(({ posterUrl, ...rest }) => {
        return <img key={posterUrl} src={posterUrl} {...rest} />
      })}
    </div>
  )
}

Index.getInitialProps = async function() {
  const res = await fetch(`${baserUrl}api/movies/allMovies`)
  const movies = await res.json()

  return {
    movies
  }
}

export default Index
