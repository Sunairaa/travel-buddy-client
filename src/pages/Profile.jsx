import React from 'react'
import axios from 'axios'
import Card from '@mui/material/Card'
import { useContext } from "react";                     
import { AuthContext } from "../context/auth.context"; 
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar'
import Container from '@mui/material/Container';
import service from "../api/service";
import Grid from '@mui/material/Grid';
import Input from '@mui/material/Input';
import Button from '@mui/material/Button';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { Link } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const API_URL = process.env.REACT_APP_API_URL || "https://long-lime-bat-hose.cyclic.app";

function Profile() {
  const { user, setUser } = useContext(AuthContext);

  // ******** this method handles the file upload ********
  const handleProfileImageUpload = (e) => {
    console.log("Itinerary Image")

    // console.log("The file to be uploaded is: ", e.target.files[0]);

    const uploadData = new FormData();

    // image => this name has to be the same as in the model since we pass
    // req.body to .create() method when creating a new movie in '/api/itineraries' POST route
    uploadData.append("image", e.target.files[0]);

    service
      .uploadImage(uploadData)
      .then(response => {
        // console.log("response is: ", response);
        // response carries "fileUrl" which we can use to update the state
        const storedToken = localStorage.getItem('authToken');
        return axios 
          .put(`${API_URL}/api/profile`, {imageUrl: response.fileUrl}, { headers: { Authorization: `Bearer ${storedToken}` } })
          .then( response => {
            setUser(response.data)
          })
      })
      .catch(err => console.log("Error while uploading the file: ", err));
  };

  return (
      <Container maxWidth="xl" style={{display:'flex', flexDirection:'column', alignItems:'center', marginTop:'20px', marginBottom:'20px' }}>
        {(!user && (
          <Box sx={{ display: 'flex', width:'100%', justifyContent:'center', top:'calc(50% - 93px)', position:'absolute'}}>
            <CircularProgress />
          </Box>
        )) || (
          <>
            <Card style={{width:'90%'}}>
              <CardContent style={{display:'flex', flexDirection:'column', alignItems:'center', margin:'10px'}}>
                <Typography sx={{ fontWeight: "700", color: "#26475e", fontSize: "2rem", textTransform: "uppercase", marginTop:'8px' }} gutterBottom variant="h4" component="div">
                  User information
                </Typography>

                <Avatar sx={{ width: 90, height: 90 }} style={{margin:'8px'}} alt="Remy Sharp" src={user.imageUrl} />

                <Grid item container xs={12} justifyContent="center" style={{margin:'8px 8px 8px 0px'}} sx={{ pl: 2}}>
                      <Input
                          accept="image/*"
                          style={{ display: 'none' }}
                          id="raised-button-file"
                          multiple
                          type="file"
                          onChange={(e) => handleProfileImageUpload(e)}
                          />
                          <label htmlFor="raised-button-file">
                              <Button variant="raised" component="span" sx={{ bgcolor: '#ffbd59'}} startIcon={<AddPhotoAlternateIcon />}>
                                  Image
                              </Button>
                          </label> 
                  </Grid>

                <Typography style={{margin:'8px'}} variant="body2" color="text.secondary">
                  Name: {user.name}
                </Typography>
                <Typography style={{margin:'8px'}} variant="body2" color="text.secondary">
                  Email: {user.email}
                </Typography>
              </CardContent>
            </Card>
            <Link to={'/profile/itineraries'}>
              <Button style={{marginTop:'12px'}} variant="raised" component="span" sx={{ bgcolor: '#ffbd59'}}>
                Check my itineraries
              </Button>
            </Link>
          </>
        )}
    </Container>
  )
}

export default Profile