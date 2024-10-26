import * as React from 'react';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Banner from '../../assets/cs-kickoff-banner.png';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Box from '@mui/material/Box';
import { Button, Typography } from '@mui/material';
import Recap1 from '../../assets/recap-1.jpg';
import Recap2 from '../../assets/recap-2.jpg';
import Recap3 from '../../assets/recap-3.jpg';
import Recap4 from '../../assets/recap-4.jpg';
import Recap5 from '../../assets/recap-5.jpg';

function Program() {
    const itemData = [
        {
            img: Recap4
        },
        {
            img: Recap1
        },
        {
            img: Recap2
        },
        {
            img: Recap3
        },
        {
            img: Recap5
        }
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
            cols={5} // Dynamically adjusts based on screen size
            rowHeight={{ xs: 200, sm: 300 }} // Smaller height for mobile
        >
            {itemData.map((item) => (
                <ImageListItem key={item.img}>
                    <img
                    srcSet={`${item.img}?w=300&h=300&fit=crop&auto=format&dpr=2 2x`}
                    src={`${item.img}?w=300&h=300&fit=crop&auto=format`}
                    alt={item.title}
                    loading="lazy"
                    />
                </ImageListItem>
            ))}
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
                    ABOUT
                </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
                <Typography 
                    style={{ fontFamily: 'DM Sans', margin: '0', paddingBottom: '20px' }}
                    align='left'
                >
                    CS Kickoff is a free, multi-day program from <i>Sunday, August 18, 2024 to Tuesday, August 20, 2024</i> created to inspire and empower women in technology. 

                    <br></br>
                    <br></br>

                    Tailored specifically for incoming women students at the University of Florida who have a passion for math, science, or engineering, our program provides participants a unique opportunity to get a head-start on the world of Computer Science before the fall semester begins.

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
                            <ListItem sx={{ display: 'list-item', pb: 0 }}><strong>Panels:</strong> You will be able to interact with and ask questions to our various speakers. We will feature engineers discussing industry opportunities, professors sharing their research and offering preparation tips, upper-classmen answering college life questions, and representatives from various organizations helping you explore where you fit best.</ListItem>
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
                    APPLY
                </Typography>
            </Grid>
            <Grid item xs={12} md={6} style={{ paddingBottom: '20px' }}>
                    <Typography 
                        style={{ fontFamily: 'DM Sans', margin: '0', paddingBottom: '20px' }}
                        align='left'
                    >
                        Applications for our summer 2025 program will be opening at the end of the spring 2025 semester.
                    </Typography>
                    {/* <div style={{ textAlign: 'left' }}>
                        <Button 
                            className="button-text" 
                            variant="contained" 
                            size="large"
                            style={{ backgroundColor: '#fea5b0', boxShadow: 'none', fontFamily: 'DM Sans' }} 
                            href='https://docs.google.com/forms/d/e/1FAIpQLSd-CRsPsEzvSC1gAufZ3XZ4ot60fjFSA3hmrdAIGSIMD-J7Hg/viewform'
                            target='_blank'
                            rel="noreferrer"
                        >
                                APPLY HERE
                        </Button>
                    </div> */}
            </Grid>
            

        </Grid>
    </div>
    );
}

export default Program;
