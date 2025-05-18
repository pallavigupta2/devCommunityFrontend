import React from 'react'
import { useSelector } from 'react-redux'
import EditProfile from './EditProfile'

const Profile = () => {
    const loggedInUser = useSelector(store=>store.user)
  return loggedInUser && (
    <div><EditProfile loggedInUser={loggedInUser}/>
    </div>
  )
}

export default Profile