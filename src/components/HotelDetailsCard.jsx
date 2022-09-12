import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

function HotelDetailsCard({name, checkin, checkout, index}) {
  return (
    <Card style={{width:'100%'}}>
      <CardContent>
      <Typography variant="body2" color="text.secondary">
          Hotel {index + 1}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Name: {name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          CheckIn: {checkin}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          CheckOut: {checkout}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default HotelDetailsCard