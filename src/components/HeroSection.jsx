import * as React from 'react';
import { Button } from '@mui/material';
import Typography from './Typography';
import HeroSectionLayout from './HeroSectionLayout';
import { Link } from 'react-router-dom';
import { useContext } from "react";                     
import { AuthContext } from "../context/auth.context";  

const backgroundImage =
  'https://images.unsplash.com/photo-1596395819057-e37f55a8516b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80';

export default function HeroSection() {

    const { isLoggedIn } = useContext(AuthContext);

    return (
    <HeroSectionLayout
      sxBackground={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundColor: '#7fc7d9', // Average color of the background image.
        backgroundPosition: 'center',
        
      }}
    >
      {/* Increase the network loading priority of the background image. */}
      <img
        style={{ display: 'none' }}
        src={backgroundImage}
        alt="increase priority"
      />
      <Typography color="inherit" align="center" variant="h2" 
    //   marked="center"
      >
        Plan Your Travels Perfectly
      </Typography>
      <Typography
        color="inherit"
        align="center"
        variant="h5"
        sx={{ mb: 4, mt: { sx: 4, sm: 10 } }}
      >
        A community of wonderful travellers to help and inspire the world of exploration.
      </Typography>
      {isLoggedIn && 
        <Link to="/home">
        <Button variant="raised" component="span" sx={{ px:4, py:2, minWidth: 200, backgroundColor:" #ffbd59", color: "#fff"}}>
        GET STARTED
        </Button>
      </Link>
      }
      {!isLoggedIn && 
        <Link to="/signup">
        <Button variant="raised" component="span" sx={{ px:4, py:2, minWidth: 200, backgroundColor:" #ffbd59", color: "#fff"}}>
        GET STARTED
        </Button>
      </Link>
      }
      
      <Typography variant="body2" color="inherit" sx={{ mt: 2 }}>
        Explore the world
      </Typography>
    </HeroSectionLayout>
  );
}
