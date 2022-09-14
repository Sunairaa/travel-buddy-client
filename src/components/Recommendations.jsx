import React from 'react'
import Typography from '@mui/material/Typography';

function Recommendations({notes, index}) {
  return (
    <Typography variant="body2" color="text.secondary">
        {index + 1}. {notes}
    </Typography>
  )
}

export default Recommendations