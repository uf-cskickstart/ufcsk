import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import './Event.css';

export default function Event({ title, details, description, CTA, link }) {
  return (
    <Card className='card-shadow' style={{ textAlign: 'left' }}>
      <CardContent>
        <Typography className='card-type' gutterBottom variant="h5" component="div">
          { title }
        </Typography>
        <Typography className='card-type' gutterBottom variant="body" component="div" style={{color: '#BE9BCB'}}>
          { details }
        </Typography>
        <Typography className='card-type' variant="body2" color="text.secondary">
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