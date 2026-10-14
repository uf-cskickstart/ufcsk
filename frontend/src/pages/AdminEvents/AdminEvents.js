import * as React from 'react';
import { useNavigate, useSearchParams, Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Typography,
  Card,
  CardContent,
  TextField,
  Button,
  IconButton,
  Tooltip,
  Alert,
  Chip,
  CircularProgress,
  Collapse,
  Tabs,
  Tab,
  InputAdornment,
} from '@mui/material';
import QrCode2Icon from '@mui/icons-material/QrCode2';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CheckIcon from '@mui/icons-material/Check';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DownloadIcon from '@mui/icons-material/Download';
import SearchIcon from '@mui/icons-material/Search';
import LogoutIcon from '@mui/icons-material/Logout';
import { apiGet, apiPost, apiDelete } from '../../api.js';
import AdminRoster from '../AdminRoster/AdminRoster.js';
import PageHeader from '../../components/PageHeader/PageHeader.js';
import DateBadge from '../../components/DateBadge/DateBadge.js';

const PINK = '#fea5b0';
const PURPLE = '#BE9BCB';
const INK = '#1A1421';

const cardStyle = {
  borderRadius: '18px',
  boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px',
  fontFamily: 'DM Sans',
};

const buttonStyle = {
  backgroundColor: PINK,
  boxShadow: 'none',
  fontFamily: 'DM Sans',
};

const font = { fontFamily: 'DM Sans' };

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

// Event dates are DATE columns, so only the YYYY-MM-DD part is meaningful.
function dateKey(dateString) {
  return String(dateString).slice(0, 10);
}

function todayKey() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

function formatTime(dateString) {
  return new Date(dateString).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
}

