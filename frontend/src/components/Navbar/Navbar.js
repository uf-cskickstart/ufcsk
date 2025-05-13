import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';

// Routing
import { Link } from 'react-router-dom';

// Sponsor Package
import sponsorPackage from '../../assets/CS-Kickstart-Sponsorship-Package.pdf';

const pages = ['Home', 'Board', 'Calendar', 'Program', 'Sponsor'];
const routes = ["/home", "/board", "/calendar", "/program"];

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: '#BE9BCB', borderBottom: '2px solid white', boxShadow: 'none' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* ADD CSK LOGO HERE */}
          {/* <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'Encode Sans',
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            CS KICKSTART
          </Typography>
          */}

          {/* MOBILE DROPDOWN */}
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
              {pages.map((page, index) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography 
                    textAlign="center"
                    sx={{
                      fontFamily: 'DM Sans',
                    }}
                  >
                    {page === "Sponsor" ? (
                    <a
                      style={{
                        textDecoration: 'none',
                        color: 'black'
                      }}  
                      href={sponsorPackage} 
                      download="CS_Kickstart_Sponsorship_Package.pdf" 
                      target='_blank'
                      rel="noreferrer"
                    >
                      {page}
                    </a>
                  ) : (
                    <Link 
                      style={{
                        textDecoration: 'none',
                        color: 'black'
                      }} 
                      to={routes[index]}
                    >
                      {page}
                    </Link>
                  )}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          {/* MOBILE TITLE */}
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'DM Sans',
              fontWeight: 700,
              letterSpacing: '.1rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            CS Kickstart
          </Typography>

          {/* DESKTOP PAGES */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page, index) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ 
                  my: 1, 
                  mx: 1,
                  color: 'white', 
                  display: 'block', 
                  fontFamily: 'DM Sans',
                  fontSize: '18px',
                  fontWeight: 500,
                  textTransform: 'none',
                  textDecoration: 'none'
                }}
              >
                {page === "Sponsor" ? (
                  <a
                    style={{
                      textDecoration: 'none',
                      color: 'white'
                    }}  
                    href={sponsorPackage} 
                    target='_blank'
                    rel="noreferrer"
                  >
                    {page}
                  </a>
                ) : (
                  <Link 
                    style={{
                      textDecoration: 'none',
                      color: 'white'
                    }} 
                    to={routes[index]}
                  >
                    {page}
                  </Link>
                )}
              </Button>
            ))}
          </Box>

          
          {/* RIGHT-ALIGNED "Apply Now!" BUTTON */}
          { <Box sx={{ ml: 'auto', display: { xs: 'none', md: 'flex' } }}>
          <Button 
                            className="button-text" 
                            variant="contained" 
                            size="large"
                            style={{ backgroundColor: '#5b2f70', boxShadow: 'none', fontFamily: 'DM Sans' }} 
                            href='https://docs.google.com/forms/d/e/1FAIpQLSfP5NQ8Tt8cJLdFO4sF6HwRaMX-O7dS4kWXoMukZYtkCJr80w/viewform'
                            target='_blank'
                            rel="noreferrer"
                        >
                          {/* <Button 
              component={ Link }
              to="/program"
              variant="contained" 
              sx={{ 
                backgroundColor: '#ffe45e', 
                color: 'black', 
                boxShadow: 'none', 
                fontFamily: 'DM Sans',
                fontSize: '18px',
                fontWeight: 700,
                textTransform: 'none',
                '&:hover': {
                  backgroundColor: '#ffeb85',
                  color: '#676767',
                  boxShadow: 'none'
                }
              }} 
            > */}
              APPLY NOW!
            </Button>
          </Box> }

          {/* MOBILE "Apply Now!" BUTTON */}
          { <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' }, justifyContent: 'flex-end' }}>
            <Button 
              component={ Link }
              to="/program"
              variant="contained" 
              sx={{ 
                backgroundColor: '#ffe45e', 
                color: 'black', 
                boxShadow: 'none', 
                fontFamily: 'DM Sans',
                fontSize: '18px',
                fontWeight: 700,
                textTransform: 'none',
                lineHeight: '1',
                padding: '5px 5px',
                width: '75%',
                '&:hover': {
                  backgroundColor: '#ffeb85',
                  color: '#676767',
                  boxShadow: 'none'
                }
              }} 
            >
              APPLY NOW!
            </Button>
          </Box> }

        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;