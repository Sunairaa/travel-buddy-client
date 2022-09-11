import React from 'react'
import { useState, useEffect} from 'react'
import axios from 'axios'


function Profile() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    axios
      .get('http://localhost:5005/api/profile')
      .then(response => {
        setUser(response.data)
      })
      .catch(err => console.log(err))

  }, [])

  return (
    <div>
      <img src={user.imageUrl} alt='user face pic'/>
      <h1>Name: {user.name}</h1>
      <h2>Email: {user.email}</h2>
    </div>
  )
}

export default Profile