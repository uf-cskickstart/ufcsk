import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import './Event.css';

export default function Event({ title, date, time, description, location, link }) {
  return (
    <Card style={{ fontFamily: 'DM Sans', textAlign: 'left', borderRadius: '18px', boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px' }}>
      <CardContent style={{ margin: '8px' }}>
        <Typography gutterBottom variant="body" component="div" style={{ color: '#BE9BCB' }}>
          { date }{ time ? ` • ${time}` : '' }
        </Typography>
        <Typography gutterBottom variant="h5" component="div" style={{ fontFamily: 'DM Sans' }}>
          <a href={ link } style={{ textDecoration: 'none', color: 'inherit', borderBottom: '2px solid #ffe45e' }} target='_blank' rel="noreferrer">
            { title }
          </a>
        </Typography>
        <Typography gutterBottom variant="body" component="div" style={{ fontFamily: 'DM Sans' }}>
          <FontAwesomeIcon icon={ faLocationDot } style={{paddingRight: '8px'}} />
          { location }
        </Typography>
        <Typography variant="body2" color="text.secondary" style={{ fontFamily: 'DM Sans', paddingTop: '10px' }}>
          { description }
        </Typography>
      </CardContent>
    </Card>
  );
}