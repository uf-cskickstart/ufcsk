import * as React from 'react';
import Banner from '../../assets/banner-image.png';
import Grid from '@mui/material/Grid';
import Event from '../../components/Event/Event.js';
import { Button, Typography } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro';
import './Home.css';
// import gapi from 'gapi-client';

function Home() {

    /*
    const [events, setEvents] = useState([]);

    const CLIENT_ID = '334055811193-i58if9p5e3ee82q5vnmc70ul1jsjrhs4.apps.googleusercontent.com';
    const API_KEY = 'AIzaSyCh3Nunh2gek-Fu0-rHWeidJOPDThvSAro';
    const DISCOVERY_DOC = 'https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest';

    useEffect(() => {
        // Load Google API client library
        gapi.load('client', initClient);
    }, []);

    const initClient = () => {
        // Initialize Google API client
        gapi.client.init({
            apiKey: API_KEY,
            discoveryDocs: [DISCOVERY_DOC],
        }).then(() => {
            console.log("loading")
            // After the client is initialized, make API calls
            // loadEvents();
        }).catch(error => {
            console.error('Error initializing Google API client:', error);
        });
    };

    const loadEvents = () => {
        // Fetch events from Google Calendar API
        gapi.client.calendar.events.list({
            'calendarId': 'primary', // Use 'primary' for the primary calendar
            'timeMin': (new Date()).toISOString(), // Get events starting from the current time
            'maxResults': 3, // Get only the next 3 events
            'singleEvents': true,
            'orderBy': 'startTime'
        }).then(response => {
            const events = response.result.items;
            setEvents(events);
        }).catch(error => {
            console.error('Error loading events:', error);
        });
    };
    */


    const events = [
        {
            title: "Intro to Java Workshop",
            description:
              "Join us as we learn Intro to Java!",
            details: "Feb. 27, 5:30 pm",
        },
        {
            title: "Huey Magoo's Fundraiser",
            description:
              "Grab some food and socialize with your CSK community!",
            details: "Feb. 28, 5 pm",
        },
        {
            title: "Origami Flower Making Social",
            description:
              "Unwind and destress with some origami :)",
            details: "Feb. 28, 6 pm",
        }, 
    ];

    return (
        <div>
            <img src={ Banner } alt="CS Kickstart logo with text." style={{ width: '100%' }}/>

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
                        MISSION
                    </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Typography 
                        style={{ fontFamily: 'DM Sans', margin: '0', paddingBottom: '20px' }}
                        align='left'
                    >
                        CS Kickstart at the University of Florida aims to generate more pursuit of technology amongst women to improve the lack of representation and access to
                        the tech industry.
                        
                        <br></br>
                        <br></br>

                        CS Kickstart will be a multi-day introductory program for incoming women at the University of Florida who are interested in math, science, or
                        engineering.Participants come to UF a week before the fall semester to gain hands-on experience in programming and explore various domains of computer science and engineering through activities.
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
                    <div style={{ textAlign: 'center' }}>
                        <Button 
                            className="button-text" 
                            variant="contained" 
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
                        KEEP IN TOUCH
                    </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
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