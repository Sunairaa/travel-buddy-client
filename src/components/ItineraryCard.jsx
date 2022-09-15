import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import {Link} from 'react-router-dom';
import { Chip } from '@mui/material';

function ItineraryCard({title, cities, countries, user, imageUrl, notes, id}) {
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
        <div variant="body2" color="text.secondary">
        <Typography gutterBottom variant="h5" component="div">
            Countries
        </Typography >
            <ul style={{listStyleType:'none', padding:0, display:'flex', justifyContent:'center', marginBottom:'8.4px'}}>
              {countries.map((country) => {
                return(
                  <Chip key={country} sx={{mr:1}} label={country} />
                )
              })}
            </ul>
        </div>

        <div variant="body2" color="text.secondary">
        <Typography gutterBottom variant="h5" component="div">
            Cities
        </Typography >
            <ul style={{listStyleType:'none', padding:0, mr:1, display:'flex', justifyContent:'center', marginBottom:'8.4px'}}>
              {cities.map((city) => {
                return(
                  // <li>{city}</li>
                  <Chip key={city} sx={{mr:1}} label={city} />
                )
              })}
            </ul>
        </div>
        
        <Typography variant="body2" color="text.secondary" style={{mt: 4, textAlign:'end'}}>
          By: {user && user.name}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default ItineraryCard