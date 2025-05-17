import React from 'react'
import { useSelector } from 'react-redux'

const Profile = () => {
    const loggedInUser = useSelector(store=>store.user)
  return loggedInUser && (
    <div>Profile</div>
  )
}

export default Profile