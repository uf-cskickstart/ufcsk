import * as React from 'react';
import { Typography } from '@mui/material';
import BoardCard from '../../components/BoardCard/BoardCard.js';
import Grid from '@mui/material/Grid';

export default function Board() {
  const members = [
    {
      name: 'Susana Bao',
      position: 'President',
      blurb: 'Computer Science',
      avatar: 'susana-bao.jpg',
      linkedin: 'https://www.linkedin.com/in/haohui-bao/'
    },
    {
      name: 'Christine Lin',
      position: 'President',
      blurb: 'Computer Science',
      avatar: 'christine-lin.jpeg',
      linkedin: 'https://www.linkedin.com/in/lin-christine/'
    },
    {
      name: 'Carolina Boitel',
      position: 'Treasurer',
      blurb: 'Computer Science',
      avatar: 'carolina-boitel.JPG',
      linkedin: 'https://www.linkedin.com/in/carolina-boitel/'
    },
    {
      name: 'Sabrina Wong',
      position: 'VP of Curriculum Development',
      blurb: 'Computer Engineering',
      avatar: 'sabrina-wong.jpeg',
      linkedin: 'https://www.linkedin.com/in/wongssabrina/'
    },
    {
      name: 'Kelly Chen',
      position: 'VP of External Affairs',
      blurb: 'Computer Science',
      avatar: 'kelly-chen.jpg',
      linkedin: 'https://www.linkedin.com/in/kelly-chen-417128260/'
    },
    {
      name: 'Maddie Glaum',
      position: 'Director of Public Relations',
      blurb: 'Computer Science',
      avatar: 'maddie-glaum.jpeg',
      linkedin: 'https://www.linkedin.com/in/madeleineglaum/'
    },
    {
      name: 'Savannah Fletcher',
      position: 'Director of Public Relations',
      blurb: 'Computer Science',
      avatar: 'savannah-fletcher.jpg',
      linkedin: 'https://www.linkedin.com/in/savannah-fletcher-a56174251/'
    },
    {
      name: 'Michelle Taing',
      position: 'Webmaster',
      blurb: 'Computer Science',
      avatar: 'michelle-taing.jpg',
      linkedin: 'https://www.linkedin.com/in/michelletaing/'
    },
    {
      name: 'Stephanie Nguyen',
      position: 'Director of Events',
      blurb: 'Computer Science',
      avatar: 'stephanie-nguyen.jpg',
      linkedin: 'https://www.linkedin.com/in/stephanienguyen25/'
    },
    {
      name: 'Christina Nguyen',
      position: 'Director of Events',
      blurb: 'Information Systems',
      avatar: 'christina-nguyen.jpeg',
      linkedin: 'https://www.linkedin.com/in/christinalenguyen/'
    },
    {
      name: 'Megan Shah',
      position: 'Director of Workshops',
      blurb: 'Computer Science',
      avatar: 'megan-shah.jpg',
      linkedin: 'https://www.linkedin.com/in/megan-shah/'
    },
  ];
  
  return (
    <div>
      <Typography 
        variant="h3" 
        pt={2} 
        pl={{ xs: 2, md: 4 }} 
        sx={{ fontFamily: 'DM Sans', textAlign: 'left', color: '#1A1421', fontWeight: '700', letterSpacing: '3px' }}
      >
        OUR BOARD
      </Typography>
      <Grid 
        container 
        spacing={2}
        px={{ xs: 2, md: 4}}
        py={2}
      >
        {members.map((member, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <BoardCard
              name={member.name}
              position={member.position}
              blurb={member.blurb}
              avatar={member.avatar}
              linkedin={member.linkedin}
            />
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
