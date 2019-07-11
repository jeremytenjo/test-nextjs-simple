import React from 'react'
import { useRouter } from 'next/router'

const DataTabs2 = [
  { label: 'MOVIES', link: '/' },
  { label: 'TV SHOWS', link: '/tvshows' }
]

const HeaderFooter = ({ children }) => {
  const router = useRouter()

  const handleonSubmitSuccess = ({ query }) => {
    console.log(query)
  }

  return <div>{children}</div>
}

export default HeaderFooter
