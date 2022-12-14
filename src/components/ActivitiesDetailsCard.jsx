import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardMedia } from '@mui/material';
import moment from 'moment'

function ActivitiesDetailsCard({title, date, time, location, note, imageUrl, index}) {
  return (
    <Card style={{width:'100%', border: "#ffbd59 2px dashed", boxShadow: "none"}}>
      <CardContent>
      <Typography variant="body2" color="text.secondary">
          Activity {index + 1}
        </Typography>
        <Typography variant="body2" sx={{mb: 2}}>
          {title}
        </Typography>
        <CardMedia
            component="img"
            alt="itinerary pic"
            height="200"
            image={imageUrl}
            style={{objectFit:'cover'}}
        />
        <Typography variant="body2" color="text.secondary" sx={{mt: 3}}>
          {moment(date).format('DD/MM/YYYY')} - {moment(time).format('h:mm A')}
        </Typography>
        <Typography variant="body2" >
         {location}
        </Typography>
        <Typography variant="body2" color="text.secondary" >
          {note}
        </Typography>

      </CardContent>
    </Card>
  );
}

export default ActivitiesDetailsCard