import * as React from 'react';
import { Typography } from '@mui/material';
import BoardCard from '../../components/BoardCard/BoardCard.js';
import Grid from '@mui/material/Grid';
//Presidents
import Angelina from '../../assets/avatars/angelina-wu.jpg';
import Rachel from '../../assets/avatars/rachel-pu.jpg';
//Treasurer
import Kayla from '../../assets/avatars/kayla-chen.jpg';
//Secretary
import Naydelin from '../../assets/avatars/naydelin-trejo.jpeg';
//VPCD
import Tiffany from '../../assets/avatars/tiffany-vo.jpeg';
//VPE
import Maria from '../../assets/avatars/maria-davis.jpg';
//Events
import Crystal from '../../assets/avatars/crystal-le.jpg';

import Michelle from '../../assets/avatars/michelle-taing.jpg';
import Stephanie from '../../assets/avatars/stephanie-nguyen.jpg';
import Megan from '../../assets/avatars/megan-shah.jpg';
import Carolyn from '../../assets/avatars/carolyn-wang.jpg';
import Chelsea from '../../assets/avatars/chelsea-nguyen.jpeg';


import Nikki from '../../assets/avatars/nikki-chen.jpeg';

import Veronica from '../../assets/avatars/veronica-valdez.jpg';
import Jenna from '../../assets/avatars/jenna-shi.jpeg';

import Aseel from '../../assets/avatars/aseel-ismail.jpg';

export default function Board() {
  const members = [
    {
      name: 'Rachel Pu',
      position: 'President',
      blurb: 'Computer Science',
      avatar: Rachel,
      linkedin: 'https://www.linkedin.com/in/rachel-pu-ufl/'
    },
    {
      name: 'Angelina Wu',
      position: 'President',
      blurb: 'Computer Science',
      avatar: Angelina,
      linkedin: 'https://www.linkedin.com/in/angelina-q-wu/'
    },
    {
      name: 'Kayla Chen',
      position: 'Treasurer',
      blurb: 'Computer Science',
      avatar: Kayla,
      linkedin: 'https://www.linkedin.com/in/kaylachenn/'
    },
    {
      name: 'Naydelin Trejo',
      position: 'Secretary',
      blurb: 'Computer Science',
      avatar: Naydelin,
      linkedin: 'https://www.linkedin.com/in/naydelin-trejo/'
    },
    {
      name: 'Tiffany Vo',
      position: 'VP of Curriculum Development',
      blurb: 'Computer Science',
      avatar: Tiffany,
      linkedin: 'https://www.linkedin.com/in/tiffanyyvo/'
    },
    {
      name: 'Maria Davis',
      position: 'VP of External Affairs',
      blurb: 'Computer Science',
      avatar: Maria,
      linkedin: 'https://www.linkedin.com/in/maria-davis-/'
    },
    {
      name: 'Maria Juliana Tady',
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
      name: 'Tanvi Garg',
      position: 'Webmaster',
      blurb: 'Computer Science',
      avatar: Michelle,
      linkedin: 'https://www.linkedin.com/in/michelletaing/'
    },
    {
      name: 'Crystal Le',
      position: 'Director of Events',
      blurb: 'Computer Science',
      avatar: Crystal,
      linkedin: 'https://www.linkedin.com/in/thuy-n-le/'
    },
    {
      name: 'Isabella Marin',
      position: 'Director of Events',
      blurb: 'Computer Science',
      avatar: Maria,
      linkedin: 'https://www.linkedin.com/in/maria-davis-/'
    },
    {
      name: 'Olivia Schwartz',
      position: 'Director of Fundraising',
      blurb: 'Computer Science',
      avatar: Veronica,
      linkedin: ''
    },
    {
      name: 'Lan Anh Do',
      position: 'Director of Fundraising',
      blurb: 'Computer Science',
      avatar: Kayla,
      linkedin: 'https://www.linkedin.com/in/kaylachenn/'
    },
    {
      name: 'Chloe Bai',
      position: 'Director of Workshops (Software)',
      blurb: 'Computer Science',
      avatar: Chelsea,
      linkedin: 'https://www.linkedin.com/in/chelseaqnguyen/'
    },
    {
      name: 'Mohana Pamidimukkala',
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
