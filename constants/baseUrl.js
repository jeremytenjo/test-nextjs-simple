const dev = process.env.NODE_ENV !== 'production'

const server = dev
  ? 'http://localhost:3000/api/TorrentSearch/search'
  : 'https://test-nextjs-simple.tenjojeremy.now.sh/TorrentSearch/search'

export default server
