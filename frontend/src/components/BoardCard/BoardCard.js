import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

export default function BoardCard({ name, position, blurb, avatar, linkedin }) {
  return (
    <Card style={{ boxShadow: 'none', borderRadius: '30px', backgroundColor: 'transparent' }}>
      <CardMedia
        sx={{ height: 400, borderRadius: '30px' }}
        component="img"
        src={ '/avatars/' + avatar }
        title="avatar"
        alt="avatar"
      />
      <CardContent>
        <Grid container style={{ paddingBottom: '15px'}}>
            <Grid item xs={12} md={12}>
                <Typography 
                  gutterBottom 
                  variant="h5" 
                  mb={1} 
                  p={0} 
                  component="div" 
                  style={{ fontFamily: 'DM Sans', fontWeight: '500', textAlign: 'left' }}
                >
                  <a href={ linkedin } style={{ textDecoration: 'none', color: 'inherit', borderBottom: '2px solid #ffe45e' }} target='_blank' rel="noreferrer">
                    { name }
                  </a>
                    
                </Typography>
            </Grid>
            <Grid item xs={12} md={12}>
              <Typography variant="body2" color="text.secondary" style={{ fontFamily: 'DM Sans', textAlign: 'left' }}>
                { blurb }
              </Typography>
            </Grid>
        </Grid>
        <div style={{ textAlign: 'left' }}>
          <Button 
              variant="outlined" 
              size="medium" 
              sx={{ fontFamily: 'DM Sans', color: '#fea5b0', borderColor: '#fdc7cc', borderRadius: '12px', pointerEvents: 'none', width: '100%' }}
          >
              { position }
          </Button>
        </div>
        
      </CardContent>
    </Card>
  );
}