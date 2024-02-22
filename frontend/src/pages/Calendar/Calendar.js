import * as React from 'react';
import { Typography, Box } from '@mui/material';
import Iframe from 'react-iframe';

export default function Calendar() {
  return (
    <div>
      <Typography 
        variant="h3" 
        pt={2} 
        pl={{ xs: 2, md: 4 }} 
        sx={{ fontFamily: 'DM Sans', textAlign: 'left', color: '#1A1421', fontWeight: '700', letterSpacing: '3px' }}
      >
        CALENDAR
      </Typography>
      <Box sx={{ padding: 2 }}>
      <Iframe 
        url="https://calendar.google.com/calendar/embed?height=600&wkst=1&ctz=America%2FNew_York&bgcolor=%23ffffff&showTitle=0&src=NTc1MmJlMDNjNzU0ZWQwMTZjMWI4MWU3OTU5M2IxN2EzMjAyZmJkNjIzNTBlMDMyOTcxZGFmMDRjZjE4Y2M3YUBncm91cC5jYWxlbmRhci5nb29nbGUuY29t&color=%23D81B60"
        width="800"
        height="600"
        frameBorder="0"
        scrolling="no"
      />
    </Box>
    </div>
  );
}
