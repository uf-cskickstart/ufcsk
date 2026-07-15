import * as React from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Typography,
  Card,
  CardContent,
  TextField,
  Button,
  Alert,
  CircularProgress,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Link,
} from '@mui/material';
import { apiGet, apiPost } from '../../api.js';

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

function fallbackCopy(text) {
  const textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.style.position = 'fixed';
  textarea.style.opacity = '0';
  document.body.appendChild(textarea);
  textarea.focus();
  textarea.select();
  try {
    document.execCommand('copy');
  } catch (err) {
    // clipboard unavailable; nothing more we can do here
  }
  document.body.removeChild(textarea);
}

function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    timeZone: 'UTC',
  });
}

export default function AdminEvents() {
  const navigate = useNavigate();
  const [checkingAuth, setCheckingAuth] = React.useState(true);
  const [authorized, setAuthorized] = React.useState(false);

  const [events, setEvents] = React.useState([]);
  const [loadingEvents, setLoadingEvents] = React.useState(false);

  const [name, setName] = React.useState('');
  const [date, setDate] = React.useState('');
  const [points, setPoints] = React.useState('1');
  const [submitting, setSubmitting] = React.useState(false);
  const [formError, setFormError] = React.useState('');
  const [copiedId, setCopiedId] = React.useState(null);

  const handleCopyLink = (event) => {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(event.checkin_url).catch(() => fallbackCopy(event.checkin_url));
    } else {
      fallbackCopy(event.checkin_url);
    }
    setCopiedId(event.id);
    setTimeout(() => setCopiedId((current) => (current === event.id ? null : current)), 1500);
  };

  const loadEvents = React.useCallback(() => {
    setLoadingEvents(true);
    apiGet('/api/events')
      .then(setEvents)
      .catch(() => setEvents([]))
      .finally(() => setLoadingEvents(false));
  }, []);

  React.useEffect(() => {
    apiGet('/api/admin/me')
      .then(() => {
        setAuthorized(true);
        loadEvents();
      })
      .catch(() => {
        navigate('/admin/login');
      })
      .finally(() => setCheckingAuth(false));
  }, [navigate, loadEvents]);

  const handleCreate = async (e) => {
    e.preventDefault();
    setFormError('');
    setSubmitting(true);
    try {
      await apiPost('/api/events', { name: name.trim(), date, points: Number(points) });
      setName('');
      setDate('');
      setPoints('1');
      loadEvents();
    } catch (err) {
      setFormError(err.message || 'Could not create event');
    } finally {
      setSubmitting(false);
    }
  };

  if (checkingAuth || !authorized) {
    return (
      <Box sx={{ padding: 3, display: 'flex', justifyContent: 'center' }}>
        <CircularProgress sx={{ color: '#BE9BCB' }} />
      </Box>
    );
  }

  return (
    <div>
      <Typography
        variant="h3"
        pt={2}
        pl={{ xs: 2, md: 4 }}
        sx={{ fontFamily: 'DM Sans', textAlign: 'left', color: '#1A1421', fontWeight: '700', letterSpacing: '3px' }}
      >
        ADMIN: EVENTS
      </Typography>

      <Box sx={{ padding: 3, display: 'flex', justifyContent: 'center' }}>
        <Box sx={{ width: '100%', maxWidth: 720 }}>
          <Card style={cardStyle}>
            <CardContent style={{ margin: '8px' }}>
              <Typography variant="h6" sx={{ fontFamily: 'DM Sans', color: '#1A1421', fontWeight: '700', pb: 1 }}>
                Create Event
              </Typography>
              <form onSubmit={handleCreate}>
                <TextField
                  label="Event Name"
                  fullWidth
                  required
                  margin="normal"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <TextField
                  label="Date"
                  type="date"
                  fullWidth
                  required
                  margin="normal"
                  InputLabelProps={{ shrink: true }}
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
                <TextField
                  label="Points"
                  type="number"
                  fullWidth
                  required
                  margin="normal"
                  inputProps={{ min: 0 }}
                  value={points}
                  onChange={(e) => setPoints(e.target.value)}
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
                    {submitting ? 'Creating...' : 'Create Event'}
                  </Button>
                </Box>
              </form>
            </CardContent>
          </Card>

          <Card style={cardStyle} sx={{ mt: 3 }}>
            <CardContent style={{ margin: '8px' }}>
              <Typography variant="h6" sx={{ fontFamily: 'DM Sans', color: '#1A1421', fontWeight: '700', pb: 1 }}>
                Events
              </Typography>
              {loadingEvents ? (
                <CircularProgress size={24} sx={{ color: '#BE9BCB' }} />
              ) : events.length === 0 ? (
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
                      <TableCell sx={{ fontFamily: 'DM Sans', fontWeight: '700' }} align="right">
                        QR Code
                      </TableCell>
                      <TableCell sx={{ fontFamily: 'DM Sans', fontWeight: '700' }} align="right">
                        Link
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {events.map((event) => (
                      <TableRow key={event.id}>
                        <TableCell sx={{ fontFamily: 'DM Sans' }}>{event.name}</TableCell>
                        <TableCell sx={{ fontFamily: 'DM Sans' }}>{formatDate(event.date)}</TableCell>
                        <TableCell sx={{ fontFamily: 'DM Sans' }} align="right">
                          {event.points}
                        </TableCell>
                        <TableCell align="right">
                          <Link
                            component={RouterLink}
                            to={`/checkin-display?event=${event.id}`}
                            target="_blank"
                            rel="noreferrer"
                            sx={{ fontFamily: 'DM Sans', color: '#BE9BCB' }}
                          >
                            Show QR
                          </Link>
                        </TableCell>
                        <TableCell align="right">
                          <Button
                            size="small"
                            onClick={() => handleCopyLink(event)}
                            sx={{ fontFamily: 'DM Sans', textTransform: 'none', color: '#BE9BCB' }}
                          >
                            {copiedId === event.id ? 'Copied!' : 'Copy Link'}
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </Box>
      </Box>
    </div>
  );
}
