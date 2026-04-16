import * as React from 'react';
import Grid from '@mui/material/Grid';
import { Button, Typography } from '@mui/material';
import Bloomberg from '../../assets/Bloomberg.png';
import TI from '../../assets/TI.png';
import sponsorPackage from '../../assets/CS-Kickstart-Sponsorship-Package.pdf';

function Sponsors() {
    return (
        <div>
            {/* Embedded PDF */}
            <div style={{ display: 'flex', justifyContent: 'center', padding: '24px 24px 0' }}>
                <iframe
                    src={sponsorPackage}
                    title="CS Kickstart Sponsorship Package"
                    style={{ width: '760px', maxWidth: '100%', height: '80vh', border: 'none', borderRadius: '4px' }}
                />
            </div>

            <Grid
                container
                rowSpacing={{ xs: 2, md: 4 }}
                columnSpacing={8}
                px={3}
                py={{ xs: 2, md: 4 }}
            >
                {/* Our Sponsors */}
                <Grid item xs={12} md={4}>
                    <Typography
                        sx={{
                            textAlign: { xs: 'left', md: 'right' },
                            fontFamily: 'DM Sans',
                            fontWeight: '700',
                            color: '#1A1421',
                            letterSpacing: '2px',
                        }}
                        variant="h4"
                    >
                        OUR SPONSORS
                    </Typography>
                </Grid>
                <Grid item xs={12} md={6} style={{ paddingBottom: '20px' }}>
                    <Typography
                        style={{ fontFamily: 'DM Sans', margin: '0', paddingBottom: '20px' }}
                        align="left"
                    >
                        Thank you to our sponsors for their support in making CS Kickstart possible! We are grateful for your generosity and commitment to empowering students in their pursuit of knowledge and skills in computer science. Your contributions help us create a vibrant learning environment and provide valuable resources for our participants.
                    </Typography>
                    <div
                        style={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '24px',
                            paddingBottom: '20px',
                        }}
                    >
                        <img
                            src={Bloomberg}
                            alt="Bloomberg logo"
                            style={{ maxWidth: '40%', height: 'auto', objectFit: 'contain' }}
                        />
                        <img
                            src={TI}
                            alt="TI logo"
                            style={{ maxWidth: '40%', height: 'auto', objectFit: 'contain' }}
                        />
                    </div>
                </Grid>

                {/* Sponsor Us */}
                <Grid item xs={12} md={4}>
                    <Typography
                        sx={{
                            textAlign: { xs: 'left', md: 'right' },
                            fontFamily: 'DM Sans',
                            fontWeight: '700',
                            color: '#1A1421',
                            letterSpacing: '2px',
                        }}
                        variant="h4"
                    >
                        SPONSOR US
                    </Typography>
                </Grid>
                <Grid item xs={12} md={6} style={{ paddingBottom: '20px' }}>
                    <Typography
                        style={{ fontFamily: 'DM Sans', margin: '0', paddingBottom: '20px' }}
                        align="left"
                    >
                        Interested in supporting CS Kickstart at UF? Your sponsorship helps us provide a free, immersive program for the next generation of women and underrepresented students in tech. Review our sponsorship package to learn about partnership opportunities and the impact your contribution makes.
                    </Typography>
                    <Button
                        className="button-text"
                        variant="contained"
                        size="large"
                        href="#"
                        style={{ backgroundColor: '#fea5b0', boxShadow: 'none', fontFamily: 'DM Sans' }}
                    >
                        Sponsor Us
                    </Button>
                </Grid>
            </Grid>
        </div>
    );
}

export default Sponsors;
