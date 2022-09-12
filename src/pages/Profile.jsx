import React from 'react'
import { useState, useEffect} from 'react'
import axios from 'axios'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar'


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
    <Card style={{width:'90%'}}>
      <CardContent>
        <Avatar alt="Remy Sharp" src={user.imageUrl} />
        <Typography variant="body2" color="text.secondary">
          Name: {user.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Email: {user.email}
        </Typography>
      </CardContent>
    </Card>
  )
}

export default Profile