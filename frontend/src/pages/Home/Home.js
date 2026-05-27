import * as React from 'react';
import { useEffect, useState } from 'react';
import Banner from '../../assets/banner-image.png';
import ApplyCSK26 from '../../assets/ApplyCSK26.png';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Event from '../../components/Event/Event.js';
import { Button, Typography } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro';
import { Link } from 'react-router-dom';
import './Home.css';
import { gapi } from 'gapi-script'
import Bloomberg from '../../assets/Bloomberg.png';
import TI from '../../assets/TI.png';

const calendarID = process.env.REACT_APP_CALENDAR_ID
const apiKey = process.env.REACT_APP_GOOGLE_API_KEY

const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString(undefined, options);
};

const formatTime = (timeString) => {
    const time = new Date(timeString);
    const options = { hour: 'numeric', minute: '2-digit', hour12: true };
    return time.toLocaleTimeString(undefined, options);
};

const fetchEvents = (calendarID, apiKey, params) => {
    return gapi.client
        .request({
            path: `https://www.googleapis.com/calendar/v3/calendars/${calendarID}/events`,
            params: params,
        })
        .then((response) => response.result.items)
        .catch((err) => {
            console.error("Error fetching events:", err);
            return [];
        });
};

const getEvents = async (calendarID, apiKey, setEvents) => {
    function initiate() {
        gapi.client.init({ apiKey: apiKey }).then(async () => {
            const now = new Date().toISOString();

            // Fetch upcoming events
            let upcomingEvents = await fetchEvents(calendarID, apiKey, {
                maxResults: 3,
                orderBy: 'startTime',
                singleEvents: true,
                timeMin: now,
            });

            // If fewer than 3 upcoming events, fetch recent past events
            if (upcomingEvents.length < 3) {
                const pastEvents = await fetchEvents(calendarID, apiKey, {
                    maxResults: 2500, // Fetch more than needed to ensure you get recent ones
                    orderBy: 'startTime',
                    singleEvents: true,
                    timeMax: now,
                });

                // Take the most recent past events
                const recentPastEvents = pastEvents.slice(- (3 - upcomingEvents.length));

                // Combine and sort upcoming and recent past events
                upcomingEvents = [...upcomingEvents, ...recentPastEvents].sort(
                    (a, b) => new Date(a.start.dateTime || a.start.date) - new Date(b.start.dateTime || b.start.date)
                );
            }

            console.log(upcomingEvents);
            setEvents(upcomingEvents);
        });
    }
    gapi.load('client', initiate);
};

