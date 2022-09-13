import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { Navigate } from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

 
function IsPrivate( { children } ) {
  
  const { isLoggedIn, isLoading } = useContext(AuthContext);
 
  // If the authentication is still loading 
  if (isLoading){
    return(
      <div maxWidth="xl" style={{display:'flex', flexDirection:'column', alignItems:'center', marginTop:'20px', marginBottom:'20px', height:'100%', justifyContent:'center' }}>
          <Box sx={{ display: 'flex', width:'100%', justifyContent:'center'}}>
            <CircularProgress />
          </Box>
      </div>
    )
  } 

  if (!isLoggedIn) {
  // If the user is not logged in 
    return <Navigate to="/login" />;
  } else {
  // If the user is logged in, allow to see the page 
    return children;
  }
}
 
export default IsPrivate;