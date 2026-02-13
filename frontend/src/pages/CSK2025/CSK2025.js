import * as React from 'react';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Box from '@mui/material/Box';
import { Button, Typography } from '@mui/material';
import Recap1 from '../../assets/recap25.1.JPG';
import Recap2 from '../../assets/recap25.2.JPG';
import Recap3 from '../../assets/recap25.3.JPG';
import Recap4 from '../../assets/recap25.4.JPG';

import Board from '../../assets/CSK2025Board.JPG';
import Attendees from '../../assets/CSK2025Attendees.JPG';

import Marshmallow from '../../assets/marsh2025.JPG';
import RelayRace from '../../assets/relayrace.jpeg';
import DuckSocial from '../../assets/ducksocial.JPG';

import Git from '../../assets/git.JPG';
import Portfolio from '../../assets/portfolio.JPG';

import CoursePlanning from '../../assets/presentation.png';
import ResumeReview from '../../assets/resumereview.JPG';
import InterviewPrep from '../../assets/interviewprep.JPG';

import StatCards from "../../components/StatCards/StatCards";

import Bloomberg from '../../assets/Bloomberg.png';
import TI from '../../assets/TI.png';

function CSK2025() {
    const itemData = [
       {
            img:Recap1
        },
        {
            img:Recap2
        },
        
        {
            img: Recap3
        },
        {
            img: Recap4
        },   
        
      
       
    ];
const stats = [
    {
      label: "Participants",
      value: "35",
      slides: [
        { img: Board, text: "CSK2025 Executive Board"},
        { img: Attendees, text: "CSK2025 Attendees" },
      ],
    },
    {
      label: "Socials",
      value: "3",
      slides: [
        { img: DuckSocial, text: "Two Truths and A Lie Duck Competition" },
        { img: RelayRace, text: "Relay Race" },
        { img: Marshmallow, text: "Marshmallow Tower Challenge" },
      ],
    },
    {
      label: "ProDev Workshops",
      value: "3",
      slides: [
        { img: ResumeReview, text: "Resume Review with UKG" },
        { img: InterviewPrep, text: "Interview and Career Fair Prep" },
        { img: CoursePlanning, text: "4-Year Planning" },

      ],
    },
    {
      label: "Technical Workshops",
      value: "3",
      slides: [
        { img: Recap2, text: "Snake Game with Arduino" },
        { img: Git, text: "Intro to Git" },
        { img: Portfolio, text: "Personal Portfolio Development" },
      ],
    },
  ];
 return (
    <><div>
         <Box display="flex" justifyContent="center" alignItems="center">
             <ImageList sx={{ width: '100%', height: 'auto' }} cols={4} gap={0}>
                 {itemData.map((item) => (
                     <ImageListItem key={item.img}>
                         <img
                             src={item.img}
                             alt=""
                             style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                     </ImageListItem>
                 ))}
             </ImageList>
         </Box>

         <StatCards title="CS Kickstart 2025 Highlights" stats={stats} />
     </div>
     
     <Grid item xs={12} md={6} style={{ paddingBottom: '20px' }}>
             <Typography
                 style={{ fontFamily: 'DM Sans', margin: '50px', paddingBottom: '20px' }}
                 align='center'
             >
                 Thank you to our sponsors for their support in making CS Kickoff 2025 possible! This event would not have been possible without your support, and we appreciate your commitmment to empowering students in tech. 
             </Typography>
             <div
                 style={{
                     display: 'flex',
                     flexWrap: 'wrap', 
                     alignItems: 'center',
                     justifyContent: 'center',
                     gap: '24px',
                 }}
             >
                 <img
                     src={Bloomberg}
                     alt="Bloomberg logo"
                     style={{
                         maxWidth: '40%',
                         height: 'auto',
                         objectFit: 'contain',
                     }} />
                 <img
                     src={TI}
                     alt="TI logo"
                     style={{
                         maxWidth: '40%',
                         height: 'auto',
                         objectFit: 'contain',
                     }} />
             </div>



         </Grid>
<Box
  sx={{
    padding: { xs: 3, md: 8 },
    backgroundColor: '#ffe6f0', 
  }}
>

  <Grid container spacing={6} alignItems="center">
    
    <Grid item xs={12} md={6}>
      <Typography
        variant="h4"
        sx={{ fontFamily: 'DM Sans', mb: 2 }}
      >
         CS Kickoff 2025 — Summer Program
      </Typography>

      <Typography
        sx={{ fontFamily: 'DM Sans', fontSize: '1.1rem', lineHeight: 1.7 }}
      >
       
For our summer program, we were able to successfully get over $1,500 from our sponsorships. Our sponsorships this year included Texas Instruments, Bloomberg, and UKG! Not only were we able to double in attendees, but we also have members from our summer program continue to come to our events throughout the fall!
Our first day consisted of a presentation on different career pathways, technical workshop on Git, fun social activities, and a technical hardware workshop on Arduinos. Most of our attendees had never heard of technologies like Git or Arduino, so it was very rewarding to be able to teach them valuable skills.
Our second day focused on professional development, with workshops on crafting the perfect resume, elevator pitch, and responses to behavioral interviews in preparation for upcoming career fairs. We had UKG share a presentation with us during this day and it very well received! We also provided mentorship for our attendees so that they can feel supported.
Our final day gave attendees the opportunity to start building a personal website while they learned the basics of web development, hear about our officers’ experiences with internships, and end with a bonding scavenger hunt!
      </Typography>
    </Grid>

    <Grid item xs={12} md={6}>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: 2,
        }}
      >
        <Box
          component="img"
          src={Board}
          sx={{ width: '100%', borderRadius: 2 }}
        />
        <Box
          component="img"
          src={Attendees}
          sx={{ width: '100%', borderRadius: 2 }}
        />
      </Box>
    </Grid>

  </Grid>
</Box>
</>
     
  );
}

export default CSK2025;