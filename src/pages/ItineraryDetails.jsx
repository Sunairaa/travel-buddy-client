import React from 'react'
import { useState, useEffect} from 'react'
import axios from 'axios'
import {useParams} from 'react-router-dom'

function ItineraryDetails() {
  const [itinerary, setItinerary] = useState(null)
  const {id} = useParams()

  useEffect(() => {
    axios
      .get(`http://localhost:5005/api/itineraries/${id}`)
      .then(response => {
        setItinerary(response.data)
      })
      .catch(err => console.log(err))

  }, [id])

  if(!itinerary){
    return 'Loading'
  }

  return (
    <div>
      <h1>Itinerary</h1>
        <h2>{itinerary.title}</h2>
        <img src={itinerary.imageUrl} alt='itinerary pic'/>

        <h3>Countries you will visit</h3>
        <ol>
            {itinerary.countries.map((country) => {
            return(
                <li>{country}</li>
            )
            })}
        </ol>

        <h3>Cities you will visit</h3>
        <ol>
            {itinerary.cities.map((city) => {
            return(
                <li>{city}</li>
            )
            })}
        </ol>

        <h3>Flight details</h3>
        <ul>
            {itinerary.flightDetails.map((item) => {
            return(
                <li>
                <p>{item.departureCity}</p>
                <p>{item.arrivalCity}</p>
                <p>{item.departureDate}</p>
                <p>{item.airline}</p>
                </li>
            )
            })}
        </ul>

        <h3>Hotel details</h3>
        <ul>
            {itinerary.hotelDetails.map((item) => {
            return(
                <li>
                <p>{item.city}</p>
                <p>{item.checkIn}</p>
                <p>{item.checkOut}</p>
                <p>{item.name}</p>
                </li>
            )
            })}
        </ul>

        <h3>Notes:</h3>
        <p>{itinerary.notes}</p>

        <h3>Activities</h3>
        {/* <ul>
            {itinerary.activities.map((item) => {
            return(
                <li>
                <p>{item}</p>
                </li>
            )
            })}
        </ul> */}
    </div>
  )
}

export default ItineraryDetails