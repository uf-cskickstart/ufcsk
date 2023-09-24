import * as React from 'react';
import { Typography } from '@mui/material';
import BoardCard from '../../components/BoardCard/BoardCard.js';
import Grid from '@mui/material/Grid';

export default function Board() {
  const members = [
    {
      name: 'Susana Bao',
      position: 'President',
      blurb: 'This is a little awesome fun fact about me.',
      avatar: 'susana-bao.jpg'
    },
    {
      name: 'Christine Lin',
      position: 'President',
      blurb: 'This is a little awesome fun fact about me.',
      avatar: 'christine-lin.jpeg'
    },
    {
      name: 'Carolina Boitel',
      position: 'Treasurer',
      blurb: 'This is a little awesome fun fact about me.',
      avatar: 'carolina-boitel.JPG'
    },
    {
      name: 'Sabrina Wong',
      position: 'VP of Curriculum Development',
      blurb: 'This is a little awesome fun fact about me.',
      avatar: 'sabrina-wong.jpeg'
    },
    {
      name: 'Kelly Chen',
      position: 'VP of External Affairs',
      blurb: 'This is a little awesome fun fact about me.',
      avatar: 'kelly-chen.jpg'
    },
    {
      name: 'Maddie Glaum',
      position: 'Director of Public Relations',
      blurb: 'This is a little awesome fun fact about me.',
      avatar: 'maddie-glaum.jpeg'
    },
    {
      name: 'Savannah Fletcher',
      position: 'Director of Public Relations',
      blurb: 'This is a little awesome fun fact about me.',
      avatar: 'savannah-fletcher.jpg'
    },
    {
      name: 'Michelle Taing',
      position: 'Webmaster',
      blurb: 'This is a little awesome fun fact about me. I love to code and I love singing, playing guitar, and cooking.',
      avatar: 'michelle-taing.jpg'
    },
    {
      name: 'Stephanie Nguyen',
      position: 'Director of Events',
      blurb: 'This is a little awesome fun fact about me.',
      avatar: 'stephanie-nguyen.jpg'
    },
    {
      name: 'Christina Nguyen',
      position: 'Director of Events',
      blurb: 'This is a little awesome fun fact about me.',
      avatar: 'christina-nguyen.jpeg'
    },
    {
      name: 'Megan Shah',
      position: 'Director of Workshops',
      blurb: 'This is a little awesome fun fact about me.',
      avatar: 'megan-shah.jpg'
    },
  ];
  
  return (
    <div>
      <Typography 
        variant="h2" 
        pt={2} 
        pl={3} 
        sx={{ fontFamily: 'DM Sans', textAlign: 'left', color: '#1A1421' }}
      >
        Our Board
      </Typography>
      <Grid 
        container 
        spacing={2}
        sx={{ px: 3, py: 3 }} 
      >
        {members.map((member, index) => (
          <Grid item xs={12} md={3} key={index}>
            <BoardCard
              name={member.name}
              position={member.position}
              blurb={member.blurb}
              avatar={member.avatar}
            />
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
