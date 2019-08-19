import torrentSearch from '../../../helpers/TorrentSearch/search'

export default async (req, res) => {
  const {
    body: { query, type = 'Movies', quantity = 10 }
  } = req

  if (!query) throw new Error('query parameter missing')
  const result = await torrentSearch({ query, type, quantity })

  res.status(200).json(result)
}
