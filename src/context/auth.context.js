import React, { useState, useEffect } from "react";
import axios from "axios";
const API_URL = process.env.REACT_APP_API_URL || "https://long-lime-bat-hose.cyclic.app";
 
const AuthContext = React.createContext();
 
function AuthProviderWrapper(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);
 
  
  const storeToken = (token) => {       //  <==  ADD
    localStorage.setItem('authToken', token);
  }
  
  const authenticateUser = () => {           //  <==  ADD  
    // Get the stored token from the localStorage
    const storedToken = localStorage.getItem('authToken');
    
    // If the token exists in the localStorage
    if (storedToken) {
      // We must send the JWT token in the request's "Authorization" Headers
      axios.get(
        `${API_URL}/api/profile`, 
        { headers: { Authorization: `Bearer ${storedToken}`} }
      )
      .then((response) => {
        // If the server verifies that JWT token is valid  
        const user = response.data;
       // Update state variables   
        setUser(user);          
        setIsLoggedIn(true);
        setIsLoading(false);   
      })
      .catch((error) => {
        // If the server sends an error response (invalid token) 
        // Update state variables     
        setUser(null);           
        setIsLoggedIn(false);
        setIsLoading(false); 
      });      
    } else {
      // If the token is not available (or is removed)
        setUser(null);       
        setIsLoggedIn(false);
        setIsLoading(false);
    }   
  }
  
  const removeToken = () => {                    // <== ADD
    // Upon logout, remove the token from the localStorage
    localStorage.removeItem("authToken");
  }

  const logOutUser = () => {                   // <== ADD    
    // To log out the user, remove the token
    removeToken();
    // and update the state variables    
    authenticateUser();
  }  
  
  useEffect(() => {                                    
    authenticateUser();                   //  <==  ADD
   }, []);

  return (                                                   
    <AuthContext.Provider 
      value={{ 
        isLoggedIn,
        isLoading,
        user,
        storeToken,
        authenticateUser,
        logOutUser, 
        setUser
      }}
    >
      {props.children}
    </AuthContext.Provider>
  )
}
 
export { AuthProviderWrapper, AuthContext };