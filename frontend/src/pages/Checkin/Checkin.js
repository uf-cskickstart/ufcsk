import * as React from 'react';
import { useSearchParams } from 'react-router-dom';
import { Box, Typography, TextField, Button, Card, CardContent, CircularProgress, Alert } from '@mui/material';
import { apiGet, apiPost } from '../../api.js';
import './Checkin.css';

const cardStyle = {
  borderRadius: '18px',
  boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px',
  fontFamily: 'DM Sans',
};

const buttonStyle = {
  backgroundColor: '#fea5b0',
  boxShadow: 'none',
  fontFamily: 'DM Sans',
};

export default function Checkin() {
  const [searchParams] = useSearchParams();
  const eventId = searchParams.get('event');
  const token = searchParams.get('token');

  const [loading, setLoading] = React.useState(true);
  const [participant, setParticipant] = React.useState(null);
  const [fullName, setFullName] = React.useState('');
  const [ufid, setUfid] = React.useState('');
  const [submitting, setSubmitting] = React.useState(false);
  const [formError, setFormError] = React.useState('');
  const [checkinResult, setCheckinResult] = React.useState(null);
  const [checkinError, setCheckinError] = React.useState('');

  React.useEffect(() => {
    let cancelled = false;
    apiGet('/api/profile')
      .then((data) => {
        if (!cancelled) setParticipant(data);
      })
      .catch(() => {
        if (!cancelled) setParticipant(null);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const doCheckin = async () => {
    setSubmitting(true);
    setCheckinError('');
    try {
      const result = await apiPost('/api/checkin', { event_id: Number(eventId), token });
      setCheckinResult(result);
    } catch (err) {
      setCheckinError(err.message || 'Check-in failed');
    } finally {
      setSubmitting(false);
    }
  };

  const handleRegisterAndCheckin = async (e) => {
    e.preventDefault();
    setFormError('');
    setSubmitting(true);
    try {
      const person = await apiPost('/api/register-or-lookup', {
        full_name: fullName.trim(),
        ufid: ufid.trim(),
      });
      setParticipant(person);
      const result = await apiPost('/api/checkin', { event_id: Number(eventId), token });
      setCheckinResult(result);
    } catch (err) {
      const message = err.message || 'Something went wrong';
      setFormError(message);
      setCheckinError(message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <Typography
        variant="h3"
        pt={2}
        pl={{ xs: 2, md: 4 }}
        sx={{ fontFamily: 'DM Sans', textAlign: 'left', color: '#1A1421', fontWeight: '700', letterSpacing: '3px' }}
      >
        CHECK IN
      </Typography>

      <Box className="checkin-page" sx={{ padding: 3 }}>
        {!eventId || !token ? (
          <Alert severity="error" sx={{ fontFamily: 'DM Sans', maxWidth: 420 }}>
            This check-in link is missing information. Please rescan the QR code.
          </Alert>
        ) : loading ? (
          <CircularProgress sx={{ color: '#BE9BCB' }} />
        ) : checkinResult ? (
          <Card className="checkin-card" style={cardStyle}>
            <CardContent style={{ margin: '8px' }}>
              <Typography variant="h5" sx={{ fontFamily: 'DM Sans', color: '#1A1421', fontWeight: '700' }}>
                {checkinResult.already_checked_in ? "Looks like you've already checked in" : "You're checked in!"}
              </Typography>
              <Typography variant="body1" sx={{ fontFamily: 'DM Sans', pt: 1 }}>
                {checkinResult.event.name} &middot; {checkinResult.event.points} point
                {checkinResult.event.points === 1 ? '' : 's'}
              </Typography>
            </CardContent>
          </Card>
        ) : (
          <Card className="checkin-card" style={cardStyle}>
            <CardContent style={{ margin: '8px' }}>
              {participant ? (
                <>
                  <Typography variant="h5" sx={{ fontFamily: 'DM Sans', color: '#1A1421', fontWeight: '700' }}>
                    Welcome back, {participant.full_name}
                  </Typography>
                  {checkinError && (
                    <Alert severity="error" sx={{ fontFamily: 'DM Sans', mt: 2 }}>
                      {checkinError}
                    </Alert>
                  )}
                  <Button
                    className="button-text"
                    variant="contained"
                    size="large"
                    style={{ ...buttonStyle, marginTop: '20px' }}
                    onClick={doCheckin}
                    disabled={submitting}
                  >
                    {submitting ? 'Checking in...' : 'Check In'}
                  </Button>
                </>
              ) : (
                <>
                  <Typography variant="h5" sx={{ fontFamily: 'DM Sans', color: '#1A1421', fontWeight: '700' }}>
                    First time here?
                  </Typography>
                  <Typography variant="body2" sx={{ fontFamily: 'DM Sans', pt: 1, pb: 1 }}>
                    Enter your info to check in.
                  </Typography>
                  <form onSubmit={handleRegisterAndCheckin}>
                    <TextField
                      label="Full Name"
                      fullWidth
                      required
                      margin="normal"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      sx={{ fontFamily: 'DM Sans' }}
                    />
                    <TextField
                      label="UFID"
                      fullWidth
                      required
                      margin="normal"
                      inputProps={{ maxLength: 8, inputMode: 'numeric' }}
                      value={ufid}
                      onChange={(e) => setUfid(e.target.value)}
                      sx={{ fontFamily: 'DM Sans' }}
                    />
                    {formError && (
                      <Alert severity="error" sx={{ fontFamily: 'DM Sans', mt: 1 }}>
                        {formError}
                      </Alert>
                    )}
                    <Box sx={{ textAlign: 'left' }}>
                      <Button
                        type="submit"
                        className="button-text"
                        variant="contained"
                        size="large"
                        style={{ ...buttonStyle, marginTop: '12px' }}
                        disabled={submitting}
                      >
                        {submitting ? 'Checking in...' : 'Check In'}
                      </Button>
                    </Box>
                  </form>
                </>
              )}
            </CardContent>
          </Card>
        )}
      </Box>
    </div>
  );
}
