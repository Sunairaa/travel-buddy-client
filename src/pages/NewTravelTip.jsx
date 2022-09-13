import * as React from 'react';
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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


const theme = createTheme();
function NewTravelTip() {
    // title, imageUrl, duration, countries, cities, fliightDetails, hotelDetails, activities, notes, isPublic
    const [title, setTitle] = React.useState("");
    const [category, setCategory] = React.useState("");
    const [description, setDescription] = useState(""); 
    const [errorMessage, setErrorMessage] = useState(undefined);
    
    const navigate = useNavigate();
    

    const handleTitle = (e) => {
        setTitle(e.target.value)
    }

    const handleDescription = (e) => {
        setDescription(e.target.value)
    }

    const handleCategory = (e) => {
        setCategory(e.target.value);
    };
    
    const handleNewTipSubmit = async (e) => {
        e.preventDefault();
        const body = {
            title, description, category 
        }
        console.log(body)
        // Get the token from the localStorage
        const storedToken = localStorage.getItem('authToken');
        try{
            const addNewTip = await axios.post(`${API_URL}/api/traveltips`, 
            body,
            { headers: { Authorization: `Bearer ${storedToken}` } })
            console.log(addNewTip)
            navigate('/TravelTips')
        }
        catch(err) {
            setErrorMessage(err)
        }
    };

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
            New Travel Tip
          </Typography>

          {/* form */}
          <Box component="form" noValidate onSubmit={handleNewTipSubmit} sx={{ mt: 1 }}>
            <Grid container spacing={2}>
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
                    <TextareaAutosize
                        required
                        aria-label="minimum height"
                        minRows={4}
                        name="description"
                        label="Description"
                        placeholder="Description"
                        value={description}
                        onChange={handleDescription}
                        style={{ width: "100%", padding: "inherit", font: "inherit", borderRadius: "3px", borderColor: "#c4c4c4" }}
                    />
                </Grid>
               
                <Grid item xs={12}>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Category</InputLabel>
                    <Select
                    labelId="demo-simple-select-label"
                    name="category"
                    value={category}
                    label="Category"
                    onChange={handleCategory}
                    >
                        <MenuItem value="Travel">Travel</MenuItem>
                        <MenuItem value="Hotel">Hotel</MenuItem>
                        <MenuItem value="Flight">Flight</MenuItem>
                        <MenuItem value="Other">Other</MenuItem>
                    </Select>
                </FormControl>
                </Grid>                
            </Grid>
           
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, bgcolor: "#26475E" }}
            >
              Publish
            </Button>

            { errorMessage && <p className="error-message">{errorMessage}</p> }
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default NewTravelTip;