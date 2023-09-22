import * as React from 'react';
import Banner from '../../assets/banner-image.png';
import Grid from '@mui/material/Grid';
import Event from '../../components/Event/Event.js';
import { Button, Typography } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro';
import './Home.css';

function Home() {
    const events = [
        {
            title: "Pool Social",
            description:
              "Join us and a ton of other awesome clubs for a pool party social at Lexington Crossing Clubhouse!",
            details: "Lexington Clubhouse | Sept. 22, 3 pm",
        },
        {
            title: "Hello CSK & Friends Social",
            description:
              "We’ll be making friendship bracelets, coloring, playing games, and doing a snack potluck! Come hang out, make new friends, and find the Kuromi to your My Melody at the Plaza of the Americas! And if you want, bring your favorite snack to share with others or for yourself!",
            details: "The Plaza of Americas | Sept. 8, 5-7 pm",
        },
        {
            title: "CSK x ACM Demystifying CS Workshop",
            description:
              "Learn about classes, resume building, and other resources -- tailored to the UF experience!",
            details: "McCarty Hall C Room 0100 | Sept. 7, 6:30 pm",
        }, 
    ];

    return (
        <div>
            <img src={ Banner } alt="CS Kickstart logo with text." style={{ width: '100%' }}/>

            <Grid container rowSpacing={{ xs: 1, md: 4 }} columnSpacing={8} sx={{ px: 3, py: 4 }}>
                <Grid item xs={12} md={4}>
                    <Typography
                        sx={{
                            textAlign: {
                            xs: 'left',
                            md: 'right',
                            },
                            fontFamily: 'DM Sans',
                            fontWeight: '700'
                        }}
                        variant='h4'
                    >
                        MISSION
                    </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                    <p style={{ textAlign: 'left', margin: '0', paddingBottom: '20px' }}>
                        <strong>CS Kickstart at the University of Florida aims to generate more pursuit of technology amongst women to improve the lack of representation and access to
                        the tech industry.</strong> 
                        
                        <br></br>
                        <br></br>

                        CS Kickstart will be a <strong>multi-day introductory program</strong> for incoming women at the University of Florida who are interested in <strong>math, science, or
                        engineering.</strong> Participants come to UF a week before the fall semester to gain hands-on experience in programming and explore various domains of computer science and engineering through activities.
                    </p>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Typography
                        sx={{
                            textAlign: {
                            xs: 'left',
                            md: 'right',
                            },
                            fontFamily: 'DM Sans',
                            fontWeight: '700'
                        }}
                        variant='h4'
                    >
                            GET INVOLVED
                    </Typography>
                </Grid>
                <Grid item xs={12} md={6} style={{ paddingBottom: '20px' }}>
                    {/* Iterate through recent past and upcoming events */}
                    <Grid container rowSpacing={{ xs: 2}}>
                        {events.map((event, index) => (
                            <Grid item xs={12} key={index}>
                            <Event
                                title={event.title}
                                description={event.description}
                                details={event.details}
                                date={event.date}
                                CTA={event.CTA}
                            />
                            </Grid>
                        ))}
                    </Grid>
                    <div style={{ textAlign: 'left' }}>
                        <Button 
                            className="button-text" 
                            variant="contained" 
                            style={{ marginTop: '20px', backgroundColor: '#BE9BCB', boxShadow: 'none' }} 
                            href='https://calendar.google.com/calendar/u/0/embed?src=5752be03c754ed016c1b81e79593b17a3202fbd62350e032971daf04cf18cc7a@group.calendar.google.com&ctz=America/New_York'>
                                view full calendar
                        </Button>
                    </div>
                </Grid>

                <Grid item xs={12} md={4}>
                    <Typography
                        sx={{
                            textAlign: {
                            xs: 'left',
                            md: 'right',
                            },
                            fontFamily: 'DM Sans',
                            fontWeight: '700'
                        }}
                        variant='h4'
                    >
                        KEEP IN TOUCH
                    </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Typography style={{ fontFamily: 'DM Sans', textAlign: 'left', margin: '0', paddingBottom: '8px' }} variant='h6'>
                        <FontAwesomeIcon icon={icon({name: 'instagram', style: 'brands'})} style={{paddingRight: '15px'}} />
                        <a href="https://www.instagram.com/uf.cskickstart/" style={{ textDecoration: 'none', color: 'inherit', borderBottom: '2px solid #ffe45e'}}>
                            uf.cskickstart
                        </a>
                    </Typography>
                    <Typography style={{ fontFamily: 'DM Sans', textAlign: 'left', margin: '0', paddingBottom: '8px' }} variant='h6'>
                        <FontAwesomeIcon icon={icon({name: 'linkedin', style: 'brands'})} style={{paddingRight: '15px'}} />
                        <a href="https://www.linkedin.com/company/cs-kickstart-at-uf" style={{ textDecoration: 'none', color: 'inherit', borderBottom: '2px solid #ffe45e' }}>
                            CS Kickstart at UF
                        </a>
                    </Typography>
                    <Typography style={{ fontFamily: 'DM Sans', textAlign: 'left', margin: '0', paddingBottom: '0' }} variant='h6'>
                        <FontAwesomeIcon icon={icon({name: 'envelope', style: 'solid'})} style={{paddingRight: '15px'}} />
                        csk.uf.president@gmail.com
                    </Typography>
                </Grid>
            </Grid>
        </div>
        
    );
}

export default Home;