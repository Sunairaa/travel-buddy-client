import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import FlightDetailsCard from './FlightDetailsCard';
import HotelDetailsCard from './HotelDetailsCard';
import ActivitiesDetailsCard from './ActivitiesDetailsCard';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Chip } from '@mui/material';
import { Container } from '@mui/material';

const API_URL = process.env.REACT_APP_API_URL || "https://long-lime-bat-hose.cyclic.app";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
  duration: theme.transitions.duration.shortest,
  }),
}));

function ItineraryDetailsCard({isOwner, isContributor, title, duration, imageUrl, user, cities, countries, notes, flightDetails, hotelDetails, activities, id }) {
  const [showFlights, setShowFlights] = React.useState(true);
  const [showHotels, setShowHotels] = React.useState(true);
  const [showActivities, setShowActivities] = React.useState(true);
  const [showRecommendations, setShowRecommendations] = React.useState(true);
  const [errorMessage, setErrorMessage] = React.useState(undefined);

  const navigate = useNavigate();
  const defaultImageUrl = 'https://images.unsplash.com/photo-1499591934245-40b55745b905?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2372&q=80'



  const handleShowFlightsClick = () => {
    setShowFlights(!showFlights);
  };

  const handleShowHotelsClick = () => {
    setShowHotels(!showHotels);
  };

  const handleShowActivitiesClick = () => {
    setShowActivities(!showActivities);
  };

  const handleShowRecommendationsClick = () => {
    setShowRecommendations(!showRecommendations);
  };

  const handleDeleteClick = () => {
    const storedToken = localStorage.getItem('authToken');
    axios
      .delete(`${API_URL}/api/itineraries/${id}`, { headers: { Authorization: `Bearer ${storedToken}` } })
      .then(() => {
        navigate("/profile/itineraries");
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      })
      // .catch((err) => console.log(err));
  };  

  return (
    <div>
    <Container maxWidth="xl" style={{display:'flex', flexDirection:'column', alignItems:'center'}}>
      <Card sx={{ width: '90%', margin:8, background: "#c0c1c014"}}>
        <CardHeader
          sx={{ pt:2, px:2}}
          action={
            <>
            <div>
              {(isOwner) && 
              <IconButton onClick={handleDeleteClick} sx={{color:'#ffffff', background:'#c81515', mr: 1}} aria-label="delete" color="primary">
                <DeleteForeverIcon />
              </IconButton>
              }
              {(isOwner || isContributor) && 
              <Link to={`/itineraries/edit/${id}`}>
                <IconButton sx={{color:'#ffffff', background:'#26475e'}} color="primary">
                  <EditIcon />
                </IconButton>
              </Link>
              }
            </div>
            </>
          }
          />
          <CardContent>
            <Typography gutterBottom variant="h3" component="div" sx={{ fontWeight: "700", color: "#26475e", fontSize: "2rem", textTransform: "uppercase" }}>
              {title}
            </Typography>     
            <Typography variant="h6" color="text.secondary">
              {`Duration -  ${duration} days`}
            </Typography>      
          </CardContent>
          
        <CardMedia
          component="img"
          alt="itinerary pic"
          height="600"
          image={imageUrl}
          style={{objectFit:'cover'}}
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary" style={{textAlign:'end'}}>
           <Chip sx={{bgcolor:"#ffbd59" , color:"#26475e"}} label={`By: ${user.name}`} />
          </Typography>
          <Typography variant="body2" color="text.secondary" style={{padding:0, margin:"1em", display:'flex', justifyContent:'center'}}>
          <Typography gutterBottom variant="h5" component="div">
              Countries
          </Typography >
              <ul style={{listStyleType:'none', padding:0, margin:0, display:'flex', justifyContent:'center'}}>
                {countries.map((country) => {
                  return(
                    <li style={{marginLeft:'5px', marginRight:'5px', marginBottom:'8.4px'}}>                    
                      <Chip label={country} />
                    </li>
                  )
                })}
              </ul>
          </Typography>
          <Typography variant="body2" color="text.secondary" style={{pl:6, margin:0, display:'flex', justifyContent:'center'}}>
          <Typography gutterBottom variant="h5" component="span">
              Cities
          </Typography >
              <ul style={{listStyleType:'none', padding:0, margin:0, display:'flex', justifyContent:'center', marginBottom:'8.4px'}}>
                {cities.map((city) => {
                  return(
                    <li style={{marginLeft:'5px', marginRight:'5px'}}>
                      <Chip label={city} />
                    </li>
                  )
                })}
              </ul>
          </Typography>
        </CardContent>
        <CardContent>
          <Divider Divider textAlign="left" style={{width:'100%'}}>
              FLIGHT DETAILS
              <ExpandMore
                expand={showFlights}
                onClick={handleShowFlightsClick}
                aria-expanded={showFlights}
                aria-label="show more"
              >
                <ExpandMoreIcon />
              </ExpandMore>
          </Divider>
          
          <Collapse in={showFlights} timeout="auto" unmountOnExit>
            <Grid container spacing={6}
              sx={{py: 4}}
              justifyContent="center"
              alignItems="center"
            >   
              {flightDetails.map((flight, index) => (
                <Grid  
                  item xs={12} sm={12} md={6} lg={4} xl={3}
                  display='flex'
                  justifyContent='flex-start'
                  alignItems='center'
                  
                >
                  <FlightDetailsCard 
                    airline={flight.airline}
                    date={flight.date}
                    time={flight.time}
                    departure={flight.departure}
                    arrival={flight.arrival}
                    index={index}
                  />
                </Grid>
              ))}
            </Grid>
          </Collapse>

          <Divider Divider textAlign="left" style={{width:'100%'}}>
              HOTEL DETAILS
              <ExpandMore
                expand={showHotels}
                onClick={handleShowHotelsClick}
                aria-expanded={showHotels}
                aria-label="show more"
              >
                <ExpandMoreIcon />
              </ExpandMore>
          </Divider>
          
          <Collapse in={showHotels} timeout="auto" unmountOnExit>
            <Grid container spacing={6}
              justifyContent="center"
              alignItems="center"
              sx={{py: 4}}
            >   
              {hotelDetails.map((hotel, index) => (
                <Grid  
                  item xs={12} sm={12} md={6} lg={4} xl={3}
                  display='flex'
                  justifyContent='flex-start'
                  alignItems='center'
                >
                  <HotelDetailsCard 
                    name={hotel.name}
                    checkin={hotel.checkin}
                    checkout={hotel.checkout}
                    index={index}
                  />
                </Grid>
              ))}
            </Grid>
          </Collapse>

          <Divider Divider textAlign="left" style={{width:'100%'}}>
              ACTIVITIES
              <ExpandMore
                expand={showActivities}
                onClick={handleShowActivitiesClick}
                aria-expanded={showActivities}
                aria-label="show more"
              >
                <ExpandMoreIcon />
              </ExpandMore>
          </Divider>
          
          <Collapse in={showActivities} timeout="auto" unmountOnExit>
            <Grid container spacing={6}
              justifyContent="center"
              alignItems="center"
            >   
              {activities.map((activity, index) => (
                <Grid  
                  item xs={12} sm={12} md={6} lg={4} xl={3}
                  display='flex'
                  justifyContent='flex-start'
                  alignItems='center'
                  sx={{py: 4}}
                >
                  <ActivitiesDetailsCard 
                    title={activity.title}
                    date={activity.date}
                    time={activity.time}
                    location={activity.location}
                    note={activity.note}
                    imageUrl={activity.image || defaultImageUrl}
                    index={index}
                  />
                </Grid>
              ))}
            </Grid>
          </Collapse>
          <Divider Divider textAlign="left" style={{width:'100%'}}>
              NOTES
              <ExpandMore
                expand={showRecommendations}
                onClick={handleShowRecommendationsClick}
                aria-expanded={showRecommendations}
                aria-label="show more"
              >
                <ExpandMoreIcon />
              </ExpandMore>
          </Divider>
          
          <Collapse in={showRecommendations} timeout="auto" unmountOnExit>

            {/* <Grid container spacing={6}
              justifyContent="flex-start"
              alignItems="center"
              sx={{py: 4}}
            >   
                <Grid  
                  item xs={12} sm={12} md={6} lg={12} xl={3}
                  display='flex'
                  justifyContent='flex-start'
                  alignItems='center'
                > */}

                  <Typography variant="body2" color="text.secondary">
                  <div style={{display:'flex', justifyContent:'center'}}>
                      <div style={{textAlign:'left'}}>
                  <List sx={{ width: '100%'}}>
                    
                    {notes.map((note) => {
                      return(
                        <>
                        <ListItem disablePadding key = {note}>
                        <ListItemButton>
                          <ListItemIcon>
                            <RadioButtonUncheckedIcon fontSize='xs' sx={{color: "#ffbd59"}}/>
                          </ListItemIcon>
                          <ListItemText primary={note} />
                        </ListItemButton>
                      </ListItem>
                      </>
                      )
                    })}
                </List>
                  </div>
                  </div>
                    <br/>
                  </Typography>

                {/* </Grid>
            </Grid> */}
            
          </Collapse>
        </CardContent>
      </Card>
    </Container>
    </div>
  );
}

export default ItineraryDetailsCard