import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

export default function BoardCard({ name, position, blurb, avatar }) {
  return (
    <Card style={{ boxShadow: 'none', borderRadius: '30px' }}>
      <CardMedia
        sx={{ height: 400, borderRadius: '30px' }}
        component="img"
        src={ '/avatars/' + avatar }
        title="avatar"
        alt="avatar"
      />
      <CardContent>
        <Grid container style={{ paddingBottom: '15px'}} >
            <Grid item xs={12} md={12}>
                <Typography gutterBottom variant="h5" component="div" style={{ fontFamily: 'DM Sans', textAlign: 'left' }}>
                    { name }
                </Typography>
            </Grid>
            <Grid item xs={12} md={12}>
                <div style={{ textAlign: 'left' }}>
                    <Button 
                        variant="outlined" 
                        size="medium" 
                        sx={{ fontFamily: 'DM Sans', color: '#BE9BCB', borderColor: '#BE9BCB', borderRadius: '12px', pointerEvents: 'none', width: '100%' }}
                    >
                        { position }
                    </Button>
                </div>
                
            </Grid>
        </Grid>
        <Typography variant="body2" color="text.secondary" style={{ fontFamily: 'DM Sans', textAlign: 'left' }}>
          { blurb }
        </Typography>
      </CardContent>
    </Card>
  );
}