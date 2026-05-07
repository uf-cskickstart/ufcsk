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
            <div style={{ display: 'flex', justifyContent: 'center', padding: '24px 24px 0', marginBottom: '32px' }}>
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
