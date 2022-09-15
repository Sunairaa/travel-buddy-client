import * as React from 'react';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Typography from './Typography';
import patternImage from "../productCurvyLines.png"
import LuggageIcon from '@mui/icons-material/Luggage';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';

const item = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  px: 5,
};

function FeatureSection() {
  return (
    <Box
      component="section"
      sx={{ display: 'flex', bgcolor: '#f4f4f4'}}
    >
      <Container sx={{ mt: 15, mb: 30, display: 'flex', position: 'relative'}}>
        <Box
          component="img"
          src={patternImage}
          alt="curvy lines"
          sx={{ pointerEvents: 'none', position: 'absolute', top: -120, width: "100%", height: "600px" }}
        />
        <Grid container spacing={5}>
          <Grid item xs={12} md={4}>
            <Box sx={item}>
              <TaskAltIcon sx={{ color: "#26475e"}}/>
              <Typography variant="h6" sx={{ my: 5, textTransform: "uppercase" }}>
                View Fascinating Itineries
              </Typography>
              <Typography variant="body1">
                {
                  'Romantic Paris, Fascinating Tokyo, Dreamy New York City? '
                }

                {
                  'Explore and get inspired from a pool of wonderful travel itineries, created by community of amazing travellers.'
                }
              </Typography>
                <Link to='/itineraries'>
                    <Button variant="raised" component="span" sx={{ textAlign:"left", bgcolor: '#ffbd59', marginTop:'12px'}}>
                        Explore Itineraries
                    </Button>
                </Link>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={item}>
              <TaskAltIcon sx={{ color: "#26475e"}}/>
              <Typography variant="h6" sx={{ my: 5, textTransform: "uppercase" }}>
                Create your Itinerary
              </Typography>
              <Typography variant="body1">
                {
                  'Writing notes, bookmarking multiple sources and stressed over managing your travel? '
                }

                {'Plan and manage your next exciting travel itinerary digitally and also contribute to the community by sharing it publicly.'}
              </Typography>
              <Link to='/new-itinerary'>
                    <Button variant="raised" component="span" sx={{ textAlign:"left", bgcolor: '#ffbd59', marginTop:'12px'}}>
                    Creat an Itinerary
                    </Button>
                </Link>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={item}>
              <TaskAltIcon sx={{ color: "#26475e"}}/>
              <Typography variant="h6" sx={{ my: 5, textTransform: "uppercase" }}>
                View Travel Tips
              </Typography>
              <Typography variant="body1">
                {'Want to learn amazing ways to take your travel to next level?'}
                {' View wonderful travel tips shared by the community.'}
              </Typography>
              <Link to='/traveltips'>
                    <Button variant="raised" component="span" sx={{ textAlign:"left", bgcolor: '#ffbd59', marginTop:'12px'}}>
                        Travel Tips
                    </Button>
                </Link>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default FeatureSection;
