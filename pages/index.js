import fetch from 'isomorphic-unfetch'
import Router from 'next/router'
import baserUrl from '../constants/baseUrl'

const Index = ({ movies }) => {
  // const handlePosterClick = async ({magnet}) => {
  //   const res = await fetch('/api/movies')
  //   const data = await res.json()
  // }

  return (
    <div>
      {movies.map(({ posterUrl, ...rest }) => {
        return <img key={posterUrl} src={posterUrl} {...rest} />
      })}
    </div>
  )
}

Index.getInitialProps = async function() {
  const currentYear = new Date().getFullYear()
  const body = {
    type: 'Movies',
    quantity: 10,
    query: `1080 ${currentYear}`
  }

  const res = await fetch(baserUrl, {
    method: 'post',
    body
  })
  const movies = await res.json()

  return {
    movies
  }
}

export default Index
