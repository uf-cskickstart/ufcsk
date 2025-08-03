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
import Board from '../../assets/board.jpg';
import Marshmallow from '../../assets/marshmallow.png';
import Group from '../../assets/group.png';
import Selfie from '../../assets/selfie.jpg';
import Presentation from '../../assets/presentation.png';
import CSKickoff2024 from '../../assets/cskickoff2024.jpg';
function Program() {
    const itemData = [
        {
            img: Selfie
        },
        {
            img: Marshmallow
        },
        {
            img: Board
        },
        {
            img: Group
        },
      
        {
            img: Presentation
        },
       
    ];

    return (
    <div>
        {/* <img src={ Banner } alt="CS Kickstart logo with text." style={{ width: '100%' }}/> */}

        <Box
  display="flex"
  justifyContent="center"
  alignItems="center"
>
  <ImageList
    sx={{ width: '100%', height: 'auto' }}
    cols={6}
    gap={0}
  >
    {itemData.map((item, index) => {
      let cols = 1;

      if (index === 2) {
        cols = 2;
      }

      return (
        <ImageListItem key={item.img} cols={cols}>
          <img
            srcSet={`${item.img}?w=${300 * cols}&h=300&fit=crop&auto=format&dpr=2 2x`}
            src={`${item.img}?w=${300 * cols}&h=300&fit=crop&auto=format`}
            alt={item.title}
            loading="lazy"
          />
        </ImageListItem>
      );
    })}
  </ImageList>
</Box>

        <Grid 
                container 
                rowSpacing={{ xs: 1, md: 4 }} 
                columnSpacing={8}
                px={3}
                py={{ xs: 2, md: 4 }}
            >
                <Grid item xs={12} md={4}>
                <Typography
                    sx={{
                        textAlign: {
                            xs: 'left',
                            md: 'right',
                        },
                        fontFamily: 'DM Sans',
                        fontWeight: '700',
                        color: '#1A1421',
                        letterSpacing: '2px'
                    }}
                    variant='h4'
                >
                    APPLY
                </Typography>
            </Grid>
            <Grid item xs={12} md={6} style={{ paddingBottom: '20px' }}>
                    {/* <Typography 
                        style={{ fontFamily: 'DM Sans', margin: '0', paddingBottom: '20px' }}
                        align='left'
                    >
                        Applications for our summer 2025 program will be opening at the end of the spring 2025 semester.
                    </Typography> */}
                    {/* <div style={{ textAlign: 'left' }}>
                        <Button 
                            className="button-text" 
                            variant="contained" 
                            size="large"
                            style={{ backgroundColor: '#fea5b0', boxShadow: 'none', fontFamily: 'DM Sans' }} 
                            href='https://docs.google.com/forms/d/e/1FAIpQLSfP5NQ8Tt8cJLdFO4sF6HwRaMX-O7dS4kWXoMukZYtkCJr80w/viewform'
                            target='_blank'
                            rel="noreferrer"
                        >
                                2025 CS Kickoff Application Form
                        </Button>
                    </div> */}
                    <Typography 
                    style={{ fontFamily: 'DM Sans', margin: '0', paddingBottom: '20px' }}
                    align='left'
                >
                    <br></br>
                    Applications for CS Kickoff 2025 are now closed! Stay on the lookout for future events!
                </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
                <Typography
                    sx={{
                        textAlign: {
                            xs: 'left',
                            md: 'right',
                        },
                        fontFamily: 'DM Sans',
                        fontWeight: '700',
                        color: '#1A1421',
                        letterSpacing: '2px'
                    }}
                    variant='h4'
                >
                    ABOUT
                </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
                <Typography 
                    style={{ fontFamily: 'DM Sans', margin: '0', paddingBottom: '20px' }}
                    align='left'
                >
                    CS Kickoff is a free, multi-day program from Monday, August 18, 2025 to Wednesday, August 20, 2025 created to inspire and empower beginners in technology. 

                    <br></br>
                    <br></br>

                    Tailored specifically for incoming students at the University of Florida who have a passion for math, science, or engineering, our program provides participants a unique opportunity to get a head-start on the world of Computer Science before the fall semester begins.

                    <br></br>
                    <br></br>

                    Our goal is to cultivate a diverse and inclusive tech community by providing hands-on learning opportunities, mentorship, and exposure to industry practices.
 
                </Typography>
            </Grid>
            
            
            <Grid item xs={12} md={4}>
                <Typography
                    sx={{
                        textAlign: {
                            xs: 'left',
                            md: 'right',
                        },
                        fontFamily: 'DM Sans',
                        fontWeight: '700',
                        color: '#1A1421',
                        letterSpacing: '2px'
                    }}
                    variant='h4'
                >
                    OUTCOMES
                </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
                <Typography 
                    style={{ fontFamily: 'DM Sans', margin: '0', paddingBottom: '20px' }}
                    align='left'
                >
                    Throughout the program, students will:
                    <List sx={{ listStyleType: 'disc', pl: 4, pt: 0 }}>
                        <ListItem sx={{ display: 'list-item', pb: 0 }}>Gain programming skills</ListItem>
                        <ListItem sx={{ display: 'list-item', pb: 0 }}>Explore tech domains</ListItem>
                        <ListItem sx={{ display: 'list-item', pb: 0 }}>Connect with industry leaders</ListItem>
                        <ListItem sx={{ display: 'list-item', pb: 0 }}>Discover life at the University of Florida</ListItem>
                        <ListItem sx={{ display: 'list-item', pb: 0 }}>Build a supportive network</ListItem>

                    </List>
                </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
                <Typography
                    sx={{
                        textAlign: {
                            xs: 'left',
                            md: 'right',
                        },
                        fontFamily: 'DM Sans',
                        fontWeight: '700',
                        color: '#1A1421',
                        letterSpacing: '2px'
                    }}
                    variant='h4'
                >
                    WHO YOU ARE
                </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
                    <Typography 
                        style={{ fontFamily: 'DM Sans', margin: '0', paddingBottom: '20px' }}
                        align='left'
                    >
                        <List sx={{ listStyleType: 'disc', pl: 4, pt: 0 }}>
                            <ListItem sx={{ display: 'list-item', pb: 0 }}>You are an incoming first year at the University of Florida who is excited about technology and engineering.</ListItem>
                            <ListItem sx={{ display: 'list-item', pb: 0 }}>You are interested in acquiring foundational programming skills and gaining hands-on experience in coding.</ListItem>
                            <ListItem sx={{ display: 'list-item', pb: 0 }}>You want to expand your knowledge in technology and engineering through immersive and hands-on experiences.</ListItem>
                            <ListItem sx={{ display: 'list-item', pb: 0 }}>You are seeking a supportive and inclusive community at the University of Florida.</ListItem>
                            <ListItem sx={{ display: 'list-item', pb: 0 }}>You want to have fun!</ListItem>
                        </List>
                    </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
                <Typography
                    sx={{
                        textAlign: {
                            xs: 'left',
                            md: 'right',
                        },
                        fontFamily: 'DM Sans',
                        fontWeight: '700',
                        color: '#1A1421',
                        letterSpacing: '2px'
                    }}
                    variant='h4'
                >
                    EVENTS
                </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
                    <Typography 
                        style={{ fontFamily: 'DM Sans', margin: '0', paddingBottom: '20px' }}
                        align='left'
                    >
                        Events you can expect:
                        <List sx={{ listStyleType: 'disc', pl: 4, pt: 0 }}>
                            <ListItem sx={{ display: 'list-item', pb: 0 }}><strong>Workshops & Labs:</strong> In our workshops, you will be able to get exposure and hands-on experience in Python, machine learning, and Arduino boards! This is a great opportunity to learn and get a good foundation of both sides of the tech world, software and hardware. Whether you are a beginner or looking to enhance your skills, our workshops are designed to cater to all levels.</ListItem>
                            <ListItem sx={{ display: 'list-item', pb: 0 }}><strong>Socials:</strong> You will be able to participate in many fun activities that will allow you to get to know other attendees and CSK members. This is a great way to start building your network of connections and friends who can help support you through the years and become a community you can rely on.</ListItem>
                            <ListItem sx={{ display: 'list-item', pb: 0 }}><strong>Panels:</strong> You will be able to interact with and ask questions to our various speakers. We will feature engineers discussing industry opportunities, professors sharing their research and offering preparation tips, upper-classmen answering college life questions, and representatives from various organizations helping you explore where you fit best. </ListItem>
                        </List>                    
                    </Typography>
            </Grid>
            
            <Grid item xs={12} md={4}>
                <Typography
                    sx={{
                        textAlign: {
                            xs: 'left',
                            md: 'right',
                        },
                        fontFamily: 'DM Sans',
                        fontWeight: '700',
                        color: '#1A1421',
                        letterSpacing: '2px'
                    }}
                    variant='h4'
                >
                    RECAP
                </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
                <Typography 
                    style={{ fontFamily: 'DM Sans', margin: '0', paddingBottom: '20px' }}
                    align='left'
                >
                    During our Summer 2024 program, we welcomed an incredible group of young women to UF! We dived into student panels, hands-on workshops, and inspiring talks from industry leaders and a UF professor. Our attendees also explored tech-related clubs, connected at socials, and so much more! 🫶

                    <br></br>
                    <br></br>

                    Here's what the stats looked like:
                    <List sx={{ listStyleType: 'disc', pl: 4, pt: 0 }}>
                        <ListItem sx={{ display: 'list-item', pb: 0 }}>3 days</ListItem>
                        <ListItem sx={{ display: 'list-item', pb: 0 }}>20 participants</ListItem>
                        <ListItem sx={{ display: 'list-item', pb: 0 }}>6 workshops</ListItem>
                        <ListItem sx={{ display: 'list-item', pb: 0 }}>3 panels</ListItem>
                    </List>

                    Here’s to building a brighter tech future together! 🚀👩‍💻
                </Typography>
            </Grid>

        </Grid>
    </div>
    );
}

export default Program;
