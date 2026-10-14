import * as React from 'react';
import { Box, Typography } from '@mui/material';

// Event dates are DATE columns, so only the YYYY-MM-DD part is meaningful.
function formatDatePart(dateString, options) {
  return new Date(`${String(dateString).slice(0, 10)}T00:00:00Z`).toLocaleDateString('en-US', { ...options, timeZone: 'UTC' });
}

// Calendar-tile style date: short month over day number.
export default function DateBadge({ date }) {
  return (
    <Box
      sx={{
        width: 56,
        flexShrink: 0,
        textAlign: 'center',
        borderRadius: '10px',
        backgroundColor: 'rgba(190, 155, 203, 0.15)',
        py: 0.75,
      }}
    >
      <Typography sx={{ fontFamily: 'DM Sans', fontSize: '0.7rem', fontWeight: 700, color: '#BE9BCB', letterSpacing: '1px' }}>
        {formatDatePart(date, { month: 'short' }).toUpperCase()}
      </Typography>
      <Typography sx={{ fontFamily: 'DM Sans', fontSize: '1.4rem', fontWeight: 700, color: '#1A1421', lineHeight: 1 }}>
        {formatDatePart(date, { day: 'numeric' })}
      </Typography>
    </Box>
  );
}
