import * as React from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import FlightIcon from '@mui/icons-material/Flight';
import BedroomParentIcon from '@mui/icons-material/BedroomParent';
import LuggageIcon from '@mui/icons-material/Luggage';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import { useContext } from "react";                     
import { AuthContext } from "../context/auth.context";   

export default function TravelTipCard({_id, title, description, category, user, deleteTravelTip, index}) {
    const navigate = useNavigate();

    const isLoggedIn = useContext(AuthContext).isLoggedIn;
    const loggedInUser = useContext(AuthContext).user;
    
    const handleDeleteClick = (event, id) => {
        const storedToken = localStorage.getItem('authToken');
        axios
          .delete(`http://localhost:5005/api/traveltips/${id}`, { headers: { Authorization: `Bearer ${storedToken}` } })
          .then((response) => {
            deleteTravelTip(index)
            navigate("/traveltips");
          })
          .catch((err) => console.log(err));
    };  
    return (
    <>
    <ListItem alignItems="flex-start">
        <ListItemAvatar>
            {category === "Flight" && <Avatar><FlightIcon/></Avatar>}
            {category === "Hotel" && <Avatar><BedroomParentIcon/></Avatar>}
            {category === "Travel" && <Avatar><LuggageIcon/></Avatar>}
            {category === "Other" && <Avatar><FlightIcon/></Avatar>}
        </ListItemAvatar>
        <ListItemText
          primary={title}
          secondary={
            <React.Fragment>
                <Typography variant="string" component="span">
                {description} 
                </Typography>

                <br></br>
                <br></br>
                
                <Typography variant="span" component="span">
                By: <Chip label={user.name}/>
                </Typography>
               
                
            </React.Fragment>
          }
        />
      </ListItem>
      <ListItem alignItems="flex-start">
        <ListItemText
          secondary={
            <React.Fragment>
                {
                    isLoggedIn && 
                    loggedInUser._id === user._id &&
                    (  
                        <IconButton aria-label="delete" color="primary" onClick={(event) => handleDeleteClick(event, _id)}>
                            <DeleteIcon />
                        </IconButton>
                    )
                }    
            </React.Fragment>
          }
        />
      </ListItem>

    {/* //   <Divider variant="inset" component="li" />
    //   <Divider Divider textAlign="left" style={{width:'100%'}}>
    //                    FLIGHT DETAILS
    //     </Divider> */}
    </>
      

  );
}