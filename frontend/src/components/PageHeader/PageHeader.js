import * as React from 'react';
import { Box, Typography } from '@mui/material';

// Small purple eyebrow over the uppercase DM Sans page title, with an
// optional slot on the right (e.g. a sign-out button).
export default function PageHeader({ eyebrow, title, children }) {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: { xs: 'flex-start', sm: 'flex-end' },
        justifyContent: 'space-between',
        flexDirection: { xs: 'column', sm: 'row' },
        gap: 1,
        mb: 2,
      }}
    >
      <Box sx={{ textAlign: 'left' }}>
        {eyebrow && (
          <Typography sx={{ fontFamily: 'DM Sans', color: '#BE9BCB', fontWeight: '700', letterSpacing: '2px', fontSize: '0.8rem' }}>
            {eyebrow}
          </Typography>
        )}
        <Typography
          variant="h3"
          sx={{ fontFamily: 'DM Sans', color: '#1A1421', fontWeight: '700', letterSpacing: '3px', fontSize: { xs: '2rem', sm: '3rem' } }}
        >
          {title}
        </Typography>
      </Box>
      {children && <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>{children}</Box>}
    </Box>
  );
}
