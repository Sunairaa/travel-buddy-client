import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import {Link} from 'react-router-dom';

function ItineraryCard({title, cities, user, imageUrl, notes, id}) {
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
        <Typography variant="body2" color="text.secondary" style={{textAlign:'end'}}>
          By: {user && user.name}
        </Typography>
        <Link to={`/itineraries/${id}`}>
            <Typography gutterBottom variant="h4" component="div">
            {title}
            </Typography>
        </Link>
        <Typography variant="body2" color="text.secondary">
        <Typography gutterBottom variant="h5" component="div">
            Cities you'll visit
        </Typography >
            <ul style={{listStyleType:'none', padding:0, margin:0, display:'flex', justifyContent:'space-evenly', marginBottom:'8.4px'}}>
              {cities.map((city) => {
                return(
                  <li>{city}</li>
                )
              })}
            </ul>
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Recommendations: {notes}
          <br/>
        </Typography>
      </CardContent>
    </Card>
  );
}

export default ItineraryCard