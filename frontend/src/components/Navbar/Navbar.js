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
import { Link } from 'react-router-dom';


const pages = ['Home', 'Board', 'Calendar', 'Program', 'Sponsor'];
const routes = ["/home", "/board", "/calendar", "/program", "/sponsors"];

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  
  const [anchorElProgram, setAnchorElProgram] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleProgramOpen = (event) => {
    setAnchorElProgram(event.currentTarget);
  };
  const handleProgramClose = () => {
    setAnchorElProgram(null);
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: '#BE9BCB', borderBottom: '2px solid white', boxShadow: 'none' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* MOBILE MENU */}
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              anchorEl={anchorElNav}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: 'block', md: 'none' } }}
            >
              {pages.map((page, index) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Link to={routes[index]} style={{ textDecoration: 'none', color: 'black' }}>
                    {page}
                  </Link>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          {/* DESKTOP MENU */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page, index) => (
              page === "Program" ? (
                <Box key={page}>
                  <Button
                    onMouseEnter={handleProgramOpen}
                    sx={{
                      my: 1,
                      mx: 1,
                      color: 'white',
                      fontFamily: 'DM Sans',
                      fontSize: '18px',
                      fontWeight: 500,
                      textTransform: 'none',
                    }}
                  >
                    {page}
                  </Button>

                  <Menu
                    anchorEl={anchorElProgram}
                    open={Boolean(anchorElProgram)}
                    onClose={handleProgramClose}
                    MenuListProps={{ onMouseLeave: handleProgramClose }}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                    transformOrigin={{ vertical: 'top', horizontal: 'left' }}
                  >
                    <MenuItem onClick={handleProgramClose}>
                      <Link to="/CSK2024" style={{ textDecoration: 'none', color: 'black' }}>
                        CSK 2024 Recap
                      </Link>
                    </MenuItem>
                    <MenuItem onClick={handleProgramClose}>
                      <Link to="/CSK2025" style={{ textDecoration: 'none', color: 'black' }}>
                        CSK 2025 Recap
                      </Link>
                    </MenuItem>
                  </Menu>
                </Box>
              ) : (
                <Button
                  key={page}
                  sx={{
                    my: 1,
                    mx: 1,
                    color: 'white',
                    fontFamily: 'DM Sans',
                    fontSize: '18px',
                    fontWeight: 500,
                    textTransform: 'none',
                  }}
                >
                  <Link to={routes[index]} style={{ textDecoration: 'none', color: 'white' }}>
                    {page}
                  </Link>
                </Button>
              )
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default ResponsiveAppBar;
