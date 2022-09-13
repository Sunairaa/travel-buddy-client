import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { Navigate } from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

 
function IsAnon( { children } ) {
  
  const { isLoggedIn, isLoading } = useContext(AuthContext);
 
  // If the authentication is still loading 
  if (isLoading){
    return(
      <div>
          <Box sx={{ display: 'flex', width:'100%', justifyContent:'center', top:'calc(50% - 93px)', position:'absolute'}}>
            <CircularProgress />
          </Box>
      </div>
    )
  } 
 
  if (isLoggedIn) {
    // If the user is logged in, navigate to home page     
    return <Navigate to="/" />;
  } else {
    // If the user is not logged in, allow to see the page 
    return children;
  }
}
 
export default IsAnon;