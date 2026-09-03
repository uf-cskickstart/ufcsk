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
import Angelica from '../../assets/avatars/2026-board/angelica-tang.png';
// director of corporate relations
import Aashita from '../../assets/avatars/2026-board/aashita-rai.PNG';
//director of public relations
import Mishka from '../../assets/avatars/2026-board/mishka-sonavadeka.jpg';
import Tiffany from '../../assets/avatars/2026-board/tiffany-chen.PNG';
import Adora from '../../assets/avatars/2026-board/adora-lin.PNG';
// director of professional development
import Monica from '../../assets/avatars/2026-board/monica-coira.jpg';
// co-director of events
import Giuliana from '../../assets/avatars/2026-board/giuliana-silva.jpg';

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
      blurb: 'Computer Science & Statistics', 
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
      linkedin: 'https://www.linkedin.com/in/kayla-inoa/'
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
      blurb: 'Computer Engineering',
      avatar: Grace,
      linkedin: 'https://www.linkedin.com/in/grace-mihiral/'
    },
    {
      name: 'Neha Jupalli',
      position: 'Co-director of Fundraising',
      blurb: 'Data Science',
      avatar: Neha,
      linkedin: 'https://www.linkedin.com/in/neha-jupalli/'
    },
    {
      name: 'Angelica Tang',
      position: 'Co-director of Fundraising',
      blurb: 'Computer Engineering',
      avatar: Angelica,
      linkedin: 'https://www.linkedin.com/in/angelicatang/'
    },
    {
      name: 'Aashita Rai',
      position: 'Director of Corporate Relations',
      blurb: 'Biomedical Engineering',
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
      name: 'Tiffany Chen',
      position: 'Director of Public Relations',
      blurb: 'Computer Science',
      avatar: Tiffany,
      linkedin: 'https://www.linkedin.com/in/ttiffanychen/'
    },
    {
      name: 'Adora Lin',
      position: 'Director of Media',
      blurb: 'Computer Science',
      avatar: Adora,
      linkedin: 'https://www.linkedin.com/in/adora-lin-/'
    },
    {
      name: 'Monica Coira',
      position: 'Director of Professional Development',
      blurb: 'Computer Science',
      avatar: Monica,
      linkedin: 'https://www.linkedin.com/in/monicacoira/'
    },
    {
      name: 'Giuliana Silva',
      position: 'Co-Director of Events',
      blurb: 'Computer Science',
      avatar: Giuliana,
      linkedin: 'https://www.linkedin.com/in/giulianaesilva/'
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
