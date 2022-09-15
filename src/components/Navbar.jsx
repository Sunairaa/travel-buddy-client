import * as React from 'react';
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useContext } from "react";                     
import { AuthContext } from "../context/auth.context";  
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import FlightIcon from '@mui/icons-material/Flight';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import useravatar from '../../src/user.png';



const { palette } = createTheme();
const { augmentColor } = palette;
const createColor = (mainColor) => augmentColor({ color: { main: mainColor } });
const theme = createTheme({
  palette: {
    anger: createColor('#F40B27')
  },
});

const Navbar = () => {
   
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const navigate = useNavigate()
   // Subscribe to the AuthContext to gain access to
  // the values from AuthContext.Provider `value` prop
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleProfileClick = () => {
    navigate('/profile')
    setAnchorElUser(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogoutClick = () => {
    navigate('/')
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static" style={{backgroundColor: "#26475E"}}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <FlightIcon fontSize="large" sx={{ display: { xs: 'none', md: 'flex' }, color: '#FFBD59', mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: '#FFBD59',
              textDecoration: 'none',
            }}
          >
            {/* <img src={logo} alt="logo"/> */}
            TRAVEL BUDDY
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {isLoggedIn && (
                <div>
                    <MenuItem onClick={handleCloseNavMenu}>
                        <NavLink to="/home" className={({ isActive }) => isActive ? "selected" : ""}> <Button variant="text" sx={{ my: 2, color: 'black', display: 'block' }}>Home</Button> </NavLink>
                    </MenuItem>
                    <MenuItem onClick={handleCloseNavMenu}>
                      <NavLink to="/itineraries" className={({ isActive }) => isActive ? "selected" : ""}> <Button variant="text" sx={{ my: 2, mx: 1, color: 'black', display: 'block' }}>Itineraries</Button> </NavLink>
                    </MenuItem>
                    <MenuItem onClick={handleCloseNavMenu}>
                      <NavLink to="/profile/itineraries" className={({ isActive }) => isActive ? "selected" : ""}> <Button variant="text" sx={{ my: 2, mx: 1, color: 'black', display: 'block' }}>My Itineraries</Button> </NavLink>
                    </MenuItem>
                    <MenuItem onClick={handleCloseNavMenu}>
                      <NavLink to="/traveltips" className={({ isActive }) => isActive ? "selected" : ""}> <Button variant="text" sx={{ my: 2, mx: 1, color: 'black', display: 'block' }}>Travel Tips</Button> </NavLink>
                    </MenuItem>
              </div>
              )}
              {!isLoggedIn && (
                <div>
                <MenuItem onClick={handleCloseNavMenu}>
                    <Link to="/signup"> 
                      <Button variant="outlined" sx={{ my: 1, color: '#26475E', display: 'flex', border: '1px solid #ffbd59'}}><HowToRegIcon sx={{ mr: 2 }}/> Sign Up</Button>
                    </Link>
                </MenuItem>
                <MenuItem onClick={handleCloseNavMenu}>
                  <Link to="/login"> 
                    <Button variant="outlined" sx={{ my: 1, color: '#26475E', display: 'flex', border: '1px solid #ffbd59'}}><LoginIcon sx={{ mr: 2 }}/>  Login</Button> 
                  </Link>
                </MenuItem>
              </div>
              )}
             
            </Menu>
          </Box>
          <FlightIcon sx={{ display: { xs: 'flex', md: 'none' }, color: '#FFBD59', mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: '#FFBD59',
              textDecoration: 'none',
            }}
          >
            TRAVEL BUDDY
          </Typography>
          <Box sx={{ flexGrow: 1, justifyContent: 'flex-end', display: { xs: 'none', md: 'flex' } }}>
     
              {isLoggedIn && (
                <>
           
              <NavLink to="/home" className={({ isActive }) => isActive ? "selected" : ""}> <Button variant="text" sx={{ my: 2, mx: 1, color: 'white', display: 'block' }}>Home</Button> </NavLink>
             
              <NavLink to="/itineraries" className={({ isActive }) => isActive ? "selected" : ""}> <Button variant="text" sx={{ my: 2, mx: 1, color: 'white', display: 'block' }}>Itineraries</Button> </NavLink>
            
              <NavLink to="/profile/itineraries" className={({ isActive }) => isActive ? "selected" : ""}> <Button variant="text" sx={{ my: 2, mx: 1, color: 'white', display: 'block' }}>My Itineraries</Button> </NavLink>
              
              <NavLink to="/traveltips" className={({ isActive }) => isActive ? "selected" : ""}> <Button variant="text" sx={{ my: 2, mx: 1, color: 'white', display: 'block' }}>Travel Tips</Button> </NavLink>
                
              </>
              )}
              {!isLoggedIn && (
              <>
              <Link to="/signup"> 
                <Button variant="outlined" sx={{ my: 2, mx: 1, color: 'white', display: 'flex', border: '1px solid #ffbd59'}}><HowToRegIcon sx={{ mr: 2 }}/> Sign Up</Button>
              </Link>
              
              <Link to="/login"> <Button variant="outlined" sx={{ my: 2, color: 'white', display: 'flex', border: '1px solid #ffbd59'}}><LoginIcon sx={{ mr: 2 }}/>  Login</Button> </Link>
            
              </>
              )}
          
          </Box>

          {isLoggedIn && (
            <Box sx={{ flexGrow: 0, ml: 4}}>
            <Tooltip title={user && user.name}>
              <IconButton 
              onClick={handleOpenUserMenu}
               sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src={(user && user.imageUrl) || useravatar} />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
                <MenuItem onClick={handleProfileClick}>
                    <Button variant="text" sx={{color: '#26475E'}}><AssignmentIndIcon sx={{ mr: 2 }}/>Profile</Button>
                </MenuItem>
                <MenuItem onClick={handleLogoutClick}>
                    <Button variant="text" sx={{color: '#26475E'}} onClick={logOutUser}><LogoutIcon sx={{ mr: 2 }}/> Logout</Button>
                </MenuItem>
            </Menu>
          </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Navbar;