import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardMedia } from '@mui/material';

function ActivitiesDetailsCard({title, date, time, location, note, imageUrl, index}) {
  return (
    <Card style={{width:'100%'}}>
      <CardContent>
      <Typography variant="body2" color="text.secondary">
          Activity {index + 1}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Title: {title}
        </Typography>
        <CardMedia
            component="img"
            alt="itinerary pic"
            height="200"
            image={imageUrl}
            style={{objectFit:'cover'}}
        />
        <Typography variant="body2" color="text.secondary">
          Date: {date}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Time: {time}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Location: {location}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Note: {note}
        </Typography>

      </CardContent>
    </Card>
  );
}

export default ActivitiesDetailsCard