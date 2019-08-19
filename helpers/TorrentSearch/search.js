import TorrentSearchApi from 'torrent-search-api'
import fetch from 'isomorphic-unfetch'

import formatTitle from './helpers/formatTitle'

TorrentSearchApi.enableProvider('1337x')

export default async ({ query, type = 'Movies', quantity = 10 }) => {
  if (!query) throw new Error('query parameter missing')

  const result = await TorrentSearchApi.search(query, type, quantity)

  const addMissingFields = await result.map(async (item, index) => {
    // get Magnet
    let magnet = await TorrentSearchApi.getMagnet(item)
    item.magnet = magnet

    // Get Poster URL
    let formatTitled = formatTitle(item.title)
    let moreInfo = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=2388873e04ec158e7436ea33b73e5002&language=en-US&page=1&query=${encodeURIComponent(
        formatTitled
      )}`
    )
    moreInfo = await moreInfo.json()
    moreInfo = moreInfo.results[0]
    let posterUrl = ''

    if (moreInfo) {
      const { poster_path } = moreInfo
      posterUrl = `http://image.tmdb.org/t/p/w185/${poster_path}`
    }
    item.posterUrl = posterUrl

    // End
    return item
  })

  const resultFinal = await Promise.all(addMissingFields)
  return resultFinal
}
