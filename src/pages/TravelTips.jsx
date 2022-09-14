import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from 'react-router-dom'
import { Grid } from "@mui/material";
import List from '@mui/material/List';
import Box from '@mui/material/Box';
import TravelTipCard from '../components/TravelTipCard'
import Button from '@mui/material/Button';
import FormGroup from '@mui/material/FormGroup';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import AntSwitch from '../components/AntSwitch';
import Stack from '@mui/material/Stack';
import { useContext } from "react";                     
import { AuthContext } from "../context/auth.context";   

const API_URL = process.env.REACT_APP_API_URL || "https://long-lime-bat-hose.cyclic.app";


function TravelTips() {

    const [travelTips, setTravelTips] = useState([]);
    const [viewAllTips, setViewAllTips] = useState(true);

    const isLoggedIn = useContext(AuthContext).isLoggedIn;
    const loggedInUser = useContext(AuthContext).user;

    const getAllTravelTips = () => {  
      axios
        .get(`${API_URL}/api/traveltips`)
        .then((response) => {
            setTravelTips(response.data)
        })
        .catch((error) => console.log(error));
    };

    const deleteTravelTip = (index) => {
        const list = [...travelTips];
        list.splice(index, 1);
        setTravelTips(list);
    }

    const handleFilter = (e) => {
        console.log(e.target.checked)
        setViewAllTips(e.target.checked)
    }

    useEffect(() => {
        getAllTravelTips()
    }, [])


    
    return (
    <Box>
        <Grid container spacing={2} sx={{ justifyContent: "center" , alignContent: "center"}} >
            <Grid xs={12} sx={{ fontWeight: "700", fontSize: "1rem", margin: "2em 0", textTransform: "uppercase", padding: "2em"}}>
                <Typography variant="h5" component="span" sx={{ fontWeight: "700", color: "#26475e", fontSize: "2rem", textTransform: "uppercase" }}>
                  Travel Tips
                </Typography>
            </Grid>

            {isLoggedIn &&
                (
                    <Grid container xs={10} spacing={2}>
                        <Grid item xs={10} sx={{ textAlign:"left"}}>
                            <Link to='/new-travel-tip'>
                                <Button variant="raised" component="span" sx={{ textAlign:"left", bgcolor: '#ffbd59', marginTop:'12px'}}>
                                    Create Travel Tip
                                </Button>
                            </Link>
                        </Grid>
                        <Grid item xs={10}>
                            <FormGroup>
                                <Stack direction="row" spacing={1} alignItems="center">
                                    <Typography>Filter Mine</Typography>
                                        <AntSwitch 
                                            defaultChecked
                                            onChange={handleFilter} 
                                            inputProps={{ 'aria-label': 'ant design' }} />
                                    <Typography>View All</Typography>
                                </Stack>
                            </FormGroup>
                        </Grid>
                    </Grid>
                  
                )
            }
            
            
       
        <Grid item xs={10} md={10}>
             {!viewAllTips &&  
                travelTips.filter((tip) => {
                    return loggedInUser._id === tip.user._id
                }).map((tip, index) =>{
                    return (
                        <>
                        <List key={tip._id} sx={{ width: '100%', bgcolor: 'background.paper', display: 'flex'}}>
                                <TravelTipCard  {...tip} deleteTravelTip={deleteTravelTip} index={index}></TravelTipCard> 
                        </List>
                        <Divider />
                        </>
                    )
                })
            }

            {viewAllTips &&  
                travelTips.map((tip, index) => {       
                    return(
                        <>
                        <List key={tip._id} sx={{ width: '100%', bgcolor: 'background.paper', display: 'flex'}}>
                            <TravelTipCard {...tip} deleteTravelTip={deleteTravelTip} index={index}></TravelTipCard>
                        </List>
                        <Divider />
                        </>
                    ) 
                 })
            }
        </Grid>
    </Grid>
    </Box>
    
 
    
   
  );
}

export default TravelTips;


