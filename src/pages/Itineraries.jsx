import React from 'react'
import { useState, useEffect} from 'react'
import axios from 'axios'
import ItineraryCard from '../components/ItineraryCard'
import { Grid } from '@mui/material'
import Container from '@mui/material/Container';


function Itineraries() {
  const [itineraries, setItineraries] = useState([])
  const defaultImageUrl = 'https://images.unsplash.com/photo-1499591934245-40b55745b905?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2372&q=80'

  useEffect(() => {
    axios
      .get('http://localhost:5005/api/itineraries')
      .then(response => {
        setItineraries(response.data)
      })
      .catch(err => console.log(err))

  }, [])

  return (
    <div style={{display:'flex', flexDirection:'column', alignItems:'center'}}>
      <Container maxWidth="xl">
        <h1 style={{fontSize:'2.75em', fontWeight:'lighter'}}>List of itineraries</h1>
        <Grid container spacing={6}
          justifyContent="center"
          alignItems="center"
        >

        {itineraries.map((itinerary) => {
          return(
            <Grid item xs={12} sm={12} md={6} xl={4}
              display='flex'
              justifyContent='center'
              alignItems='center'
              key={itinerary._id}
            >
              <ItineraryCard 
                title={itinerary.title}
                cities={itinerary.cities}
                user={itinerary.user}
                imageUrl={itinerary.imageUrl || defaultImageUrl}
                notes={itinerary.notes}
                id={itinerary._id}
              />
            </Grid>
          )
        })}
        </Grid>
      </Container>
    </div>
  )
}

export default Itineraries