import * as React from 'react';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { Button, Typography } from '@mui/material';

function Program() {
  return (
    <div>
      <img src="https://placehold.co/1600x500" alt="CS Kickstart logo with text." style={{ width: '100%' }}/>

      {/* <Typography
        sx={{
            fontFamily: 'DM Sans',
            fontWeight: '700',
            color: '#1A1421',
            letterSpacing: '2px'
        }}
        variant='h4'
        pt={3}
      >
        Join our Computer Science Exploration Program!
      </Typography> */}

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
                    CS Kickstart is a free, multi-day program created to inspire and empower women in technology. 

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
                            <ListItem sx={{ display: 'list-item', pb: 0 }}>Programming labs</ListItem>
                            <ListItem sx={{ display: 'list-item', pb: 0 }}>Tech info sessions</ListItem>
                            <ListItem sx={{ display: 'list-item', pb: 0 }}>Women in tech panels</ListItem>
                            <ListItem sx={{ display: 'list-item', pb: 0 }}>Social activities</ListItem>
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
            <Grid item xs={12} md={6}>
                    <Typography 
                        style={{ fontFamily: 'DM Sans', margin: '0', paddingBottom: '20px' }}
                        align='left'
                    >
                        Applications are now open!
                    </Typography>
                    <div style={{ textAlign: 'left' }}>
                        <Button 
                            className="button-text" 
                            variant="contained" 
                            size="large"
                            style={{ backgroundColor: '#fea5b0', boxShadow: 'none', fontFamily: 'DM Sans' }} 
                            href='https://calendar.google.com/calendar/u/0/embed?src=5752be03c754ed016c1b81e79593b17a3202fbd62350e032971daf04cf18cc7a@group.calendar.google.com&ctz=America/New_York'
                            target='_blank'
                            rel="noreferrer"
                        >
                                APPLY NOW
                        </Button>
                    </div>
            </Grid>
            

        </Grid>
    </div>
  );
}

export default Program;