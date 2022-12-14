import React from 'react'
import { useState, useEffect} from 'react'
import axios from 'axios'
import {useParams} from 'react-router-dom'
import ItineraryDetailsCard from '../components/ItineraryDetailsCard';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const API_URL = process.env.REACT_APP_API_URL || "https://long-lime-bat-hose.cyclic.app";

function ItineraryDetails() {
  const [itinerary, setItinerary] = useState(null)
  const [isOwner, setOwner] = useState(false)
  const [isContributor, setContributor] = useState(false)
  const {id} = useParams()
  const defaultImageUrl = 'https://images.unsplash.com/photo-1499591934245-40b55745b905?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2372&q=80'


  useEffect(() => {
    const storedToken = localStorage.getItem('authToken');
    axios
      .get(
        `${API_URL}/api/itineraries/${id}`,
        { headers: { Authorization: `Bearer ${storedToken}` } }
      )
      .then(response => {
        setItinerary(response.data.itinerary)
        setOwner(response.data.isOwner)
        setContributor(response.data.isContributor)
      })
      .catch(err => console.log(err))

  }, [id])

  return (
    <div>

      {(!itinerary && (
        <Box sx={{ display: 'flex', width:'100%', justifyContent:'center', top:'calc(50% - 93px)', position:'absolute'}}>
          <CircularProgress />
        </Box>
      )) || (

      <ItineraryDetailsCard 
        title={itinerary.title}
        duration={itinerary.duration}
        cities={itinerary.cities}
        user={itinerary.user}
        imageUrl={itinerary.imageUrl || defaultImageUrl}
        notes={itinerary.notes}
        id={itinerary._id}
        countries={itinerary.countries}
        flightDetails={itinerary.flightDetails}
        hotelDetails={itinerary.hotelDetails}
        activities={itinerary.activities}
        isOwner={isOwner}
        isContributor={isContributor}
      />
      )}
    </div>
  )
}

export default ItineraryDetails