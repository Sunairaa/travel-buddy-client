import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import moment from 'moment'

function HotelDetailsCard({name, checkin, checkout, index}) {
  return (
    <Card style={{width:'100%', border: "#ffbd59 2px dashed", boxShadow: "none"}}>
      <CardContent>
      <Typography variant="body2" color="text.secondary">
          Hotel {index + 1}
        </Typography>
        <Typography variant="body2">
          {name}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{mt: 3, display: "flex", justifyContent: "center", alignItems: "center"}}>
          {moment(checkin).format('DD/MM/YYYY')}  <ArrowRightAltIcon sx={{mx: 6, }}/>  {moment(checkout).format('DD/MM/YYYY')}
        </Typography>
        
      </CardContent>
    </Card>
  );
}

export default HotelDetailsCard