import * as React from 'react';
import { Typography } from '@mui/material';
import BoardCard from '../../components/BoardCard/BoardCard.js';
import Grid from '@mui/material/Grid';
import members from '../../data/board.json';

export default function Board() {
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
        OUR BOARD
      </Typography>
      <Grid container spacing={2} px={{ xs: 6, md: 12 }} py={2}>
        {members.map((member, index) => (
          // <Grid item xs={12} sm={6} md={index < 6 ? 6 : 4} key={index}>
          <Grid item xs={12} sm={6} md={4} key={index}>
            <BoardCard
              name={member.name}
              position={member.position}
              blurb={member.blurb}
              avatar={member.avatar}
              linkedin={member.linkedin}
              reverse={index % 2 !== 0}
            />
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
