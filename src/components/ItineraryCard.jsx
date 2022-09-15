import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import {Link} from 'react-router-dom';
import { Chip } from '@mui/material';
import { useContext } from "react";                     
import { AuthContext } from "../context/auth.context";   
import StarsIcon from '@mui/icons-material/Stars';

function ItineraryCard({title, cities, countries, user, imageUrl, notes, id, contributorId}) {
  const isLoggedIn = useContext(AuthContext).isLoggedIn;
  const loggedInUser = useContext(AuthContext).user;

  return (
    <Card sx={{ width: '90%', marginBottom:8, maxWidth:500}}>
      <CardMedia
        component="img"
        alt="itinerary pic"
        height="200"
        image={imageUrl}
        style={{objectFit:'cover'}}
      />
      <CardContent>
        
        <Link to={`/itineraries/${id}`}>
            <Typography gutterBottom variant="h4" component="div">
            {title}
            </Typography>
        </Link>
        <Typography variant="body2" color="text.secondary">
        <Typography gutterBottom variant="h5" component="div">
            Countries
        </Typography >
            <ul style={{listStyleType:'none', padding:0, display:'flex', justifyContent:'center', marginBottom:'8.4px'}}>
              {countries.map((country) => {
                return(
                  <Chip sx={{mr:1}} label={country} />
                )
              })}
            </ul>
        </Typography>

        <Typography variant="body2" color="text.secondary">
        <Typography gutterBottom variant="h5" component="div">
            Cities
        </Typography >
            <ul style={{listStyleType:'none', padding:0, mr:1, display:'flex', justifyContent:'center', marginBottom:'8.4px'}}>
              {cities.map((city) => {
                return(
                  // <li>{city}</li>
                  <Chip sx={{mr:1}} label={city} />
                )
              })}
            </ul>
        </Typography>

        <Typography variant="body2" color="text.secondary" sx={{mt: 4, display:'flex', justifyContent:"space-between", alignItems: "center"}}>
        {isLoggedIn && loggedInUser._id === contributorId &&
          (
            <Chip sx={{mr:1}} color="primary" label="Contributor" icon={<StarsIcon />} />
          )
        }


        {isLoggedIn && user && loggedInUser._id === user._id &&
          (
            <Chip sx={{mr:1}} color="primary" label="Owner" icon={<StarsIcon />} />
          )
        }


        <Chip sx={{bgcolor:"#ffbd59" , color:"#26475e", alignSelf:"right", ml: "auto"}} label={user && `By: ${user.name}`}/>

        </Typography>
      </CardContent>
    </Card>
  );
}

export default ItineraryCard