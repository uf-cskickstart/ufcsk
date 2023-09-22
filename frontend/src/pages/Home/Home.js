import * as React from 'react';
import Banner from '../../assets/banner-image.png';
import Grid from '@mui/material/Grid';

function Home() {
    return (
        <div>
            <img src={ Banner } alt="CS Kickstart logo with text." style={{ width: '100%' }}/>

            <Grid container rowSpacing={{ xs: 1, md: 4 }} columnSpacing={8} sx={{ px: 3, py: 4 }}>
                <Grid item sx={12} md={4}>
                    <h1 style={{ textAlign: 'right', margin: '0', padding: '0' }}>MISSION</h1>
                </Grid>
                <Grid item sx={12} md={6}>
                    <p style={{ textAlign: 'left', margin: '0', paddingBottom: '20px' }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                </Grid>
                <Grid item sx={12} md={4}>
                    <h1 style={{ textAlign: 'right', margin: '0', padding: '0' }}>GET INVOLVED</h1>
                </Grid>
                <Grid item sx={12} md={6}>
                    <p style={{ textAlign: 'left', margin: '0', paddingBottom: '20px' }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                </Grid>
                <Grid item sx={12} md={4}>
                    <h1 style={{ textAlign: 'right', margin: '0', padding: '0' }}>KEEP IN TOUCH</h1>
                </Grid>
                <Grid item sx={12} md={6}>
                    <p style={{ textAlign: 'left', margin: '0', padding: '0' }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                </Grid>
            </Grid>
        </div>
        
    );
}

export default Home;