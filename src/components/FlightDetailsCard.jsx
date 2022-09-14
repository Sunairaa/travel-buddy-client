import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import FlightLandIcon from '@mui/icons-material/FlightLand';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import moment from 'moment'

function FlightDetailsCard({airline, date, time, departure, arrival, index}) {
  return (
    <Card style={{width:'100%', border: "#ffbd59 2px dashed", boxShadow: "none"}}>
      <CardContent>
      <Typography variant="body2" color="text.secondary">
          Flight {index + 1}
        </Typography>
        <Typography variant="body2">
           {airline} Airlines
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {moment(date).format('DD/MM/YYYY')} - {moment(time).format('h:mm A')}
        </Typography>
       
        <Typography variant="body2" color="text.secondary" sx={{mt: 3, display: "flex", justifyContent: "center", alignItems: "center"}}>
          <FlightTakeoffIcon sx={{mx: 1, color: "#ffbd59"}}/> {departure} <ArrowRightAltIcon sx={{mx: 6, }}/> <FlightLandIcon sx={{mx: 1, color: "#ffbd59"}}/>{arrival}
        </Typography>
        {/* <Typography variant="body2" color="text.secondary">
          Arrival: {arrival}
        </Typography> */}
      </CardContent>
    </Card>
  );
}

export default FlightDetailsCard