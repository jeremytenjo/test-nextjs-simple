import TorrentSearchApi from 'torrent-search-api'
import fetch from 'isomorphic-unfetch'

TorrentSearchApi.enableProvider('1337x')

const getMovieInfo = async (query) => {
  try {
    const data = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=2388873e04ec158e7436ea33b73e5002&language=en-US&page=1&query=${encodeURIComponent(
        query
      )}`
    )

    return await data.json()
  } catch (error) {
    return error
  }
}

export default async (req, res) => {
  const currentYear = new Date().getFullYear()
  const resultLimit = 10
  const movies = await TorrentSearchApi.search(
    `1080 ${currentYear}`,
    'Movies',
    resultLimit
  )
  const moviesList = await movies.map(async (serie, index) => {
    let magnet = await TorrentSearchApi.getMagnet(serie)
    serie.magnet = magnet
    return serie
  })

  const data = await Promise.all(moviesList)

  const latestMovies = data.map(async (movie) => {
    // console.log(movie)

    let formatTitle = movie.title.split(currentYear)[0].replace('.', ' ')

    const seriesInfo = await getMovieInfo(formatTitle)
    let posterUrl = ''

    if (seriesInfo.results[0]) {
      posterUrl = `http://image.tmdb.org/t/p/w185/${
        seriesInfo.results[0].poster_path
      }`
    }

    return seriesInfo
      ? {
          magnet: movie.magnet,
          posterUrl,
          id: movie.peers,
          title: movie.title
        }
      : null
  })

  res.status(200).json(await Promise.all(latestMovies))
}

// const users = [
//   {
//     id: 1
//   },
//   { id: 2 },
//   { id: 3 }
// ]

// export default (req, res) => {
//   // Get data from your database
//   res.status(200).json(users)
// }
