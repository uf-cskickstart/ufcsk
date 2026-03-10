import * as React from 'react';
import { Typography } from '@mui/material';
import BoardCard from '../../components/BoardCard/BoardCard.js';
import Grid from '@mui/material/Grid';
// Presidents
import Isabella from '../../assets/avatars/2026-board/isabella-marin.jpg';
import Jenna from '../../assets/avatars/jenna-shi.jpeg';
// vp of career development
import Mohana from '../../assets/avatars/mohana-pamidimukkala.jpeg';
// vp of external affairs
import Tanvi from '../../assets/avatars/2026-board/tanvi-garg.jpeg';
// secretary
import Aseel from '../../assets/avatars/2026-board/aseel-ismail.jpeg';
// treasurer
import Emily from '../../assets/avatars/2026-board/emily-chen.jpeg';
//director of ui/ux
import Laveena from '../../assets/avatars/2026-board/laveena-bhuiyan.jpg';
// director of software development
import KaylaInoa from '../../assets/avatars/2026-board/kayla-inoa.PNG';
// director of software workshops
import Leonna from '../../assets/avatars/2026-board/leonna-xie.JPG';
// director of hardware workshops
import Grace from '../../assets/avatars/2026-board/grace-mihiral.png';
//fundraising directors
import Neha from '../../assets/avatars/2026-board/neha-jupalli.JPG';
import Angelica from '../../assets/avatars/2026-board/angelica-tang.jpg';
// director of corporate relations
import Aashita from '../../assets/avatars/2026-board/aashita-rai.PNG';
//director of public relations
import Mishka from '../../assets/avatars/2026-board/mishka-sonavadeka.jpg';
// director of professional development
import Thuy from '../../assets/avatars/crystal-le.jpg';
// co-director of events

export default function Board() {
  const members = [
    {
      name: 'Isabella Marin',
      position: 'President',
      blurb: 'Computer Science',
      avatar: Isabella,
      linkedin: 'https://www.linkedin.com/in/imarin417/'
    },
    {
      name: 'Jenna Shi',
      position: 'President',
      blurb: 'Computer Science',
      avatar: Jenna,
      linkedin: 'https://www.linkedin.com/in/haoran-shi2/'
    },
    {
      name: 'Mohana Pamidimukkala',
      position: 'Vice President of Career Development',
      blurb: 'Computer Science',
      avatar: Mohana,
      linkedin: 'https://www.linkedin.com/in/mohana-pamidi/'
    },
    {
      name: 'Tanvi Garg',
      position: 'Vice President of External Affairs',
      blurb: 'Computer Science',
      avatar: Tanvi,
      linkedin: 'https://www.linkedin.com/in/tanvi-garg2/'
    },
    {
      name: 'Aseel Ismail',
      position: 'Secretary',
      blurb: 'Data Science',
      avatar: Aseel,
      linkedin: 'https://www.linkedin.com/in/aseel-ismail07/'
    },
    {
      name: 'Emily Chen',
      position: 'Treasurer',
      blurb: 'Computer Science',
      avatar: Emily,
      linkedin: 'https://www.linkedin.com/in/emily-chen-2207c/'
    },
    {
      name: 'Laveena Bhuiyan',
      position: 'Director of UI/UX',
      blurb: 'Computer Science',
      avatar: Laveena,
      linkedin: 'https://www.linkedin.com/in/laveena-bhuiyan/'
    },
    {
      name: 'Kayla Inoa',
      position: 'Director of Software Development',
      blurb: 'Computer Science',
      avatar: KaylaInoa,
      linkedin: 'https://www.linkedin.com/in/kaylainoa/'
    },
    {
      name: 'Leonna Xie',
      position: 'Director of Software Workshops',
      blurb: 'Computer Science',
      avatar: Leonna,
      linkedin: 'https://www.linkedin.com/in/leonnaxie/'
    },
    {
      name: 'Grace Mihiral',
      position: 'Director of Hardware Workshops',
      blurb: 'Computer Science',
      avatar: Grace,
      linkedin: 'https://www.linkedin.com/in/grace-mihiral/'
    },
    {
      name: 'Neha Jupalli',
      position: 'Co-director of Fundraising',
      blurb: 'Computer Science',
      avatar: Neha,
      linkedin: 'https://www.linkedin.com/in/neha-jupalli/'
    },
    {
      name: 'Angelica Tang',
      position: 'Co-director of Fundraising',
      blurb: 'Computer Science',
      avatar: Angelica,
      linkedin: 'https://www.linkedin.com/in/angelicatang/'
    },
    {
      name: 'Aashita Rai',
      position: 'Director of Corporate Relations',
      blurb: 'Computer Science',
      avatar: Aashita,
      linkedin: 'https://www.linkedin.com/in/aashita-rai/'
    },
    {
      name: 'Mishka Sonavadekar',
      position: 'Director of Public Relations',
      blurb: 'Computer Science',
      avatar: Mishka,
      linkedin: 'https://www.linkedin.com/in/mishka-sonavadekar/'
    },
    {
      name: 'Thuy Le',
      position: 'Director of Professional Development',
      blurb: 'Computer Science',
      avatar: Thuy,
      linkedin: 'https://www.linkedin.com/in/thuy-n-le/'
    },
    {
      name: 'Giuliana Silva',
      position: 'Co-Director of Events',
      blurb: 'Computer Science',
      avatar: null,
      linkedin: 'https://www.linkedin.com/in/giulianaesilva/'
    },
    {
      name: 'Kayla Bui',
      position: 'Co-Director of Events',
      blurb: 'Computer Science',
      avatar: null,
      linkedin: 'https://www.linkedin.com/in/kbui-b61741369/'
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
