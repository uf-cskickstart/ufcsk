import * as React from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  CircularProgress,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from '@mui/material';
import { apiGet } from '../../api.js';

const cardStyle = {
  borderRadius: '18px',
  boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px',
  fontFamily: 'DM Sans',
};

function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    timeZone: 'UTC',
  });
}

export default function Profile() {
  const [loading, setLoading] = React.useState(true);
  const [profile, setProfile] = React.useState(null);

  React.useEffect(() => {
    let cancelled = false;
    apiGet('/api/profile')
      .then((data) => {
        if (!cancelled) setProfile(data);
      })
      .catch(() => {
        if (!cancelled) setProfile(null);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div>
      <Typography
        variant="h3"
        pt={2}
        pl={{ xs: 2, md: 4 }}
        sx={{ fontFamily: 'DM Sans', textAlign: 'left', color: '#1A1421', fontWeight: '700', letterSpacing: '3px' }}
      >
        MY POINTS
      </Typography>

      <Box sx={{ padding: 3, display: 'flex', justifyContent: 'center' }}>
        {loading ? (
          <CircularProgress sx={{ color: '#BE9BCB' }} />
        ) : !profile ? (
          <Card style={cardStyle} sx={{ width: '100%', maxWidth: 480 }}>
            <CardContent style={{ margin: '8px' }}>
              <Typography variant="h5" sx={{ fontFamily: 'DM Sans', color: '#1A1421', fontWeight: '700' }}>
                No check-ins yet
              </Typography>
              <Typography variant="body2" sx={{ fontFamily: 'DM Sans', pt: 1 }}>
                Scan an event's QR code to check in and start earning points.
              </Typography>
            </CardContent>
          </Card>
        ) : (
          <Box sx={{ width: '100%', maxWidth: 720 }}>
            <Card style={cardStyle}>
              <CardContent style={{ margin: '8px', textAlign: 'center' }}>
                <Typography variant="h6" sx={{ fontFamily: 'DM Sans' }}>
                  {profile.full_name}
                </Typography>
                <Typography variant="h2" sx={{ fontFamily: 'DM Sans', color: '#BE9BCB', fontWeight: '700', pt: 1 }}>
                  {profile.total_points}
                </Typography>
                <Typography variant="body2" sx={{ fontFamily: 'DM Sans' }}>
                  total points
                </Typography>
              </CardContent>
            </Card>

            <Card style={cardStyle} sx={{ mt: 3 }}>
              <CardContent style={{ margin: '8px' }}>
                <Typography variant="h6" sx={{ fontFamily: 'DM Sans', color: '#1A1421', fontWeight: '700', pb: 1 }}>
                  Events Attended
                </Typography>
                {profile.events.length === 0 ? (
                  <Typography variant="body2" sx={{ fontFamily: 'DM Sans' }}>
                    No events yet.
                  </Typography>
                ) : (
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell sx={{ fontFamily: 'DM Sans', fontWeight: '700' }}>Event</TableCell>
                        <TableCell sx={{ fontFamily: 'DM Sans', fontWeight: '700' }}>Date</TableCell>
                        <TableCell sx={{ fontFamily: 'DM Sans', fontWeight: '700' }} align="right">
                          Points
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {profile.events.map((event) => (
                        <TableRow key={event.id}>
                          <TableCell sx={{ fontFamily: 'DM Sans' }}>{event.name}</TableCell>
                          <TableCell sx={{ fontFamily: 'DM Sans' }}>{formatDate(event.date)}</TableCell>
                          <TableCell sx={{ fontFamily: 'DM Sans' }} align="right">
                            {event.points}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          </Box>
        )}
      </Box>
    </div>
  );
}
