import * as React from 'react';
import { Button, Typography, Box } from '@mui/material';
import Iframe from 'react-iframe';
import './Calendar.css';

export default function Calendar() {
  return (
    <div>
      <Typography
        variant="h3"
        pt={2}
        pl={{ xs: 2, md: 4 }}
        sx={{
          fontFamily: 'DM Sans',
          textAlign: 'left',
          color: '#1A1421',
          fontWeight: '700',
          letterSpacing: '3px',
        }}
      >
        CALENDAR
      </Typography>
      <Box sx={{ padding: 2, display: 'flex', justifyContent: 'center' }}>
        <Iframe
          url="https://calendar.google.com/calendar/embed?height=600&wkst=1&ctz=America%2FNew_York&bgcolor=%23ffffff&showTitle=0&src=NTc1MmJlMDNjNzU0ZWQwMTZjMWI4MWU3OTU5M2IxN2EzMjAyZmJkNjIzNTBlMDMyOTcxZGFmMDRjZjE4Y2M3YUBncm91cC5jYWxlbmRhci5nb29nbGUuY29t&color=%23D81B60"
          className="calendar-iframe"
          frameBorder="0"
          scrolling="no"
        />
      </Box>
      <Button
        className="button-text"
        variant="contained"
        size="large"
        style={{
          marginTop: '20px',
          marginBottom: '35px',
          backgroundColor: '#fea5b0',
          boxShadow: 'none',
          fontFamily: 'DM Sans',
        }}
        href="https://calendar.google.com/calendar/u/0/embed?src=5752be03c754ed016c1b81e79593b17a3202fbd62350e032971daf04cf18cc7a@group.calendar.google.com&ctz=America/New_York"
        target="_blank"
        rel="noreferrer"
      >
        add to your google calendar
      </Button>
    </div>
  );
}
