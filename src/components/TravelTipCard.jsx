import * as React from 'react';
import { useNavigate } from 'react-router-dom'
import ListItem from '@mui/material/ListItem';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import BedroomParentIcon from '@mui/icons-material/BedroomParent';
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import IconButton from '@mui/material/IconButton';
import HikingIcon from '@mui/icons-material/Hiking';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import { useContext } from "react";                     
import { AuthContext } from "../context/auth.context";   

const API_URL = process.env.REACT_APP_API_URL || "https://long-lime-bat-hose.cyclic.app";

export default function TravelTipCard({_id, title, description, category, user, deleteTravelTip, index}) {
    const navigate = useNavigate();

    const isLoggedIn = useContext(AuthContext).isLoggedIn;
    const loggedInUser = useContext(AuthContext).user;
    const handleDeleteClick = (event, id) => {
        const storedToken = localStorage.getItem('authToken');
        axios
          .delete(`${API_URL}/api/traveltips/${id}`, { headers: { Authorization: `Bearer ${storedToken}` } })
          .then((response) => {
            deleteTravelTip(index)
            navigate("/traveltips");
          })
          .catch((err) => console.log(err));
    };  
    return (
    <>
    <ListItem alignItems="flex-start">
        <ListItemAvatar sx={{marginRight: "2rem"}}>
            {category === "Flight" && <Avatar sx={{color:'#ffffff', background:'#ffbd59', width: "50px", height: "50px"}}><FlightTakeoffIcon /></Avatar>}
            {category === "Hotel" && <Avatar sx={{color:'#ffffff', background:'#ffbd59', width: "50px", height: "50px"}}><BedroomParentIcon/></Avatar>}
            {category === "Transport" && <Avatar sx={{color:'#ffffff', background:'#ffbd59', width: "50px", height: "50px"}}><DirectionsBusIcon/></Avatar>}
            {category === "Other" && <Avatar sx={{color:'#ffffff', background:'#ffbd59', width: "50px", height: "50px"}}><HikingIcon/></Avatar>}
        </ListItemAvatar>
        <ListItemText 
          sx={{ width: "100%" }}
          secondary={
            <React.Fragment>
               <Typography variant="subtitle2" component="span" sx={{ fontWeight: "700", color: "black", fontSize: "1rem", textTransform: "uppercase" }}>
                  {title} 
                </Typography>
              <Stack spacing={2}>
                <Typography variant="string" component="span">
                  {category} 
                </Typography>

                <Typography variant="string" component="span">
                  {description} 
                </Typography>

                <Typography variant="span" component="span">
                 <Chip label={user && `By: ${user.name}`}/>
                </Typography>
              </Stack> 
            </React.Fragment>
          }
        />
        <ListItemText
          sx={{ textAlign: "right" }}
          secondary={
            <React.Fragment>
                {
                    isLoggedIn && 
                    user && 
                    loggedInUser._id === user._id &&
                    (  
                        <IconButton sx={{color:'#ffffff', background:'#c81515'}} aria-label="delete" color="primary" onClick={(event) => handleDeleteClick(event, _id)}>
                            <DeleteForeverIcon />
                        </IconButton>
                    )
                }      
            </React.Fragment>
          }
        />
      </ListItem>
    </>
  );
}