function downloadAttendanceCsv(event, rows) {
  const escape = (value) => `"${String(value ?? '').replace(/"/g, '""')}"`;
  const lines = [
    ['Name', 'Checked in at'].map(escape).join(','),
    ...rows.map((row) => [row.full_name, new Date(row.checked_in_at).toLocaleString('en-US')].map(escape).join(',')),
  ];
  const blob = new Blob([lines.join('\n')], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${event.name.replace(/[^a-z0-9]+/gi, '-').toLowerCase()}-attendance.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

function StatCard({ label, value }) {
  return (
    <Card style={cardStyle} sx={{ flex: 1, minWidth: 0 }}>
      <CardContent sx={{ textAlign: 'center', py: 2, '&:last-child': { pb: 2 } }}>
        <Typography sx={{ ...font, fontSize: { xs: '1.6rem', sm: '2rem' }, fontWeight: 700, color: INK, lineHeight: 1.2 }}>
          {value}
        </Typography>
        <Typography variant="body2" sx={{ ...font, color: 'text.secondary' }}>
          {label}
        </Typography>
      </CardContent>
    </Card>
  );
}

function EventRow({ event, isToday, copied, deleting, onCopy, onDelete }) {
  const [open, setOpen] = React.useState(false);
  const [attendance, setAttendance] = React.useState(null);
  const [attendanceError, setAttendanceError] = React.useState('');

  const toggle = () => {
    const next = !open;
    setOpen(next);
    if (next && attendance === null) {
      setAttendanceError('');
      apiGet(`/api/events/${event.id}/attendance`)
        .then(setAttendance)
        .catch((err) => setAttendanceError(err.message || 'Could not load attendance'));
    }
  };

  return (
    <Box
      sx={{
        border: '1px solid',
        borderColor: isToday ? PINK : 'rgba(0, 0, 0, 0.08)',
        backgroundColor: isToday ? 'rgba(254, 165, 176, 0.08)' : 'transparent',
        borderRadius: '14px',
        mb: 1.5,
        overflow: 'hidden',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, p: 1.5, flexWrap: { xs: 'wrap', sm: 'nowrap' } }}>
        <DateBadge date={event.date} />

        <Box sx={{ flex: 1, minWidth: 0, textAlign: 'left' }}>
          <Typography sx={{ ...font, fontWeight: 700, color: INK, overflowWrap: 'anywhere' }}>{event.name}</Typography>
          <Box sx={{ display: 'flex', gap: 0.75, mt: 0.5, flexWrap: 'wrap' }}>
            {isToday && <Chip label="Today" size="small" sx={{ ...font, backgroundColor: PINK, color: INK, fontWeight: 700 }} />}
            <Chip label={`${event.points} ${event.points === 1 ? 'pt' : 'pts'}`} size="small" variant="outlined" sx={font} />
            <Chip
              label={`${event.checkin_count ?? 0} checked in`}
              size="small"
              variant="outlined"
              onClick={toggle}
              sx={font}
            />
          </Box>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, ml: { xs: 'auto', sm: 0 } }}>
          <Button
            component={RouterLink}
            to={`/checkin-display?event=${event.id}`}
            target="_blank"
            rel="noreferrer"
            size="small"
            variant="outlined"
            startIcon={<QrCode2Icon />}
            sx={{ ...font, textTransform: 'none', color: INK, borderColor: PURPLE, borderRadius: '10px' }}
          >
            Show QR
          </Button>
          <Tooltip title={copied ? 'Copied!' : 'Copy check-in link'}>
            <IconButton aria-label="Copy check-in link" onClick={onCopy} sx={{ color: copied ? 'success.main' : PURPLE }}>
              {copied ? <CheckIcon fontSize="small" /> : <ContentCopyIcon fontSize="small" />}
            </IconButton>
          </Tooltip>
          <Tooltip title={open ? 'Hide attendance' : 'Show attendance'}>
            <IconButton
              aria-label={open ? 'Hide attendance' : 'Show attendance'}
              onClick={toggle}
              sx={{ color: PURPLE, transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}
            >
              <ExpandMoreIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete event">
            <span>
              <IconButton aria-label="Delete event" onClick={onDelete} disabled={deleting} sx={{ color: '#d32f2f' }}>
                {deleting ? <CircularProgress size={18} sx={{ color: '#d32f2f' }} /> : <DeleteOutlineIcon fontSize="small" />}
              </IconButton>
            </span>
          </Tooltip>
        </Box>
      </Box>

      <Collapse in={open} unmountOnExit>
        <Box sx={{ borderTop: '1px solid rgba(0, 0, 0, 0.08)', px: 2, py: 1.5, textAlign: 'left' }}>
          {attendanceError ? (
            <Alert severity="error" sx={font}>
              {attendanceError}
            </Alert>
          ) : attendance === null ? (
            <CircularProgress size={20} sx={{ color: PURPLE }} />
          ) : attendance.length === 0 ? (
            <Typography variant="body2" sx={{ ...font, color: 'text.secondary' }}>
              Nobody has checked in yet.
            </Typography>
          ) : (
            <>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                  <Typography variant="body2" sx={{ ...font, fontWeight: 700, color: INK }}>
                    {attendance.length} {attendance.length === 1 ? 'attendee' : 'attendees'}
                  </Typography>
                  <Button
                    size="small"
                    startIcon={<DownloadIcon />}
                    onClick={() => downloadAttendanceCsv(event, attendance)}
                    sx={{ ...font, textTransform: 'none', color: PURPLE }}
                  >
                    Download CSV
                  </Button>
                </Box>
                <Box sx={{ maxHeight: 280, overflowY: 'auto' }}>
                  {attendance.map((row, i) => (
                    <Box
                      key={`${row.full_name}-${row.checked_in_at}-${i}`}
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        gap: 2,
                        py: 0.75,
                        borderBottom: i === attendance.length - 1 ? 'none' : '1px solid rgba(0, 0, 0, 0.05)',
                      }}
                    >
                      <Typography variant="body2" sx={font}>
                        {row.full_name || 'Unknown'}
                      </Typography>
                      <Typography variant="body2" sx={{ ...font, color: 'text.secondary', flexShrink: 0 }}>
                        {formatTime(row.checked_in_at)}
                      </Typography>
                    </Box>
                  ))}
                </Box>
            </>
          )}
        </Box>
      </Collapse>
    </Box>
  );
}

