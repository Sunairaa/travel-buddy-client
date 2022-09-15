import React from 'react'
import { useState, useEffect} from 'react'
import axios from 'axios'
import ItineraryCard from '../components/ItineraryCard'
import { Grid } from '@mui/material'
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography'
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const API_URL = process.env.REACT_APP_API_URL || "https://long-lime-bat-hose.cyclic.app";

function Itineraries() {
  const [itineraries, setItineraries] = useState(null)
  const defaultImageUrl = 'https://images.unsplash.com/photo-1499591934245-40b55745b905?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2372&q=80'

  useEffect(() => {
    axios
      .get(`${API_URL}/api/itineraries`)
      .then(response => {
        setItineraries(response.data)
      })
      .catch(err => console.log(err))

  }, [])

  return (
    <div style={{display:'flex', flexDirection:'column', alignItems:'center'}}>

      {(!itineraries && (
        <Box sx={{ display: 'flex', width:'100%', justifyContent:'center', top:'calc(50% - 93px)', position:'absolute'}}>
          <CircularProgress />
        </Box>
      )) || (

      <Container maxWidth="xl">
        <Grid xs={12} sx={{ fontWeight: "700", fontSize: "1rem", margin: "2em 0", textTransform: "uppercase", padding: "2em"}}>
                <Typography variant="h5" component="span" sx={{ fontWeight: "700", color: "#26475e", fontSize: "2rem", textTransform: "uppercase" }}>
                Itineraries
                </Typography>
            </Grid>
        {/* <h1 style={{fontSize:'2.75em', fontWeight:'lighter'}}>List of itineraries</h1> */}
        <Grid container spacing={6}
          justifyContent="center"
          alignItems="center"
        >

        {itineraries.map((itinerary) => {
          return(
            <Grid item xs={12} sm={12} md={6} lg={4} xl={4}
              display='flex'
              justifyContent='center'
              alignItems='center'
              key={itinerary._id}
            >
              <ItineraryCard 
                title={itinerary.title}
                cities={itinerary.cities}
                countries={itinerary.countries}
                user={itinerary.user}
                imageUrl={itinerary.imageUrl || defaultImageUrl}
                notes={itinerary.notes}
                id={itinerary._id}
                contributorId={itinerary.contributor}
              />
            </Grid>
          )
        })}
        </Grid>
      </Container>
      )}
    </div>
  )
}

export default Itineraries