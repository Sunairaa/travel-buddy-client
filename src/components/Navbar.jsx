import * as React from 'react';
import { Link, NavLink } from "react-router-dom";
import { useContext } from "react";                     
import { AuthContext } from "../context/auth.context";  
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import FlightIcon from '@mui/icons-material/Flight';
// import logo from '../../src/logo.png';
import useravatar from '../../src/user.png';



// const pages = ['Login', 'Sign Up'];
// const settings = ['Profile', 'Logout'];

const Navbar = () => {
   
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
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

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static" style={{backgroundColor: "#26475E"}}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <FlightIcon sx={{ display: { xs: 'none', md: 'flex' }, color: '#FFBD59', mr: 1 }} />
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
              {/* {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                   
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))} */}
              {isLoggedIn && (
                <div>
                    <MenuItem onClick={handleCloseNavMenu}>
                        <NavLink to="/" className={({ isActive }) => isActive ? "selected" : ""}> <Button variant="text" sx={{ my: 2, color: 'black', display: 'block' }}>Home</Button> </NavLink>
                    </MenuItem>
                    <MenuItem onClick={handleCloseNavMenu}>
                        <NavLink to="/" className={({ isActive }) => isActive ? "selected" : ""}> <Button variant="text" sx={{ my: 2, color: 'black', display: 'block' }}>Itenaries</Button> </NavLink>
                    </MenuItem>
              </div>
              )}
              {!isLoggedIn && (
                <div>
                <MenuItem onClick={handleCloseNavMenu}>
                    <Link to="/signup"> <Button variant="text" sx={{ my: 2, color: 'black', display: 'block' }}>Sign Up</Button> </Link>
                </MenuItem>
                <MenuItem onClick={handleCloseNavMenu}>
                    <Link to="/login"> <Button variant="text" sx={{ my: 2, color: 'black', display: 'block' }}>Login</Button> </Link>
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
            href=""
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
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
     
      {isLoggedIn && (
                <>
           
              <NavLink to="/" className={({ isActive }) => isActive ? "selected" : ""}> <Button variant="text" sx={{ my: 2, color: 'white', display: 'block' }}>Home</Button> </NavLink>
             
              <NavLink to="/" className={({ isActive }) => isActive ? "selected" : ""}> <Button variant="text" sx={{ my: 2, color: 'white', display: 'block' }}>Itenaries</Button> </NavLink>
            
              </>
              )}
              {!isLoggedIn && (
                <>
           
              <Link to="/signup"> <Button variant="text" sx={{ my: 2, color: 'white', display: 'block' }}>Sign Up</Button> </Link>
              
              <Link to="/login"> <Button variant="text" sx={{ my: 2, color: 'white', display: 'block' }}>Login</Button> </Link>
            
              </>
              )}
          
          </Box>

          {isLoggedIn && (
            <Box sx={{ flexGrow: 0 }}>
            <Tooltip title={user && user.name}>
              <IconButton 
              onClick={handleOpenUserMenu}
               sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src={useravatar} />
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
              {/* {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))} */}

                <MenuItem onClick={handleCloseUserMenu}>
                    <Button variant="text">Profile</Button>
                </MenuItem>
                <MenuItem onClick={handleCloseUserMenu}>
                    <Button variant="text" onClick={logOutUser}>Logout</Button>
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