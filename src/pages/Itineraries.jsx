import React from 'react'
import { useState, useEffect} from 'react'
import axios from 'axios'
import ItineraryCard from '../components/ItineraryCard'
import { Grid } from '@mui/material'
import Container from '@mui/material/Container';


function Itineraries() {
  const [itineraries, setItineraries] = useState([])

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
                imageUrl={itinerary.imageUrl}
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