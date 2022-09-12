import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

function FlightDetailsCard({airline, date, time, departure, arrival, index}) {
  return (
    <Card style={{width:'100%'}}>
      <CardContent>
      <Typography variant="body2" color="text.secondary">
          Flight {index + 1}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Airline: {airline}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Date: {date}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Time: {time}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Departure: {departure}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Arrival: {arrival}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default FlightDetailsCard