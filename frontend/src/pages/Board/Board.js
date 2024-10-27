import * as React from 'react';
import { Typography } from '@mui/material';
import BoardCard from '../../components/BoardCard/BoardCard.js';
import Grid from '@mui/material/Grid';
import Michelle from '../../assets/avatars/michelle-taing.jpg';
import Stephanie from '../../assets/avatars/stephanie-nguyen.jpg';
import Megan from '../../assets/avatars/megan-shah.jpg';
import Carolyn from '../../assets/avatars/carolyn-wang.jpg';
import Chelsea from '../../assets/avatars/chelsea-nguyen.jpeg';
import Maria from '../../assets/avatars/maria-davis.jpeg';
import Naydelin from '../../assets/avatars/naydelin-trejo.jpeg';
import Nikki from '../../assets/avatars/nikki-chen.jpeg';
import Tiffany from '../../assets/avatars/tiffany-vo.jpg';
import Veronica from '../../assets/avatars/veronica-valdez.jpg';
import Wendy from '../../assets/avatars/wendy-to.jpeg';
import Rachel from '../../assets/avatars/rachel-pu.jpg';
import Crystal from '../../assets/avatars/crystal-le.jpg';
import Jenna from '../../assets/avatars/jenna-shi.jpeg';
import Kayla from '../../assets/avatars/kayla-chen.jpeg';
import Aseel from '../../assets/avatars/aseel-ismail.jpg';

export default function Board() {
  const members = [
    {
      name: 'Wendy To',
      position: 'President',
      blurb: 'Computer Engineering',
      avatar: Wendy,
      linkedin: 'https://www.linkedin.com/in/wendytto/'
    },
    {
      name: 'Carolyn Wang',
      position: 'President',
      blurb: 'Computer Science',
      avatar: Carolyn,
      linkedin: 'https://www.linkedin.com/in/carolyn-wang-cs/'
    },
    {
      name: 'Nikki Chen',
      position: 'Treasurer',
      blurb: 'Computer Science',
      avatar: Nikki,
      linkedin: 'https://www.linkedin.com/in/nikki-chen23/'
    },
    {
      name: 'Naydelin Trejo',
      position: 'Secretary',
      blurb: 'Computer Science',
      avatar: Naydelin,
      linkedin: 'https://www.linkedin.com/in/naydelin-trejo/'
    },
    {
      name: 'Megan Shah',
      position: 'VP of Curriculum Development',
      blurb: 'Computer Science',
      avatar: Megan,
      linkedin: 'https://www.linkedin.com/in/megan-shah/'
    },
    {
      name: 'Stephanie Nguyen',
      position: 'VP of External Affairs',
      blurb: 'Computer Science',
      avatar: Stephanie,
      linkedin: 'https://www.linkedin.com/in/stephanienguyen25/'
    },
    {
      name: 'Crystal Le',
      position: 'Director of Public Relations',
      blurb: 'Computer Science',
      avatar: Crystal,
      linkedin: 'https://www.linkedin.com/in/thuy-n-le/'
    },
    {
      name: 'Jenna Shi',
      position: 'Director of Public Relations',
      blurb: 'Computer Science',
      avatar: Jenna,
      linkedin: 'https://www.linkedin.com/in/haoran-shi2/'
    },
    {
      name: 'Michelle Taing',
      position: 'Webmaster',
      blurb: 'Computer Science',
      avatar: Michelle,
      linkedin: 'https://www.linkedin.com/in/michelletaing/'
    },
    {
      name: 'Rachel Pu',
      position: 'Director of Events',
      blurb: 'Computer Science',
      avatar: Rachel,
      linkedin: 'https://www.linkedin.com/in/rachel-pu-ufl/'
    },
    {
      name: 'Maria Davis',
      position: 'Director of Events',
      blurb: 'Computer Science',
      avatar: Maria,
      linkedin: 'https://www.linkedin.com/in/maria-davis-/'
    },
    {
      name: 'Veronica Valdez',
      position: 'Director of Fundraising',
      blurb: 'Computer Science',
      avatar: Veronica,
      linkedin: ''
    },
    {
      name: 'Kayla Chen',
      position: 'Director of Fundraising',
      blurb: 'Computer Science',
      avatar: Kayla,
      linkedin: 'https://www.linkedin.com/in/kaylachenn/'
    },
    {
      name: 'Chelsea Nguyen',
      position: 'Director of Workshops (Software)',
      blurb: 'Computer Science',
      avatar: Chelsea,
      linkedin: 'https://www.linkedin.com/in/chelseaqnguyen/'
    },
    {
      name: 'Tiffany Vo',
      position: 'Director of Workshops (Hardware)',
      blurb: 'Computer Science',
      avatar: Tiffany,
      linkedin: 'https://www.linkedin.com/in/tiffanyyvo/'
    },
    {
      name: 'Aseel Ismail',
      position: 'Director of Media',
      blurb: 'Data Science',
      avatar: Aseel,
      linkedin: 'https://www.linkedin.com/in/aseel-ismail07/'
    }
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
