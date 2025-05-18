import React from 'react'

const UserCard = ({user}) => {
    const {aboutUs,firstName,lastName,photoUrl,skills,age,gender} = user
  return (
    <div className="card bg-neutral w-96 shadow-lg">
  <figure className="px-2 pt-3">
    <img
      src={photoUrl}
      alt="user photo"
      className="rounded-xl" />
  </figure>
  <div className="card-body items-center text-center text-base-100">
    <h2 className="card-title">{firstName+" "+lastName}</h2>
    {gender && <span>Gender : {gender}</span>}
    {age && <span>Age : {age}</span>}
    {/* <p>Gender : {gender}, Age : {age}</p> */}
    {skills?.length >0 && <p>Skills : {skills.toString()}</p>}
    {aboutUs && <p>{aboutUs}</p>}
    <div className="card-actions">
      <button className="btn btn-primary bg-base-100 text-pink-800 hover:bg-pink-200">Ignore</button>
            <button className="btn btn-primary bg-base-100 text-pink-800  hover:bg-pink-200">Interested</button>
    </div>
  </div>
</div>
  )
}

export default UserCard