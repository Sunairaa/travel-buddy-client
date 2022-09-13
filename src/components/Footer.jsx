import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';

function Copyright() {
  return (
    <Typography variant="body2" color="#ffbd59">
      {'Copyright © '}
      Travel Buddy 2022
    </Typography>
  );
}

function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: 'auto',
        color:'#ffffff',
        backgroundColor:"#26475E"
      }}
    >
      <Container maxWidth="xl" >
        <Box sx={{ flexGrow: 1 }} >
          {/* <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}> */}

              <div >

              {/* Sunaira */}
              <div style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
                <Typography style={{width:'150px', textAlign:'end'}} variant="body1">
                  Sunaira Syed
                </Typography> 
                <Link style={{margin:'0 16px'}} target='_blank' href='https://github.com/Sunairaa'>
                  <GitHubIcon sx={{color:'#ffbd59'}} fontSize="large"/>
                </Link>
                <Link target='_blank' href='https://www.linkedin.com/in/sunaira-syed/'>
                  <LinkedInIcon sx={{color:'#ffbd59'}} fontSize="large"/>
                </Link>       
              </div>

              {/* Alejandra */}
              <div style={{display:'flex', justifyContent:'center', alignItems:'center', margin:'20px'}}>
                <Typography style={{width:'150px', textAlign:'end'}} variant="body1">
                  Alejandra Rodríguez
                </Typography>        
                <Link style={{margin:'0 16px'}} target='_blank' href='https://github.com/alerodriguezabella'>
                  <GitHubIcon sx={{color:'#ffbd59'}} fontSize="large"/>
                </Link>
                <Link target='_blank' href='https://www.linkedin.com/in/alejandra-rodriguez-abella/'>
                  <LinkedInIcon sx={{color:'#ffbd59'}} fontSize="large"/>
                </Link> 
              </div> 
              
              </div>

          {/* </Grid> */}
        </Box>
        <Copyright/>
      </Container>
    </Box>
  );
}

export default Footer

