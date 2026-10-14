import * as React from 'react';
import { useSearchParams, Link as RouterLink } from 'react-router-dom';
import { Box, Typography, TextField, Button, Card, CardContent, CircularProgress, Alert, Chip } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import { apiGet, apiPost } from '../../api.js';
import PageHeader from '../../components/PageHeader/PageHeader.js';
import DateBadge from '../../components/DateBadge/DateBadge.js';

const INK = '#1A1421';
const PURPLE = '#BE9BCB';

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

  const textFieldProps = { fullWidth: true, required: true, margin: 'normal' };

  return (
    <Box sx={{ padding: { xs: 2, sm: 3 }, display: 'flex', justifyContent: 'center', minHeight: '60vh' }}>
      <Box sx={{ width: '100%', maxWidth: 440 }}>
        <PageHeader eyebrow="EVENT CHECK-IN" title="CHECK IN" />

        {!eventId || !token ? (
          <Alert severity="error" sx={{ fontFamily: 'DM Sans' }}>
            This check-in link is missing information. Please rescan the QR code.
          </Alert>
        ) : loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
            <CircularProgress sx={{ color: PURPLE }} />
          </Box>
        ) : checkinResult ? (
          <Card style={cardStyle}>
            <CardContent style={{ margin: '8px' }} sx={{ textAlign: 'center' }}>
              <Box
                sx={{
                  width: 64,
                  height: 64,
                  borderRadius: '50%',
                  backgroundColor: checkinResult.already_checked_in ? 'rgba(190, 155, 203, 0.2)' : 'rgba(254, 165, 176, 0.35)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mx: 'auto',
                  mb: 2,
                }}
              >
                <CheckIcon sx={{ fontSize: 36, color: INK }} />
              </Box>
              <Typography variant="h5" sx={{ fontFamily: 'DM Sans', color: INK, fontWeight: '700' }}>
                {checkinResult.already_checked_in ? "You're already checked in" : "You're checked in!"}
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 2,
                  p: 1.5,
                  mt: 2.5,
                  border: '1px solid rgba(0, 0, 0, 0.08)',
                  borderRadius: '14px',
                  textAlign: 'left',
                }}
              >
                <DateBadge date={checkinResult.event.date} />
                <Typography sx={{ fontFamily: 'DM Sans', fontWeight: 700, color: INK, flex: 1, minWidth: 0, overflowWrap: 'anywhere' }}>
                  {checkinResult.event.name}
                </Typography>
                <Chip
                  label={`+${checkinResult.event.points} ${checkinResult.event.points === 1 ? 'pt' : 'pts'}`}
                  size="small"
                  sx={{ fontFamily: 'DM Sans', fontWeight: 700, backgroundColor: 'rgba(254, 165, 176, 0.35)', color: INK }}
                />
              </Box>
              <Button
                component={RouterLink}
                to="/profile"
                className="button-text"
                variant="contained"
                size="large"
                fullWidth
                style={{ ...buttonStyle, marginTop: '20px' }}
              >
                See My Points
              </Button>
            </CardContent>
          </Card>
        ) : (
          <Card style={cardStyle}>
            <CardContent style={{ margin: '8px' }} sx={{ textAlign: 'left' }}>
              {participant ? (
                <>
                  <Typography variant="h6" sx={{ fontFamily: 'DM Sans', color: INK, fontWeight: '700' }}>
                    Welcome back, {participant.full_name}!
                  </Typography>
                  <Typography variant="body2" sx={{ fontFamily: 'DM Sans', color: 'text.secondary', pt: 0.5 }}>
                    Tap below to check in and collect your points.
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
                    fullWidth
                    style={{ ...buttonStyle, marginTop: '20px' }}
                    onClick={doCheckin}
                    disabled={submitting}
                  >
                    {submitting ? 'Checking in...' : 'Check In'}
                  </Button>
                </>
              ) : (
                <>
                  <Typography variant="h6" sx={{ fontFamily: 'DM Sans', color: INK, fontWeight: '700' }}>
                    First time here?
                  </Typography>
                  <Typography variant="body2" sx={{ fontFamily: 'DM Sans', color: 'text.secondary', pt: 0.5 }}>
                    Enter your name and UFID to check in. Use the same info every time so your points add up.
                  </Typography>
                  <form onSubmit={handleRegisterAndCheckin}>
                    <TextField {...textFieldProps} label="Full Name" value={fullName} onChange={(e) => setFullName(e.target.value)} />
                    <TextField
                      {...textFieldProps}
                      label="UFID"
                      inputProps={{ maxLength: 8, inputMode: 'numeric' }}
                      helperText="8 digits"
                      value={ufid}
                      onChange={(e) => setUfid(e.target.value)}
                    />
                    {formError && (
                      <Alert severity="error" sx={{ fontFamily: 'DM Sans', mt: 1 }}>
                        {formError}
                      </Alert>
                    )}
                    <Button
                      type="submit"
                      className="button-text"
                      variant="contained"
                      size="large"
                      fullWidth
                      style={{ ...buttonStyle, marginTop: '16px' }}
                      disabled={submitting}
                    >
                      {submitting ? 'Checking in...' : 'Check In'}
                    </Button>
                  </form>
                </>
              )}
            </CardContent>
          </Card>
        )}
      </Box>
    </Box>
  );
}