export default function AdminEvents() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const section = searchParams.get('view') === 'roster' ? 'roster' : 'events';
  const [checkingAuth, setCheckingAuth] = React.useState(true);
  const [adminEmail, setAdminEmail] = React.useState(null);

  const [events, setEvents] = React.useState([]);
  const [loadingEvents, setLoadingEvents] = React.useState(false);
  const [loadError, setLoadError] = React.useState('');

  const [name, setName] = React.useState('');
  const [date, setDate] = React.useState(todayKey());
  const [points, setPoints] = React.useState('1');
  const [submitting, setSubmitting] = React.useState(false);
  const [formError, setFormError] = React.useState('');
  const [createdName, setCreatedName] = React.useState('');

  const [tab, setTab] = React.useState('upcoming');
  const [search, setSearch] = React.useState('');
  const [copiedId, setCopiedId] = React.useState(null);
  const [deletingId, setDeletingId] = React.useState(null);
  const [deleteError, setDeleteError] = React.useState('');

  const handleCopyLink = (event) => {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(event.checkin_url).catch(() => fallbackCopy(event.checkin_url));
    } else {
      fallbackCopy(event.checkin_url);
    }
    setCopiedId(event.id);
    setTimeout(() => setCopiedId((current) => (current === event.id ? null : current)), 1500);
  };

  const handleDelete = async (event) => {
    const count = event.checkin_count ?? 0;
    const confirmed = window.confirm(
      `Delete "${event.name}"? This also permanently removes ${count} ${count === 1 ? 'check-in' : 'check-ins'} and the points earned from them.`
    );
    if (!confirmed) return;

    setDeleteError('');
    setDeletingId(event.id);
    try {
      await apiDelete(`/api/events/${event.id}`);
      setEvents((current) => current.filter((e) => e.id !== event.id));
    } catch (err) {
      setDeleteError(err.message || 'Could not delete event');
    } finally {
      setDeletingId(null);
    }
  };

  const loadEvents = React.useCallback(() => {
    setLoadingEvents(true);
    setLoadError('');
    apiGet('/api/events')
      .then(setEvents)
      .catch((err) => {
        setEvents([]);
        setLoadError(err.message || 'Could not load events');
      })
      .finally(() => setLoadingEvents(false));
  }, []);

  React.useEffect(() => {
    apiGet('/api/admin/me')
      .then((data) => {
        setAdminEmail(data.email || '');
        loadEvents();
      })
      .catch(() => {
        navigate('/login');
      })
      .finally(() => setCheckingAuth(false));
  }, [navigate, loadEvents]);

  const handleCreate = async (e) => {
    e.preventDefault();
    setFormError('');
    setCreatedName('');
    setSubmitting(true);
    try {
      const trimmed = name.trim();
      await apiPost('/api/events', { name: trimmed, date, points: Number(points) });
      setCreatedName(trimmed);
      setName('');
      setDate(todayKey());
      setPoints('1');
      setTab(date >= todayKey() ? 'upcoming' : 'past');
      loadEvents();
    } catch (err) {
      setFormError(err.message || 'Could not create event');
    } finally {
      setSubmitting(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await apiPost('/api/admin/logout', {});
    } finally {
      navigate('/login');
    }
  };

  const today = todayKey();
  const upcoming = events.filter((e) => dateKey(e.date) >= today).sort((a, b) => dateKey(a.date).localeCompare(dateKey(b.date)));
  const past = events.filter((e) => dateKey(e.date) < today);
  const totalCheckins = events.reduce((sum, e) => sum + (e.checkin_count ?? 0), 0);

  const query = search.trim().toLowerCase();
  const visible = (tab === 'upcoming' ? upcoming : past).filter((e) => !query || e.name.toLowerCase().includes(query));

  if (checkingAuth || adminEmail === null) {
    return (
      <Box sx={{ padding: 3, display: 'flex', justifyContent: 'center' }}>
        <CircularProgress sx={{ color: PURPLE }} />
      </Box>
    );
  }

  return (
    <div>
      <Box sx={{ padding: { xs: 2, sm: 3 }, display: 'flex', justifyContent: 'center' }}>
        <Box sx={{ width: '100%', maxWidth: 1000 }}>
          <PageHeader eyebrow="ADMIN DASHBOARD" title={section === 'roster' ? 'OUR MEMBERS' : 'OUR EVENTS'}>
            {adminEmail && (
              <Typography variant="body2" sx={{ ...font, color: 'text.secondary' }}>
                {adminEmail}
              </Typography>
            )}
            <Button size="small" startIcon={<LogoutIcon />} onClick={handleSignOut} sx={{ ...font, textTransform: 'none', color: PURPLE }}>
              Sign out
            </Button>
          </PageHeader>

          <Tabs
            value={section}
            onChange={(_, value) => setSearchParams(value === 'roster' ? { view: 'roster' } : {})}
            TabIndicatorProps={{ style: { backgroundColor: PINK, height: 3 } }}
            sx={{ mb: 3, '& .MuiTab-root': { minWidth: 0, px: 0, mr: 4 }, '& .Mui-selected': { color: `${INK} !important` } }}
          >
            <Tab value="events" label="Events" sx={{ ...font, textTransform: 'none', fontWeight: 700, fontSize: '1rem' }} />
            <Tab value="roster" label="Roster" sx={{ ...font, textTransform: 'none', fontWeight: 700, fontSize: '1rem' }} />
          </Tabs>

          {section === 'roster' ? (
            <AdminRoster />
          ) : (
            <>
            <Box sx={{ display: 'flex', gap: { xs: 1.5, sm: 2 }, mb: 3 }}>
              <StatCard label="Events" value={events.length} />
              <StatCard label="Upcoming" value={upcoming.length} />
              <StatCard label="Total check-ins" value={totalCheckins} />
            </Box>

            <Card style={cardStyle}>
              <CardContent style={{ margin: '8px' }}>
                <Typography variant="h6" sx={{ ...font, color: INK, fontWeight: '700', textAlign: 'left' }}>
                  Create Event
                </Typography>
                <form onSubmit={handleCreate}>
                  <Box
                    sx={{
                      display: 'grid',
                      gridTemplateColumns: { xs: '1fr', sm: '2fr 1.2fr 0.7fr' },
                      gap: 2,
                      mt: 2,
                    }}
                  >
                    <TextField label="Event Name" required value={name} onChange={(e) => setName(e.target.value)} />
                    <TextField
                      label="Date"
                      type="date"
                      required
                      InputLabelProps={{ shrink: true }}
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                    />
                    <TextField
                      label="Points"
                      type="number"
                      required
                      inputProps={{ min: 0 }}
                      value={points}
                      onChange={(e) => setPoints(e.target.value)}
                    />
                  </Box>
                  {formError && (
                    <Alert severity="error" sx={{ ...font, mt: 2 }}>
                      {formError}
                    </Alert>
                  )}
                  {createdName && (
                    <Alert severity="success" onClose={() => setCreatedName('')} sx={{ ...font, mt: 2 }}>
                      Created "{createdName}".
                    </Alert>
                  )}
                  <Box sx={{ textAlign: 'left' }}>
                    <Button
                      type="submit"
                      className="button-text"
                      variant="contained"
                      size="large"
                      style={{ ...buttonStyle, marginTop: '16px' }}
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
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: { xs: 'stretch', sm: 'center' },
                    justifyContent: 'space-between',
                    flexDirection: { xs: 'column', sm: 'row' },
                    gap: 1,
                    mb: 2,
                  }}
                >
                  <Tabs
                    value={tab}
                    onChange={(_, value) => setTab(value)}
                    TabIndicatorProps={{ style: { backgroundColor: PINK } }}
                    sx={{ minHeight: 40, '& .MuiTab-root': { minWidth: 0, px: 0, mr: 3 }, '& .Mui-selected': { color: `${INK} !important` } }}
                  >
                    <Tab value="upcoming" label={`Upcoming (${upcoming.length})`} sx={{ ...font, textTransform: 'none', fontWeight: 700, minHeight: 40 }} />
                    <Tab value="past" label={`Past (${past.length})`} sx={{ ...font, textTransform: 'none', fontWeight: 700, minHeight: 40 }} />
                  </Tabs>
                  <TextField
                    size="small"
                    placeholder="Search events"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SearchIcon fontSize="small" />
                        </InputAdornment>
                      ),
                    }}
                    sx={{ width: { xs: '100%', sm: 220 } }}
                  />
                </Box>

                {deleteError && (
                  <Alert severity="error" sx={{ ...font, mb: 2 }}>
                    {deleteError}
                  </Alert>
                )}
                {loadError && (
                  <Alert
                    severity="error"
                    sx={{ ...font, mb: 2 }}
                    action={
                      <Button color="inherit" size="small" onClick={loadEvents}>
                        Retry
                      </Button>
                    }
                  >
                    {loadError}
                  </Alert>
                )}

                {loadingEvents ? (
                  <CircularProgress size={24} sx={{ color: PURPLE }} />
                ) : visible.length === 0 ? (
                  <Typography variant="body2" sx={{ ...font, color: 'text.secondary', textAlign: 'left', py: 2 }}>
                    {query
                      ? `No ${tab} events match "${search.trim()}".`
                      : tab === 'upcoming'
                      ? 'No upcoming events. Create one above.'
                      : 'No past events yet.'}
                  </Typography>
                ) : (
                  visible.map((event) => (
                    <EventRow
                      key={event.id}
                      event={event}
                      isToday={dateKey(event.date) === today}
                      copied={copiedId === event.id}
                      deleting={deletingId === event.id}
                      onCopy={() => handleCopyLink(event)}
                      onDelete={() => handleDelete(event)}
                    />
                  ))
                )}
              </CardContent>
            </Card>
            </>
          )}
        </Box>
      </Box>
    </div>
  );
}
