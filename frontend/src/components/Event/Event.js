import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import './Event.css';

export default function Event({ title, details, description, CTA, link }) {
  return (
    <Card style={{ fontFamily: 'DM Sans', textAlign: 'left', borderRadius: '18px', boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px' }}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div" style={{ fontFamily: 'DM Sans' }}>
          { title }
        </Typography>
        <Typography gutterBottom variant="body" component="div" style={{ color: '#BE9BCB' }}>
          { details }
        </Typography>
        <Typography variant="body2" color="text.secondary" style={{ fontFamily: 'DM Sans' }}>
          { description }
        </Typography>
      </CardContent>
      {/* 
        <CardActions>
            <Button className='button-text' size="small" href={ link }>
                { CTA }
            </Button>
        </CardActions>
      */}
    </Card>
  );
}