const stripHtml = (html) => {
  const tmp = document.createElement('div');
  tmp.innerHTML = html;
  return tmp.textContent || tmp.innerText || '';
};
function Home() {
    const [events, setEvents] = useState([])
    
    useEffect(() => {
        getEvents(calendarID, apiKey, setEvents)
    }, [])

    return (
        <div>
            <img src={ Banner } alt="CS Kickoff Applications Open with images from CSK Kickoff." style={{ width: '100%' }}/>

            <Box
                display="flex"
                flexDirection={{ xs: 'column', md: 'row' }}
                alignItems="center"
                justifyContent="center"
                gap={6}
                px={{ xs: 4, md: 8 }}
                py={{ xs: 4, md: 6 }}
                mx={{ xs: 2, md: 'auto' }}
                mt={{ xs: 2, md: 4 }}
                mb={2}
                maxWidth="900px"
                sx={{
                    backgroundColor: '#fff5f7',
                    borderRadius: '20px',
                    boxShadow: 'rgba(149, 157, 165, 0.15) 0px 8px 32px',
                }}
            >
                <img
                    src={ApplyCSK26}
                    alt="Apply for CS Kickoff 2026"
                    style={{
                        maxWidth: '320px',
                        width: '100%',
                        height: 'auto',
                        borderRadius: '16px',
                        boxShadow: 'rgba(149, 157, 165, 0.25) 0px 8px 32px',
                        flexShrink: 0,
                    }}
                />
                <Box textAlign="left">
                    <Typography variant="h5" sx={{ fontFamily: 'DM Sans', fontWeight: '700', color: '#1A1421', mb: 2 }}>
                        CS Kickoff 2026 Applications Are Open!
                    </Typography>
                    <Typography style={{ fontFamily: 'DM Sans', marginBottom: '16px' }}>
                        Are you an incoming freshman or transfer student at the University of Florida interested in any aspect of technology? Consider applying for CS Kickoff — a <strong>FREE</strong> introductory program designed to create a welcoming environment for beginners, non-technical majors, and underrepresented groups in tech.
                    </Typography>
                    <Typography style={{ fontFamily: 'DM Sans', marginBottom: '16px' }}>
                        From August 17–19, 2025, you'll explore domains of CS through hands-on workshops, make friends at social events, and learn from incredible panelists. All meals are catered and attendees can expect shirts, gifts, and connections to our amazing corporate sponsors!
                    </Typography>
                    <Typography style={{ fontFamily: 'DM Sans', marginBottom: '24px' }}>
                        Refer a friend who applies and you'll be entered into a raffle for a <strong>$15 gift card</strong>. Applications close <strong>July 19th</strong>.
                    </Typography>
                    <Button
                        variant="contained"
                        size="large"
                        href="https://forms.gle/9Vkd9xnNu7Fvkz9F8"
                        target="_blank"
                        rel="noreferrer"
                        style={{ backgroundColor: '#fea5b0', boxShadow: 'none', fontFamily: 'DM Sans', fontWeight: '700' }}
                    >
                        Apply Now
                    </Button>
                </Box>
            </Box>

            <Grid
                container 
                rowSpacing={{ xs: 2, md: 4 }} 
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
                        MISSION
                    </Typography>
                </Grid>
                <Grid item xs={12} md={6} style={{ paddingBottom: '20px' }}>
                    <Typography 
                        style={{ fontFamily: 'DM Sans', margin: '0', paddingBottom: '20px' }}
                        align='left'
                    >
                        CS Kickstart at the University of Florida strives to offer a welcoming environment for any beginners, non-technical majors, and underrepresented groups who seek to pursue careers in technology, inspiring confidence and creativity in our members.
                        
                        <br></br>
                        <br></br>

                        CS Kickoff is a multi-day introductory program for incoming students at the University of Florida who are interested in applying computer science in various disciplines. We offer this program free of charge to students. Participants come to campus a week before the fall semester to gain hands-on experience in programming and explore various domains of computer science and engineering.
                    </Typography>
                    <div style={{ textAlign: 'center' }}>
                        <Button 
                            component={Link}
                            to="/program"
                            className="button-text" 
                            variant="contained" 
                            size="large"
                            style={{ backgroundColor: '#fea5b0', boxShadow: 'none', fontFamily: 'DM Sans' }} 
                        >
                                LEARN MORE
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
                            fontWeight: '700',
                            color: '#1A1421',
                            letterSpacing: '2px'
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
                                title={event.summary}
                                description={
                                <div className="event-description">
                                    {stripHtml(event.description).split('\n').map((line, i) => (
                                    <span key={i}>
                                        {line}
                                        <br />
                                    </span>
                                    ))}
                                </div>
                                }

                                // description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nullam ac tortor vitae purus faucibus ornare."
                                date={event.start.dateTime ? formatDate(event.start.dateTime) : formatDate(event.start.date)}
                                time={event.start.dateTime ? formatTime(event.start.dateTime) : null}
                                location={event.location ? event.location : null}
                                // location="McCarty Hall C, Gainesville, FL 32603, USA"
                                link={event.htmlLink}
                            />
                            </Grid>
                        ))}
                    </Grid>
                    <div style={{ textAlign: 'center' }}>
                        <Button 
                            className="button-text" 
                            variant="contained" 
                            size="large"
                            style={{ marginTop: '20px', backgroundColor: '#fea5b0', boxShadow: 'none', fontFamily: 'DM Sans' }} 
                            href='https://calendar.google.com/calendar/u/0/embed?src=5752be03c754ed016c1b81e79593b17a3202fbd62350e032971daf04cf18cc7a@group.calendar.google.com&ctz=America/New_York'
                            target='_blank'
                            rel="noreferrer"
                        >
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
                            fontWeight: '700',
                            color: '#1A1421',
                            letterSpacing: '2px'
                        }}
                        variant='h4'
                    >
                            SPONSORS
                    </Typography>
                </Grid>
                <Grid item xs={12} md={6} style={{ paddingBottom: '20px' }}>
                    <Typography 
                        style={{ fontFamily: 'DM Sans', margin: '0', paddingBottom: '20px' }}
                        align='left'
                    >
                        Thank you to our sponsors for their support in making CS Kickstart possible! We are grateful for your generosity and commitment to empowering students in their pursuit of knowledge and skills in computer science. Your contributions help us create a vibrant learning environment and provide valuable resources for our participants.
                    </Typography>
                   <div
  style={{
    display: 'flex',
    flexWrap: 'wrap', // allow wrapping on small screens
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
    }}
  />
  <img
    src={TI}
    alt="TI logo"
    style={{
      maxWidth: '40%',
      height: 'auto',
      objectFit: 'contain',
    }}
  />
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
                            fontWeight: '700',
                            color: '#1A1421',
                            letterSpacing: '2px'
                        }}
                        variant='h4'
                    >
                        KEEP IN TOUCH
                    </Typography>
                </Grid>
                <Grid item xs={12} md={6} style={{ paddingBottom: '20px' }}>
                    <Typography style={{ fontFamily: 'DM Sans', textAlign: 'left', margin: '0', paddingBottom: '8px' }} variant='h6'>
                        <FontAwesomeIcon icon={icon({name: 'instagram', style: 'brands'})} style={{paddingRight: '15px'}} />
                        <a href="https://www.instagram.com/uf.cskickstart/" style={{ textDecoration: 'none', color: 'inherit', borderBottom: '2px solid #ffe45e'}} target='_blank' rel="noreferrer">
                            uf.cskickstart
                        </a>
                    </Typography>
                    <Typography style={{ fontFamily: 'DM Sans', textAlign: 'left', margin: '0', paddingBottom: '8px' }} variant='h6'>
                        <FontAwesomeIcon icon={icon({name: 'linkedin', style: 'brands'})} style={{paddingRight: '15px'}} />
                        <a href="https://www.linkedin.com/company/cs-kickstart-at-uf" style={{ textDecoration: 'none', color: 'inherit', borderBottom: '2px solid #ffe45e' }} target='_blank' rel="noreferrer">
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