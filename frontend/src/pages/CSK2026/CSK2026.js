import * as React from 'react';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Box from '@mui/material/Box';
import { Button, Typography } from '@mui/material';

import StatCards from '../../components/StatCards/StatCards';

import BNY from '../../assets/BNY.png';
import UKG from '../../assets/UKG.png';
import FCI from '../../assets/FCI.png';

function CSK2026() {
  const itemData = [];
  const stats = [
    {
      label: 'Participants',
      value: '36',
      slides: [],
    },
    {
      label: 'Socials',
      value: '3',
      slides: [],
    },
    {
      label: 'Workshops',
      value: '5',
      slides: [],
    },
    {
      label: 'Panels',
      value: '2',
      slides: [],
    },
  ];
  return (
    <>
      <div>
        <Box display="flex" justifyContent="center" alignItems="center">
          <ImageList sx={{ width: '100%', height: 'auto' }} cols={4} gap={0}>
            {itemData.map((item) => (
              <ImageListItem key={item.img}>
                <img
                  src={item.img}
                  alt=""
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </ImageListItem>
            ))}
          </ImageList>
        </Box>

        <StatCards title="CS Kickstart 2026 Highlights" stats={stats} />
      </div>

      <Grid item xs={12} md={6} style={{ paddingBottom: '20px' }}>
        <Typography
          style={{
            fontFamily: 'DM Sans',
            margin: '50px',
            paddingBottom: '20px',
          }}
          align="center"
        >
          Thank you to our sponsors for their support in making CS Kickoff 2026
          possible! This event would not have been possible without your
          support, and we appreciate your commitmment to empowering students in
          tech.
        </Typography>
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            flexWrap: 'wrap', // allow wrapping on small screens
            alignItems: 'center',
            justifyContent: 'center',
            gap: { xs: 1, md: 3 },
          }}
        >
          <Box
            component="img"
            src={BNY}
            alt="BNY logo"
            sx={{
              height: { xs: '110px', md: '110px' },
              width: { xs: '180px', md: '220px' },
              objectFit: 'cover',
            }}
          />
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Box
              component="img"
              src={FCI}
              alt="FCI logo"
              sx={{
                height: { xs: '150px', md: '200px' },
                objectFit: 'contain',
              }}
            />
            <Box
              component="img"
              src={UKG}
              alt="UKG logo"
              sx={{
                height: { xs: '100px', md: '110px' },
                width: { xs: '180px', md: '220px' },
                objectFit: 'cover',
              }}
            />
          </Box>
        </Box>
      </Grid>
      <Box
        sx={{
          padding: { xs: 3, md: 8 },
          backgroundColor: '#ffe6f0',
        }}
      >
        <Grid container spacing={6} alignItems="center">
          <Grid item xs={12} md={6}>
            <Typography variant="h4" sx={{ fontFamily: 'DM Sans', mb: 2 }}>
              CS Kickoff 2026 — Summer Program
            </Typography>

            <Typography
              sx={{
                fontFamily: 'DM Sans',
                fontSize: '1.1rem',
                lineHeight: 1.7,
              }}
            >
              Summary and recap coming soon!
            </Typography>
          </Grid>

          {/* <Grid item xs={12} md={6}>
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: 2,
              }}
            >
              <Box
                component="img"
                src={Board}
                sx={{ width: '100%', borderRadius: 2 }}
              />
              <Box
                component="img"
                src={Attendees}
                sx={{ width: '100%', borderRadius: 2 }}
              />
            </Box>
          </Grid> */}
        </Grid>
      </Box>
    </>
  );
}

export default CSK2026;
