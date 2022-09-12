import * as React from 'react';
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Input from '@mui/material/Input';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Checkbox from '@mui/material/Checkbox';
// import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LuggageIcon from '@mui/icons-material/Luggage';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import Typography from '@mui/material/Typography';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import TextareaAutosize from '@mui/base/TextareaAutosize';
import dayjs from 'dayjs';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider, useTheme } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Switch from '@mui/material/Switch';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Divider from '@mui/material/Divider';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import {useRef} from 'react';
import { v4 as uuidv4 } from 'uuid';
// json data of countries and cities
import Countries from '../Data/countries.json';
import service from "../api/service";
const API_URL = "http://localhost:5005";
const ariaLabel = { 'aria-label': 'description' };

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const countryData = Object.keys(Countries)
let cityData = []

const theme = createTheme();
function ItineraryEdit() {
    // title, imageUrl, duration, countries, cities, fliightDetails, hotelDetails, activities, notes, isPublic
    const [title, setTitle] = React.useState("");
    const [imageUrl, setImageUrl] = React.useState("");
    const [duration, setDuration] = React.useState("");
    const [countries, setCountries] = React.useState([]);
    const [cities, setCities] = React.useState([]);
    const [flightDetails, setFlightDetails] = React.useState([]);
    const [hotelDetails, setHotelDetails] = React.useState([]);
    const [activities, setActivities] = React.useState([{
        title: "", date: dayjs(), time: dayjs(), location: "", note: "", image: ""
    }]);
    const [notes, setNotes] = useState([]);
    const [isPublic, setPublic] = React.useState(false);
    const [isLoading, setLoading] = React.useState(true);
 
    const ref = useRef(null);
    

    // const [value, setValue] = React.useState(dayjs());
    // const [newItinerary, setNewItinerary] = useState({
    //     title: "",
    //     imageUrl: "",
    //     duration: "",
    //     countries: [],
    //     cities: [],
    //     flightDetails: [{

    //     }],
    //     hotelDetails: [],
    //     activities: [],
    //     notes: [],
    //     isPublic: false
    // });
    const [errorMessage, setErrorMessage] = useState(undefined);
    
    const navigate = useNavigate();
    

    const handleTitle = (e) => {
        setTitle(e.target.value)
    }

    const handleCountries = (event) => {
        const {
          target: { value },
        } = event;
        const selectedCountries = event.target.value
        cityData = selectedCountries.flatMap(
            (selectedCountry) => Countries[selectedCountry]
        )
        
        
        setCountries(
          // On autofill we get a stringified value.
          typeof value === 'string' ? value.split(',') : value,
        );
 
    };

    const handleCities = (event) => {
        const {
          target: { value },
        } = event;
        const selectedCountries = event.target.value
  
        setCities(
          // On autofill we get a stringified value.
          typeof value === 'string' ? value.split(',') : value,
        );

    };

    const addFlightDetails = () => {
        const values = [...flightDetails];
        values.push({
            airline: "", date: dayjs(), time: dayjs(), departure: "", arrival: ""
        });
        setFlightDetails(values);
    }

    const handleFlightDetails = (index, event) => {
        let data = [...flightDetails];
        data[index][event.target.name] = event.target.value;
        setFlightDetails(data);
    };

    const handleFlightDate = (index, event) => {
        let data = [...flightDetails];
        data[index]['date'] = event;
        setFlightDetails(data);
        console.log(event)
    };

    const handleFlightTime = (index, event) => {
        let data = [...flightDetails];
        data[index]['time'] = event;
        setFlightDetails(data);
        console.log(event)
    };

    const handleDeleteFlight = (index) => {
        const values = [...flightDetails];
        values.splice(index, 1);
        setFlightDetails(values);
    }

    const addHotelDetails = () => {
        const values = [...hotelDetails];
        values.push({
            name: "", checkin: dayjs(), checkout: dayjs()
        });
        setHotelDetails(values);
    }

    const handleChangeHotelName = (index, event) => {
        let data = [...hotelDetails];
        data[index][event.target.name] = event.target.value;
        setHotelDetails(data);
    }

    const handleChangeCheckin = (index, event) => {
        let data = [...hotelDetails];
        data[index]['checkin'] = event;
        setHotelDetails(data);
        console.log(event)
    };

    const handleChangeCheckout = (index, event) => {
        let data = [...hotelDetails];
        data[index]['checkout'] = event;
        setHotelDetails(data);
        console.log(event)
    };

    const handleDeleteHotel = (index) => {
        const values = [...hotelDetails];
        values.splice(index, 1);
        setHotelDetails(values);
    }

    const handleAddActivity = () => {
        const values = [...activities];
        values.push({
            title: "", date: dayjs(), time: dayjs(), location: "", note: "", imageUrl: ""
        });
        setActivities(values);
    }

    const handleChangeActivityDetail = (index, event) => {
        let data = [...activities];
        data[index][event.target.name] = event.target.value;
        setActivities(data);
    }

    const handleChangeActivityDate = (index, event) => {
        let data = [...activities];
        data[index]['date'] = event;
        setActivities(data);
        console.log(event)
    }

    const handleChangeActivityTime = (index, event) => {
        let data = [...activities];
        data[index]['time'] = event;
        setActivities(data);
        console.log(event)
    };

    const handleDeleteActivity = (index) => {
        const values = [...activities];
        values.splice(index, 1);
        setActivities(values);
    }

    const handleAddNotes = () => {
        const values = [...notes];
        values.push("");
        setNotes(values);
    }

    const handleChangeNotes = (index, event) => {
        let data = [...notes];
        data[index] = event.target.value;
        setNotes(data);
    }

    const handleDeleteNote = (index) => {
        const values = [...notes];
        values.splice(index, 1);
        setNotes(values);
    }

    const { itineraryId } = useParams();
    const handleNewItinerarySubmit = async (event) => {
        event.preventDefault();
        const body = {
            title, imageUrl, duration, countries, cities, flightDetails, hotelDetails, activities, notes, isPublic
        }
        console.log(body)
        // Get the token from the localStorage
        const storedToken = localStorage.getItem('authToken');
        try{
            const updateItinerary = await axios.put(`${API_URL}/api/itineraries/${itineraryId}`, 
            body,
            { headers: { Authorization: `Bearer ${storedToken}` } })
            navigate(`/itineraries/${itineraryId}`)
        }
        catch(err) {
            setErrorMessage(err)
        }
    };

    // ******** this method handles the file upload ********
    const handleItineraryImageUpload = (e) => {
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
        setImageUrl(response.fileUrl);
      })
      .catch(err => console.log("Error while uploading the file: ", err));
      
    };

     // ******** this method handles the file upload ********
     const handleActivityImageUpload = (index, e) => {
        console.log("Activity Image")
        // console.log("The file to be uploaded is: ", e.target.files[0]);
     
        const uploadData = new FormData();
     
        // imageUrl => this name has to be the same as in the model since we pass
        // req.body to .create() method when creating a new movie in '/api/itineraries' POST route
        uploadData.append("image", e.target.files[0]);
     
        service
          .uploadImage(uploadData)
          .then(response => {
            // console.log("response is: ", response);
            // response carries "fileUrl" which we can use to update the state
            // setImageUrl(response.fileUrl);
            let data = [...activities];
            data[index]['image'] = response.fileUrl;
            setActivities(data);
            // console.log(event)
          })
          .catch(err => console.log("Error while uploading the file: ", err));
        };


    
    React.useEffect(() => {
        // Get the token from the localStorage
        const storedToken = localStorage.getItem('authToken');

            axios.get(
                `http://localhost:5005/api/itineraries/${itineraryId}`,
                { headers: { Authorization: `Bearer ${storedToken}` } }
              )
            .then((response) => {
                const itineraryToEdit = response.data.itinerary;
                console.log(itineraryToEdit)
                if(!response.data.isOwner) {
                    navigate('/itineraries');
                }
                setTitle(itineraryToEdit.title)
                setImageUrl(itineraryToEdit.imageUrl)
                setDuration(itineraryToEdit.duration) 
                setCountries(itineraryToEdit.countries)
                setCities(itineraryToEdit.cities)
                setFlightDetails(itineraryToEdit.flightDetails)
                setHotelDetails(itineraryToEdit.hotelDetails)
                setActivities(itineraryToEdit.activities)
                setNotes(itineraryToEdit.notes)
                setPublic(itineraryToEdit.isPublic)
                setLoading(false)
            })
            .catch((err) => {
                setErrorMessage(err)
            })
    }, [itineraryId])
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: '#FFBD59' }}>
            <LuggageIcon />
          </Avatar>
          <Typography component="h1" variant="h5" sx={{ mb: 3 }}>
            Edit Itinerary
          </Typography>

          {/* form */}
          <Box component="form" noValidate onSubmit={handleNewItinerarySubmit} sx={{ mt: 1 }}>
            <Grid container spacing={2}>
            <Grid item container xs={12} justifyContent="flex-start">
                <Typography variant="overline" display="block" >
                    Public Visibility
                </Typography>
                <Switch
                    checked={isPublic}
                    onChange={(e) => setPublic(e.target.checked)}
                    inputProps={{ 'aria-label': 'controlled' }}
                />
                </Grid>

                <Grid item xs={12}>
                    <TextField
                    required
                    fullWidth
                    label="Title"
                    name="title"
                    value={title}
                    onChange={handleTitle}
                    />
                </Grid>
               
                <Grid item xs={12}>
                    <TextField
                    required
                    fullWidth
                    label="Duration"
                    name="duration"
                    placeholder='Days'
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    />
                </Grid>

                <Grid item xs={12}>
                    <FormControl sx={{ width: "100%" }}>
                        <InputLabel id="demo-multiple-chip-label">Country</InputLabel>
                        <Select
                        labelId="demo-multiple-chip-label"
                        id="demo-multiple-chip"
                        required
                        multiple
                        value={countries}
                        onChange={handleCountries}
                        input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                        renderValue={(selected) => (
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                            {selected.map((value) => (
                                <Chip key={uuidv4()} label={value} />
                            ))}
                            </Box>
                        )}
                            MenuProps={MenuProps}
                        >
                        {countryData.map((name) => (
                            <MenuItem
                            key={uuidv4()}
                            value={name}
                            //   style={getStyles(name, countryName, theme)}
                            >
                            {name}
                            </MenuItem>
                        ))}
                        </Select>
                    </FormControl>
                </Grid>

                <Grid item xs={12}>
                <FormControl sx={{ width: "100%" }}>
                    <InputLabel id="demo-multiple-chip-label">City</InputLabel>
                        <Select
                            labelId="demo-multiple-chip-label"
                            id="demo-multiple-chip"
                            multiple
                            value={cities}
                            onChange={handleCities}
                            input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                            renderValue={(selected) => (
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                {selected.map((value) => (
                                <Chip key={uuidv4()} label={value} />
                                ))}
                            </Box>
                            )}
                            MenuProps={MenuProps}
                        >
                            {cityData.map((name) => (
                            <MenuItem
                                key={uuidv4()}
                                value={name}
                            //   style={getStyles(name, countryName, theme)}
                            >
                                {name}
                            </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>

                <Grid item container xs={12} justifyContent="flex-start" sx={{ pl: 2}}>
                    <Input
                        accept="image/*"
                        style={{ display: 'none' }}
                        id="raised-button-file"
                        multiple
                        type="file"
                        onChange={(e) => handleItineraryImageUpload(e)}
                        />
                        <label htmlFor="raised-button-file">
                            <Button variant="raised" component="span" sx={{ bgcolor: '#ffbd59'}} startIcon={<AddPhotoAlternateIcon />}>
                                            Image
                                </Button>
                        </label> 
                </Grid>

                {imageUrl &&
                <Grid item container xs={12} justifyContent="flex-start" sx={{ pl: 2}}>
                    <Card sx={{ maxWidth: 345 }}>
                        <CardMedia
                            component="img"
                            alt="image"
                            height="140"
                            image={imageUrl}
                        />
                    </Card>
                </Grid>
                }
                

                <Grid container item xs={12} justifyContent="flex-start">      
                    <Divider Divider textAlign="left" style={{width:'100%'}}>
                       FLIGHT DETAILS
                    </Divider>
                </Grid>
                
                {flightDetails.length > 0 && (
                    <>
                        {flightDetails.map((flight, index) => (
                        <Grid container item xs={12} spacing={2}>
                           
                            <Grid container item xs={12} justifyContent="flex-start">
                                <Typography variant="overline" display="block" >
                                    Flight {index + 1}
                                </Typography>
                            </Grid>
                            
                            <Grid item xs={12}>
                                <TextField
                                ref={ref}
                                required
                                fullWidth
                                name="airline"
                                label="Airline"
                                value={flight.airline}
                                onChange={(event) => handleFlightDetails(index, event)}
                                />
                            </Grid>

                            <Grid item xs={6}>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DatePicker
                                    views={['day', 'month', 'year']}
                                    label="Date"
                                    name="date"
                                    value={flight.date}
                                    onChange={(event) => handleFlightDate(index, event)}
                                    renderInput={(params) => <TextField {...params} helperText={null} />}
                                    />
                                </LocalizationProvider>
                            </Grid>

                            <Grid item xs={6}>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <TimePicker
                                    value={flight.time}
                                    label="Time"
                                    onChange={(event) => handleFlightTime(index, event)}
                                    renderInput={(params) => <TextField {...params} />}
                                    style={{ width: "100%"}}
                                    />
                                </LocalizationProvider>
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                ref={ref}
                                required
                                fullWidth
                                name="departure"
                                label="Departure"
                                placeholder='From'
                                value={flight.departure}
                                onChange={(event) => handleFlightDetails(index, event)}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                ref={ref}
                                required
                                fullWidth
                                name="arrival"
                                label="Arrive"
                                placeholder='To'
                                value={flight.arrival}
                                onChange={(event) => handleFlightDetails(index, event)}
                                />
                            </Grid>

                            <Grid item container xs={12} justifyContent="flex-start" sx={{ pl: 2}}>
                                <Button variant="outlined" onClick={() => handleDeleteFlight(index)} color="error" startIcon={<CloseIcon />}>
                                    Remove
                                </Button>
                            </Grid>
                        </Grid>
                  ))}
                    </>
                )}

                <Grid item container xs={12} justifyContent="flex-start" sx={{ pl: 2}}>
                    <Button variant="outlined" onClick={addFlightDetails} startIcon={<AddIcon />}>
                    Flight
                    </Button>
                </Grid>
                
                <Grid container item xs={12} justifyContent="flex-start" sx={{ mt: 4}}>      
                    <Divider Divider textAlign="left" style={{width:'100%'}}>
                       HOTEL DETAILS
                    </Divider>
                </Grid>
                
                {hotelDetails.length > 0 && (
                    <>
                        {hotelDetails.map((hotel, index) => (
                            
                        <Grid container item xs={12} spacing={2}>

                            <Grid container item xs={12} justifyContent="flex-start">
                                <Typography variant="overline" display="block" >
                                    Hotel {index + 1}
                                </Typography>
                            </Grid> 

                           <Grid item xs={12}>
                                <TextField
                                required
                                fullWidth
                                label="Name"
                                name="name"
                                value={hotel.name}
                                onChange={(event) => handleChangeHotelName(index, event)}
                                />
                            </Grid>
                        
                            <Grid item xs={6}>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DatePicker
                                    views={['day', 'month', 'year']}
                                    label="Check In"
                                    name="checkin"
                                    value={hotel.checkin}
                                    onChange={(event) => handleChangeCheckin(index, event)}
                                    renderInput={(params) => <TextField {...params} helperText={null} />}
                                    />
                                </LocalizationProvider>
                            </Grid>

                            <Grid item xs={6}>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DatePicker
                                    views={['day', 'month', 'year']}
                                    label="Check Out"
                                    name="checkout"
                                    value={hotel.checkout}
                                    onChange={(event) => handleChangeCheckout(index, event)}
                                    renderInput={(params) => <TextField {...params} helperText={null} />}
                                    />
                                </LocalizationProvider>
                            </Grid>

                            <Grid item container xs={12} justifyContent="flex-start" sx={{ pl: 2}}>
                                <Button variant="outlined" onClick={() => handleDeleteHotel(index)} color="error" startIcon={<CloseIcon />}>
                                    Remove
                                </Button>
                            </Grid>
                        </Grid>
                  ))}
                    </>
                )}
                
                

                <Grid item container xs={12} justifyContent="flex-start" sx={{ pl: 2}}>
                    <Button variant="outlined" onClick={addHotelDetails} startIcon={<AddIcon />}>
                    Hotel
                    </Button>
                </Grid>

                <Grid container item xs={12} justifyContent="flex-start" sx={{ mt: 4}}>      
                    <Divider Divider textAlign="left" style={{width:'100%'}}>
                       ACTIVITIES
                    </Divider>
                </Grid>

                {activities.length > 0 && (
                    <>
                        {activities.map((activity, index) => (
                            
                        <Grid container item xs={12} spacing={2}>

                            <Grid container item xs={12} justifyContent="flex-start">
                                <Typography variant="overline" display="block" >
                                    Activity {index + 1}
                                </Typography>
                            </Grid> 

                            <Grid item xs={12}>
                                <TextField
                                required
                                fullWidth
                                label="Title"
                                name="title"
                                value={activity.title}
                                onChange={(event) => handleChangeActivityDetail(index, event)}
                                />
                            </Grid>

                            <Grid item xs={6}>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DatePicker
                                    views={['day', 'month', 'year']}
                                    label="Date"
                                    name="date"
                                    value={activity.date}
                                    onChange={(event) => handleChangeActivityDate(index, event)}
                                    renderInput={(params) => <TextField {...params} helperText={null} />}
                                    />
                                </LocalizationProvider>
                            </Grid>

                            <Grid item xs={6}>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <TimePicker
                                    value={activity.time}
                                    name="time"
                                    label="Time "
                                    onChange={(event) => handleChangeActivityTime(index, event)}
                                    renderInput={(params) => <TextField {...params} />}
                                    style={{ width: "100%"}}
                                    />
                                </LocalizationProvider>
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                required
                                fullWidth
                                label="Location"
                                name="location"
                                value={activity.location}
                                onChange={(event) => handleChangeActivityDetail(index, event)}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextareaAutosize
                                aria-label="minimum height"
                                minRows={3}
                                name="note"
                                label="Notes"
                                placeholder="Notes"
                                value={activity.note}
                                onChange={(event) => handleChangeActivityDetail(index, event)}
                                style={{ width: "100%", padding: "inherit", font: "inherit", borderRadius: "3px", borderColor: "#c4c4c4" }}
                                />
                            </Grid>

                            <Grid item container xs={12} justifyContent="flex-start" sx={{ pl: 2}}>
                                {/* <Input
                                    accept="image/*"
                                    style={{ display: 'none' }}
                                    id="raised-button-file"
                                    multiple
                                    // onChange={handleChange}
                                    type="file"
                                    />
                                    <label htmlFor="raised-button-file">
                                        <Button variant="raised" component="span" sx={{ bgcolor: '#ffbd59'}} startIcon={<AddPhotoAlternateIcon />}>
                                            Image
                                        </Button>
                                    </label>  */}
                                    <Button variant="raised" component="label" sx={{ bgcolor: '#ffbd59'}} startIcon={<AddPhotoAlternateIcon />}>
                                        Image
                                        <input hidden accept="image/*" multiple type="file" name="image" onChange={(e) => handleActivityImageUpload(index, e)}/>
                                    </Button>
                            </Grid>
                            {activity.image && 
                            <Grid item container xs={12} justifyContent="flex-start" sx={{ pl: 2}}>
                                <Card sx={{ maxWidth: 345 }}>
                                    <CardMedia
                                        component="img"
                                        alt="image"
                                        height="140"
                                        image={activity.image}
                                    />
                                </Card>
                            </Grid>
                            }
                            <Grid item container xs={12} justifyContent="flex-start" sx={{ pl: 2}}>
                                <Button variant="outlined" onClick={() => handleDeleteActivity(index)}  color="error" startIcon={<CloseIcon />}>
                                    Remove
                                </Button>
                            </Grid>
                        </Grid>
                        ))}
                    </>
                )}

                <Grid item container xs={12} justifyContent="flex-start" sx={{ pl: 2}}>
                    <Button variant="outlined" onClick={handleAddActivity} startIcon={<AddIcon />}>
                    ACTIVITY
                    </Button>
                </Grid>

                <Grid container item xs={12} justifyContent="flex-start" sx={{ mt: 4}}>      
                    <Divider Divider textAlign="left" style={{width:'100%'}}>
                       NOTES
                    </Divider>
                </Grid>
                
                {notes.length > 0 && (
                    <>
                        {notes.map((note, index) => (
                            
                        <Grid container item xs={12} spacing={2}>

                            <Grid container item xs={12} justifyContent="flex-start">
                                <Typography variant="overline" display="block" >
                                    Note {index + 1}
                                </Typography>
                            </Grid> 

                            <Grid item xs={12}>
                                <TextareaAutosize
                                aria-label="minimum height"
                                minRows={2}
                                name="notes"
                                label="Notes"
                                placeholder="Notes"
                                value={note}
                                onChange={(event) => handleChangeNotes(index, event)}
                                style={{ width: "100%", padding: "inherit", font: "inherit", borderRadius: "3px", borderColor: "#c4c4c4" }}
                                />
                            </Grid>

                            <Grid item container xs={12} justifyContent="flex-start" sx={{ pl: 2}}>
                                <Button variant="outlined" onClick={() => handleDeleteNote(index)}  color="error" startIcon={<CloseIcon />}>
                                    Remove
                                </Button>
                            </Grid>
                        </Grid>
                        ))}
                    </>
                )}           

                <Grid item container xs={12} justifyContent="flex-start" sx={{ pl: 2}}>
                    <Button variant="outlined" onClick={handleAddNotes} startIcon={<AddIcon />}>
                        Notes
                    </Button>
                </Grid>
                
            </Grid>
           
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, bgcolor: "#26475E" }}
            >
              Update
            </Button>

            { errorMessage && <p className="error-message">{errorMessage}</p> }
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default ItineraryEdit;