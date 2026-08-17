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
import { Link, useLocation } from 'react-router-dom';
import { apiGet } from '../../api.js';


const pages = ['Home', 'Board', 'Calendar', 'Program', 'Sponsor'];
const routes = ["/home", "/board", "/calendar", "/program", "/sponsors"];

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const [anchorElProgram, setAnchorElProgram] = React.useState(null);

  const [authState, setAuthState] = React.useState(null);
  const location = useLocation();

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

  React.useEffect(() => {
    let cancelled = false;
    apiGet('/api/admin/me')
      .then(() => {
        if (!cancelled) setAuthState('admin');
      })
      .catch(() => {
        apiGet('/api/profile')
          .then(() => {
            if (!cancelled) setAuthState('participant');
          })
          .catch(() => {
            if (!cancelled) setAuthState('guest');
          });
      });
    return () => {
      cancelled = true;
    };
  }, [location.pathname]);

  const authLabel = authState === 'admin' ? 'Admin' : authState === 'participant' ? 'My Points' : 'Login';
  const authRoute = authState === 'admin' ? '/admin/events' : authState === 'participant' ? '/profile' : '/login';
  const authEmoji = authState === 'admin' ? '🛠️' : authState === 'participant' ? '⭐' : '👋';

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

          {/* AUTH BUTTON - Login / My Points / Admin, always pinned to the right */}
          <Box>
            <Button
              sx={{
                my: 1,
                ml: 1,
                mr: { xs: 1, md: 0 },
                backgroundColor: '#fea5b0',
                color: '#1A1421',
                fontFamily: 'DM Sans',
                fontSize: '16px',
                fontWeight: 700,
                textTransform: 'none',
                borderRadius: '999px',
                px: 2.5,
                py: 0.75,
                boxShadow: '0 3px 8px rgba(0,0,0,0.18)',
                transition: 'transform 0.15s ease, background-color 0.15s ease',
                '&:hover': {
                  backgroundColor: '#ff8fa3',
                  transform: 'scale(1.06)',
                  boxShadow: '0 4px 10px rgba(0,0,0,0.22)',
                },
              }}
            >
              <Link
                to={authRoute}
                style={{ textDecoration: 'none', color: '#1A1421', display: 'flex', alignItems: 'center', gap: '6px' }}
              >
                <span>{authEmoji}</span>
                {authLabel}
              </Link>
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default ResponsiveAppBar;
