import * as React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Box, Typography, Card, CardContent, CircularProgress, Alert } from '@mui/material';
import { apiGet, apiGetBlob } from '../../api.js';

const cardStyle = {
  borderRadius: '18px',
  boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px',
  fontFamily: 'DM Sans',
};

export default function CheckinDisplay() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const eventId = searchParams.get('event');

  const [loading, setLoading] = React.useState(true);
  const [event, setEvent] = React.useState(null);
  const [qrUrl, setQrUrl] = React.useState('');
  const [error, setError] = React.useState('');

  React.useEffect(() => {
    let cancelled = false;
    let objectUrl = '';

    apiGet('/api/admin/me')
      .then(() => apiGet('/api/events'))
      .then((events) => {
        const match = events.find((e) => String(e.id) === String(eventId));
        if (!match) {
          throw new Error('Event not found');
        }
        if (cancelled) return null;
        setEvent(match);
        return apiGetBlob(`/api/events/${eventId}/qrcode`);
      })
      .then((blob) => {
        if (!blob || cancelled) return;
        objectUrl = URL.createObjectURL(blob);
        setQrUrl(objectUrl);
      })
      .catch((err) => {
        if (cancelled) return;
        if (err.status === 401) {
          navigate('/admin/login');
          return;
        }
        setError(err.message || 'Could not load check-in display');
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, [eventId, navigate]);

  return (
    <Box sx={{ padding: 4, display: 'flex', justifyContent: 'center' }}>
      {!eventId ? (
        <Alert severity="error" sx={{ fontFamily: 'DM Sans' }}>
          No event specified.
        </Alert>
      ) : loading ? (
        <CircularProgress sx={{ color: '#BE9BCB' }} />
      ) : error ? (
        <Alert severity="error" sx={{ fontFamily: 'DM Sans' }}>
          {error}
        </Alert>
      ) : (
        <Card style={cardStyle} sx={{ width: '100%', maxWidth: 640 }}>
          <CardContent style={{ margin: '16px', textAlign: 'center' }}>
            <Typography
              variant="h3"
              sx={{ fontFamily: 'DM Sans', color: '#1A1421', fontWeight: '700', letterSpacing: '2px' }}
            >
              {event.name}
            </Typography>
            <Typography variant="body1" sx={{ fontFamily: 'DM Sans', pt: 1, pb: 3 }}>
              Scan to check in &middot; {event.points} point{event.points === 1 ? '' : 's'}
            </Typography>
            {qrUrl && (
              <img
                src={qrUrl}
                alt={`Check-in QR code for ${event.name}`}
                style={{ width: '100%', maxWidth: 480, height: 'auto' }}
              />
            )}
          </CardContent>
        </Card>
      )}
    </Box>
  );
}
