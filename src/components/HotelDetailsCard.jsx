import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import moment from 'moment'

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
          CheckIn: {moment(checkin).format('DD/MM/YYYY')}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          CheckOut: {moment(checkout).format('DD/MM/YYYY')}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default HotelDetailsCard