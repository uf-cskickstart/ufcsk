import * as React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Typography, Card, CardContent, CircularProgress, Chip, Button } from '@mui/material';
import { apiGet } from '../../api.js';
import PageHeader from '../../components/PageHeader/PageHeader.js';
import DateBadge from '../../components/DateBadge/DateBadge.js';

const INK = '#1A1421';
const PURPLE = '#BE9BCB';

const cardStyle = {
  borderRadius: '18px',
  boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px',
  fontFamily: 'DM Sans',
};

const font = { fontFamily: 'DM Sans' };

function StatCard({ label, value, highlight }) {
  return (
    <Card style={cardStyle} sx={{ flex: 1, minWidth: 0 }}>
      <CardContent sx={{ textAlign: 'center', py: 2, '&:last-child': { pb: 2 } }}>
        <Typography
          sx={{ ...font, fontSize: { xs: '2rem', sm: '2.5rem' }, fontWeight: 700, color: highlight ? PURPLE : INK, lineHeight: 1.2 }}
        >
          {value}
        </Typography>
        <Typography variant="body2" sx={{ ...font, color: 'text.secondary' }}>
          {label}
        </Typography>
      </CardContent>
    </Card>
  );
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
    <Box sx={{ padding: { xs: 2, sm: 3 }, display: 'flex', justifyContent: 'center' }}>
      <Box sx={{ width: '100%', maxWidth: 720 }}>
        <PageHeader eyebrow={profile ? `HI, ${profile.full_name.toUpperCase()}` : 'MEMBERS'} title="MY POINTS" />

        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
            <CircularProgress sx={{ color: PURPLE }} />
          </Box>
        ) : !profile ? (
          <Card style={cardStyle}>
            <CardContent style={{ margin: '8px' }} sx={{ textAlign: 'left' }}>
              <Typography variant="h6" sx={{ ...font, color: INK, fontWeight: '700' }}>
                You're not logged in
              </Typography>
              <Typography variant="body2" sx={{ ...font, color: 'text.secondary', pt: 0.5 }}>
                Log in with your name and UFID to see your points, or scan an event's QR code to check in.
              </Typography>
              <Button
                component={RouterLink}
                to="/login"
                variant="contained"
                size="large"
                className="button-text"
                style={{ backgroundColor: '#fea5b0', boxShadow: 'none', fontFamily: 'DM Sans', marginTop: '16px' }}
              >
                Log In
              </Button>
            </CardContent>
          </Card>
        ) : (
          <>
            <Box sx={{ display: 'flex', gap: { xs: 1.5, sm: 2 }, mb: 3 }}>
              <StatCard label="total points" value={profile.total_points} highlight />
              <StatCard label={profile.events.length === 1 ? 'event attended' : 'events attended'} value={profile.events.length} />
            </Box>

            <Card style={cardStyle}>
              <CardContent style={{ margin: '8px' }}>
                <Typography variant="h6" sx={{ ...font, color: INK, fontWeight: '700', textAlign: 'left', mb: 2 }}>
                  Events Attended
                </Typography>
                {profile.events.length === 0 ? (
                  <Typography variant="body2" sx={{ ...font, color: 'text.secondary', textAlign: 'left' }}>
                    No check-ins yet. Scan an event's QR code to start earning points.
                  </Typography>
                ) : (
                  profile.events.map((event) => (
                    <Box
                      key={event.id}
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 2,
                        p: 1.5,
                        mb: 1.5,
                        border: '1px solid rgba(0, 0, 0, 0.08)',
                        borderRadius: '14px',
                      }}
                    >
                      <DateBadge date={event.date} />
                      <Typography sx={{ ...font, fontWeight: 700, color: INK, flex: 1, minWidth: 0, textAlign: 'left', overflowWrap: 'anywhere' }}>
                        {event.name}
                      </Typography>
                      <Chip
                        label={`+${event.points} ${event.points === 1 ? 'pt' : 'pts'}`}
                        size="small"
                        sx={{ ...font, fontWeight: 700, backgroundColor: 'rgba(254, 165, 176, 0.35)', color: INK }}
                      />
                    </Box>
                  ))
                )}
              </CardContent>
            </Card>
          </>
        )}
      </Box>
    </Box>
  );
}
