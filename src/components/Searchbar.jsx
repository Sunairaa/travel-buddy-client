import React from 'react'
import TextField from "@mui/material/TextField";

function Searchbar({inputText, setInputText}) {

    let inputHandler = (e) => {
        var lowerCase = e.target.value.toLowerCase();
        setInputText(lowerCase);
    };

    return (
        <div style={{width:'100%', rowGap:'20px', marginTop:'20px'}}>
                <TextField
                id="outlined-basic"
                onChange={inputHandler}
                variant="outlined"
                value={inputText}
                fullWidth
                label="Search"
                />
        </div>
    )
}

export default Searchbar