import React from 'react'
import { useSelector } from 'react-redux'

const Feed = () => {
  const loggedInUser=useSelector(store=>store.user)
  return loggedInUser && (
    <div>Feed</div>
  )
}

export default Feed