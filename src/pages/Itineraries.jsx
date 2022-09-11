import React from 'react'
import { useState, useEffect} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'


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
    <div>
      <h1>List of itineraries</h1>
      {itineraries.map((itinerary) => {
        return(
          <div key={itinerary._id}>
            <h3><Link to={`/itineraries/${itinerary._id}`}>{itinerary.title}</Link></h3>
            <img src={itinerary.imageUrl} alt='itinerary pic'/>
            <h3>Cities you will visit</h3>
            <ol>
              {itinerary.cities.map((city) => {
                return(
                  <li>{city}</li>
                )
              })}
            </ol>
            <h3>Recommendations:</h3>
            <p>{itinerary.notes}</p>
          </div>
        )
      })}
    </div>
  )
}

export default Itineraries