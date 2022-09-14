import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from 'react-router-dom'
import { Grid } from "@mui/material";
import List from '@mui/material/List';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import loading from '../components/Loading/index'
import TravelTipCard from '../components/TravelTipCard'
import Button from '@mui/material/Button';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Typography from '@mui/material/Typography';
import AntSwitch from '../components/AntSwitch';
import Stack from '@mui/material/Stack';
// import MaterialUISwitch from "../components/MaterialUISwitch";
import { useContext } from "react";                     
import { AuthContext } from "../context/auth.context";   
import CircularProgress from '@mui/material/CircularProgress';

const API_URL = process.env.REACT_APP_API_URL || "https://long-lime-bat-hose.cyclic.app";


function TravelTips() {

    const [travelTips, setTravelTips] = useState(null);
    const [viewAllTips, setViewAllTips] = useState(true);

    const [loading, setLoading] = useState(true);

    const isLoggedIn = useContext(AuthContext).isLoggedIn;
    const loggedInUser = useContext(AuthContext).user;

    const getAllTravelTips = () => {  
      axios
        .get(`${API_URL}/api/traveltips`)
        .then((response) => {
            setTravelTips(response.data)
            setLoading(false)
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

    {loading && 
    (<loading> </loading>) }
    
    return (
    <Box>

        {(!travelTips && (
            <Box sx={{ display: 'flex', width:'100%', justifyContent:'center', top:'calc(50% - 93px)', position:'absolute'}}>
                <CircularProgress />
            </Box>
        )) || (

        <Grid container spacing={2} sx={{ justifyContent: "center" , alignContent: "center", marginTop: "2em"}} >
      
            {isLoggedIn &&
                (
                    <Grid item xs={10} md={10}>
                    <Link to='/new-travel-tip'>
                        <Button variant="raised" component="span" sx={{ bgcolor: '#ffbd59', marginTop:'12px'}}>
                            Create Travel Tip
                        </Button>
                    </Link>
                    <FormGroup>
                        <Stack direction="row" spacing={1} alignItems="center">
                            <Typography>Filter Only Mine</Typography>
                                <AntSwitch 
                                    defaultChecked
                                    onChange={handleFilter} 
                                    inputProps={{ 'aria-label': 'ant design' }} />
                            <Typography>ViewAll</Typography>
                        </Stack>
                    </FormGroup>
                    </Grid>
                )
            }
            
            
       
        <Grid item xs={10} md={10}>
             {!viewAllTips &&  
                travelTips.filter((tip) => {
                    return loggedInUser._id === tip.user._id
                }).map((tip, index) =>{
                    return (
                        <List sx={{ width: '100%', bgcolor: 'background.paper', display: 'flex'}}>
                                <TravelTipCard key={tip._id} {...tip} deleteTravelTip={deleteTravelTip} index={index}></TravelTipCard>
                        </List>
                    )
                })
            }

            {viewAllTips &&  
                travelTips.map((tip, index) => {       
                    return(
                     <List sx={{ width: '100%', bgcolor: 'background.paper', display: 'flex'}}>
                         <TravelTipCard key={tip._id} {...tip} deleteTravelTip={deleteTravelTip} index={index}></TravelTipCard>
                     </List>
                    ) 
                 })
            }
            
            {/* //    return(
            //     <List sx={{ width: '100%', bgcolor: 'background.paper', display: 'flex'}}>
            //         <TravelTipCard key={tip._id} {...tip} deleteTravelTip={deleteTravelTip} index={index}></TravelTipCard>
            //     </List>
            //    ) 
            // })} */}
{/* 
            {travelTips.map((tip, index) => {       
               return(
                <List sx={{ width: '100%', bgcolor: 'background.paper', display: 'flex'}}>
                    <TravelTipCard key={tip._id} {...tip} deleteTravelTip={deleteTravelTip} index={index}></TravelTipCard>
                </List>
               ) 
            })} */}
        </Grid>
    </Grid>
    )}
    </Box>
    
 
    
   
  );
}

export default TravelTips;


