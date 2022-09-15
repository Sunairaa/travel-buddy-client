import React from 'react'
import { Grid } from '@mui/material';
import { TextField } from '@mui/material';
import { Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
import { Alert } from '@mui/material';
import { Chip } from '@mui/material';
import { textAlign } from '@mui/system';

function AddContributorFields({contributorEmail, confirmContributor, handleContributor, handleDeleteContributor, isReadonly, displayConfirmButton, notFound, hideRemoveBtn}) {
  return (
    <Grid container item xs={12} spacing={2}>
        {displayConfirmButton && (
                <Grid item xs={12}>
                <TextField
                fullWidth
                label="Email"
                name="contributorEmail"
                type="email"
                value={contributorEmail}
                onChange={handleContributor}
                InputProps={{
                    readOnly: isReadonly,
                }}
                />                
    </Grid>
            )}
        
        {!displayConfirmButton && (
             <Grid item container xs={12} justifyContent="flex-start" sx={{ pl: 2}}>
                <Chip label={contributorEmail}></Chip>
            </Grid>
            )
        }
        {notFound && (
                        <Grid item xs={12} sx={{p: 0, m: 0}}>
                    <Alert severity="error">
                        {notFound}
                    </Alert>
                    </Grid>
                    )}
                

        <Grid item container xs={12} justifyContent="flex-start" sx={{ pl: 2}}>
           
            {displayConfirmButton && (
                <Button variant="outlined" color="primary" onClick={() => confirmContributor()} startIcon={<CheckIcon />} sx={{mr: 1}}>
                    Confirm
                </Button>
            )
            
            }
                    {!hideRemoveBtn && (
                         <Button variant="outlined" onClick={() => handleDeleteContributor()}  color="error" startIcon={<CloseIcon />}>
                         Remove
                        </Button>
                    )}
                   
                </Grid> 

    </Grid>
  )
}

export default AddContributorFields