import * as React from 'react';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Box from '@mui/material/Box';
import { Button, Typography } from '@mui/material';
import Recap1 from '../../assets/recap-1.jpg';
import Recap2 from '../../assets/recap-2.jpg';
import Recap3 from '../../assets/recap-3.jpg';
import CoursePlanning from '../../assets/recap-4.jpg'
import Board from '../../assets/board.jpg';
import Marshmallow from '../../assets/marshmallow.png';
import FoilBoat from '../../assets/FoilBoat.png';

import Attendees from '../../assets/cskickoff2024.jpg';
import StatCards from "../../components/StatCards/StatCards";
import ScavengerHunt from '../../assets/scavengerhunt.jpeg';
import Arduino from '../../assets/arduino.jpeg';

import AlumniPanel from '../../assets/alumnipanel.png';
import StudentPanel from '../../assets/studentlifepanel.png';
import PersonalPortfolio from '../../assets/personalportfolio.png';
import InvolvementPanel from '../../assets/involvementpanel.png';
import IntrotoReact from '../../assets/react.png';
import Python from '../../assets/python.png';

function CSK2024() {
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
            img: Board
        },   
        
      
       
    ];
const stats = [
    {
      label: "Participants",
      value: "20",
      slides: [
        { img: Board, text: "CSK2024 Executive Board"},
        { img: Attendees, text: "CSK2024 Attendees" },
      ],
    },
    {
      label: "Socials",
      value: "3",
      slides: [
        { img: Marshmallow, text: "Marshmallow Tower Challenge" },
        { img: ScavengerHunt, text: "Scavenger Hunt" },
        { img: FoilBoat, text: "Foil Boat Challenge" },
      ],
    },
    {
      label: "Workshops",
      value: "5",
      slides: [
        { img: CoursePlanning, text: "4-year Planning" },
        { img: Arduino, text: "Introduction to Arduino" },
         { img: PersonalPortfolio, text: "PersonalPortfolio" },
          { img: Python, text: "Introduction to Python" },
           { img: IntrotoReact, text: "Introduction to React" },
      ],
    },
    {
      label: "Panels",
      value: "3",
      slides: [
        { img: StudentPanel, text: "Student Life Panel" },
        { img: AlumniPanel, text: "Alumni Panel" },
        { img: InvolvementPanel, text: "Involvement Panel" },
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


     <StatCards title="CS Kickstart 2024 Highlights" stats={stats} />
   </div><Box
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
             CS Kickoff 2024 — Summer Program
           </Typography>

           <Typography
             sx={{ fontFamily: 'DM Sans', fontSize: '1.1rem', lineHeight: 1.7 }}
           >

            It’s a wrap! ✨ From August 18th to 20th, we welcomed an incredible group of young women to UF with our first-ever CS Kickoff, a program for incoming freshman and transfer students interested in tech to get a head-start on the world of Computer Science before the fall semester begins. 👾💻 We dived into student panels, hands-on workshops, and inspiring talks from industry leaders and a UF professor. Our attendees also explored tech-related clubs, connected at socials, and so much more. A massive thank you to our amazing eBoard and officers for bringing this vision to life, and to everyone who joined us—we hope you had as much fun as we did! 🫶 Here’s to building a brighter tech future together! 🚀👩‍💻

          </Typography>
         </Grid>

         <Grid item xs={12} md={6}>
           <Box
             sx={{
               display: 'grid',
               gridTemplateColumns: 'repeat(2, 1fr)',
               gap: 2,
               alignItems: 'center',
             }}
           >
             <Box
               component="img"
               src={Board}
               sx={{ width: '100%', borderRadius: 2, objectFit: 'cover' }} />
             <Box
               component="img"
               src={Attendees}
               sx={{ width: '100%', borderRadius: 2, objectFit: 'cover', aspectRatio: '4 /3' }} />
           </Box>
         </Grid>

       </Grid>
     </Box></>
  );
}

export default CSK2024;

