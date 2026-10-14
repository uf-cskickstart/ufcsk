import * as React from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  TextField,
  Button,
  IconButton,
  Alert,
  CircularProgress,
  Collapse,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  TableSortLabel,
  ToggleButton,
  ToggleButtonGroup,
  InputAdornment,
  Tooltip,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DownloadIcon from '@mui/icons-material/Download';
import SearchIcon from '@mui/icons-material/Search';
import CheckIcon from '@mui/icons-material/Check';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { apiGet, apiDelete } from '../../api.js';

const PURPLE = '#BE9BCB';
const INK = '#1A1421';

const cardStyle = {
  borderRadius: '18px',
  boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px',
  fontFamily: 'DM Sans',
};

const font = { fontFamily: 'DM Sans' };
const headCell = { ...font, fontWeight: 700, color: INK, whiteSpace: 'nowrap' };

function dateKey(dateString) {
  return String(dateString).slice(0, 10);
}

function formatDate(dateString, options = { month: 'short', day: 'numeric', year: 'numeric' }) {
  return new Date(`${dateKey(dateString)}T00:00:00Z`).toLocaleDateString('en-US', { ...options, timeZone: 'UTC' });
}

function downloadRosterCsv(members, events) {
  const escape = (value) => `"${String(value ?? '').replace(/"/g, '""')}"`;
  const header = ['Name', 'UFID', 'Events attended', 'Total points', ...events.map((e) => `${e.name} (${dateKey(e.date)})`)];
  const lines = [
    header.map(escape).join(','),
    ...members.map((m) => {
      const attended = new Set(m.events.map((e) => e.id));
      return [m.full_name, m.ufid, m.events.length, m.total_points, ...events.map((e) => (attended.has(e.id) ? 'Y' : ''))]
        .map(escape)
        .join(',');
    }),
  ];
  const blob = new Blob([lines.join('\n')], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `csk-roster-${new Date().toISOString().slice(0, 10)}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

const SORTERS = {
  name: (a, b) => a.full_name.localeCompare(b.full_name),
  ufid: (a, b) => a.ufid.localeCompare(b.ufid),
  events: (a, b) => a.events.length - b.events.length,
  points: (a, b) => a.total_points - b.total_points,
};

function SortHeader({ id, label, sort, onSort, align }) {
  return (
    <TableCell sx={headCell} align={align} sortDirection={sort.by === id ? sort.dir : false}>
      <TableSortLabel active={sort.by === id} direction={sort.by === id ? sort.dir : 'asc'} onClick={() => onSort(id)}>
        {label}
      </TableSortLabel>
    </TableCell>
  );
}

function MemberRow({ member, deleting, onDelete }) {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <TableRow hover onClick={() => setOpen(!open)} sx={{ cursor: 'pointer', '& > td': { borderBottom: open ? 'none' : undefined } }}>
        <TableCell sx={{ ...font, fontWeight: 700, color: INK }}>{member.full_name}</TableCell>
        <TableCell sx={{ ...font, color: 'text.secondary', display: { xs: 'none', sm: 'table-cell' } }}>{member.ufid}</TableCell>
        <TableCell sx={font} align="right">
          {member.events.length}
        </TableCell>
        <TableCell sx={{ ...font, fontWeight: 700 }} align="right">
          {member.total_points}
        </TableCell>
        <TableCell align="right" sx={{ width: 48, pl: 0 }}>
          <IconButton
            size="small"
            aria-label={open ? 'Hide events attended' : 'Show events attended'}
            sx={{ color: PURPLE, transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}
          >
            <ExpandMoreIcon />
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell colSpan={5} sx={{ py: 0, borderBottom: open ? undefined : 'none' }}>
          <Collapse in={open} unmountOnExit>
            <Box sx={{ py: 1.5, pl: { xs: 0, sm: 2 } }}>
              <Typography variant="body2" sx={{ ...font, color: 'text.secondary', display: { xs: 'block', sm: 'none' }, mb: 1 }}>
                UFID {member.ufid}
              </Typography>
              {member.events.length === 0 ? (
                <Typography variant="body2" sx={{ ...font, color: 'text.secondary' }}>
                  Hasn't checked in to any events yet.
                </Typography>
              ) : (
                member.events.map((event) => (
                  <Box
                    key={event.id}
                    sx={{ display: 'flex', justifyContent: 'space-between', gap: 2, py: 0.5, borderBottom: '1px solid rgba(0, 0, 0, 0.05)' }}
                  >
                    <Typography variant="body2" sx={font}>
                      {event.name}
                    </Typography>
                    <Typography variant="body2" sx={{ ...font, color: 'text.secondary', flexShrink: 0 }}>
                      {formatDate(event.date)} · {event.points} {event.points === 1 ? 'pt' : 'pts'}
                    </Typography>
                  </Box>
                ))
              )}
              <Box sx={{ textAlign: 'right', mt: 1.5 }}>
                <Button
                  size="small"
                  startIcon={deleting ? <CircularProgress size={14} sx={{ color: '#d32f2f' }} /> : <DeleteOutlineIcon />}
                  disabled={deleting}
                  onClick={onDelete}
                  sx={{ ...font, textTransform: 'none', color: '#d32f2f' }}
                >
                  {deleting ? 'Deleting...' : 'Delete member'}
                </Button>
              </Box>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

const GRID_VISIBLE_EVENTS = 6;
const GRID_NAME_WIDTH = 170;
const GRID_POINTS_WIDTH = 80;

function AttendanceGrid({ members, events }) {
  const scrollRef = React.useRef(null);

  // Events run oldest to newest, so start scrolled to the newest ones.
  React.useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollLeft = el.scrollWidth;
  }, [events.length]);

  if (events.length === 0) {
    return (
      <Typography variant="body2" sx={{ ...font, color: 'text.secondary', textAlign: 'left', py: 2 }}>
        No events yet.
      </Typography>
    );
  }

  // Each event column takes 1/6 of the space left after the name and points
  // columns, so at most six fit and the rest scroll horizontally.
  const fixedWidth = GRID_NAME_WIDTH + GRID_POINTS_WIDTH;
  const visibleCount = Math.min(events.length, GRID_VISIBLE_EVENTS);
  const eventWidth = `max(84px, calc((100cqw - ${fixedWidth}px) / ${visibleCount}))`;
  const tableWidth = `calc(${fixedWidth}px + ${events.length} * ${eventWidth})`;

  const divider = '1px solid rgba(0, 0, 0, 0.08)';
  const stickyName = {
    position: 'sticky',
    left: 0,
    zIndex: 2,
    backgroundColor: '#fff',
    borderRight: divider,
    width: GRID_NAME_WIDTH,
  };
  const stickyPoints = {
    position: 'sticky',
    right: 0,
    zIndex: 2,
    backgroundColor: '#fff',
    borderLeft: divider,
    width: GRID_POINTS_WIDTH,
  };
  const footer = { backgroundColor: '#faf7fb' };

  return (
    <Box sx={{ containerType: 'inline-size' }}>
      <TableContainer ref={scrollRef} sx={{ maxHeight: 560, border: divider, borderRadius: '12px' }}>
        <Table stickyHeader size="small" sx={{ tableLayout: 'fixed', width: tableWidth }}>
          <TableHead>
            <TableRow>
              <TableCell sx={{ ...headCell, ...stickyName, zIndex: 3 }}>Member</TableCell>
              {events.map((event) => (
                <TableCell key={event.id} align="center" sx={{ ...headCell, width: eventWidth, verticalAlign: 'bottom', px: 1 }}>
                  <Tooltip title={`${event.name} · ${formatDate(event.date)}`}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: 0 }}>
                      <Typography sx={{ ...font, fontSize: '0.7rem', color: PURPLE, fontWeight: 700 }}>
                        {formatDate(event.date, { month: 'short', day: 'numeric' }).toUpperCase()}
                      </Typography>
                      <Typography
                        sx={{
                          ...font,
                          fontSize: '0.75rem',
                          fontWeight: 700,
                          maxWidth: '100%',
                          textAlign: 'center',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {event.name}
                      </Typography>
                    </Box>
                  </Tooltip>
                </TableCell>
              ))}
              <TableCell align="right" sx={{ ...headCell, ...stickyPoints, zIndex: 3 }}>
                Points
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {members.map((member) => {
              const attended = new Set(member.events.map((e) => e.id));
              return (
                <TableRow key={member.id} hover>
                  <TableCell sx={{ ...font, ...stickyName, fontWeight: 700, color: INK, overflowWrap: 'anywhere' }}>
                    {member.full_name}
                  </TableCell>
                  {events.map((event) => (
                    <TableCell
                      key={event.id}
                      align="center"
                      sx={{ backgroundColor: attended.has(event.id) ? 'rgba(254, 165, 176, 0.18)' : 'transparent' }}
                      aria-label={attended.has(event.id) ? 'Attended' : 'Did not attend'}
                    >
                      {attended.has(event.id) && <CheckIcon fontSize="small" sx={{ color: INK, verticalAlign: 'middle' }} />}
                    </TableCell>
                  ))}
                  <TableCell align="right" sx={{ ...font, ...stickyPoints, fontWeight: 700 }}>
                    {member.total_points}
                  </TableCell>
                </TableRow>
              );
            })}
            <TableRow>
              <TableCell sx={{ ...headCell, ...stickyName, ...footer }}>Attendance</TableCell>
              {events.map((event) => (
                <TableCell key={event.id} align="center" sx={{ ...font, ...footer, fontWeight: 700 }}>
                  {members.filter((m) => m.events.some((e) => e.id === event.id)).length}
                </TableCell>
              ))}
              <TableCell sx={{ ...stickyPoints, ...footer }} />
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      {events.length > GRID_VISIBLE_EVENTS && (
        <Typography variant="caption" sx={{ ...font, color: 'text.secondary', display: 'block', textAlign: 'right', mt: 0.75 }}>
          Showing newest events · scroll sideways to see all {events.length}
        </Typography>
      )}
    </Box>
  );
}

export default function AdminRoster() {
  const [members, setMembers] = React.useState([]);
  const [events, setEvents] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState('');

  const [view, setView] = React.useState('list');
  const [search, setSearch] = React.useState('');
  const [sort, setSort] = React.useState({ by: 'points', dir: 'desc' });
  const [deletingId, setDeletingId] = React.useState(null);
  const [deleteError, setDeleteError] = React.useState('');

  const handleDelete = async (member) => {
    const count = member.events.length;
    const confirmed = window.confirm(
      `Delete ${member.full_name} (UFID ${member.ufid})? This permanently removes them from the roster along with ` +
        `${count} ${count === 1 ? 'check-in' : 'check-ins'} and ${member.total_points} ${member.total_points === 1 ? 'point' : 'points'}.`
    );
    if (!confirmed) return;

    setDeleteError('');
    setDeletingId(member.id);
    try {
      await apiDelete(`/api/admin/participants/${member.id}`);
      setMembers((current) => current.filter((m) => m.id !== member.id));
    } catch (err) {
      setDeleteError(err.message || 'Could not delete member');
    } finally {
      setDeletingId(null);
    }
  };

  const load = React.useCallback(() => {
    setLoading(true);
    setError('');
    Promise.all([apiGet('/api/admin/roster'), apiGet('/api/events')])
      .then(([roster, allEvents]) => {
        setMembers(roster);
        // Oldest first so the grid reads left-to-right like a calendar.
        setEvents([...allEvents].sort((a, b) => dateKey(a.date).localeCompare(dateKey(b.date))));
      })
      .catch((err) => setError(err.message || 'Could not load roster'))
      .finally(() => setLoading(false));
  }, []);

  React.useEffect(() => {
    load();
  }, [load]);

  const handleSort = (by) => {
    setSort((current) =>
      current.by === by ? { by, dir: current.dir === 'asc' ? 'desc' : 'asc' } : { by, dir: by === 'name' || by === 'ufid' ? 'asc' : 'desc' }
    );
  };

  const query = search.trim().toLowerCase();
  const visible = members
    .filter((m) => !query || m.full_name.toLowerCase().includes(query) || m.ufid.includes(query))
    .sort((a, b) => {
      const result = SORTERS[sort.by](a, b) || SORTERS.name(a, b);
      return sort.dir === 'asc' ? result : -result;
    });

  const activeMembers = members.filter((m) => m.events.length > 0).length;

  return (
    <Card style={cardStyle}>
      <CardContent style={{ margin: '8px' }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: { xs: 'stretch', sm: 'center' },
            justifyContent: 'space-between',
            flexDirection: { xs: 'column', sm: 'row' },
            gap: 1.5,
            mb: 2,
          }}
        >
          <Box sx={{ textAlign: 'left' }}>
            <Typography variant="h6" sx={{ ...font, color: INK, fontWeight: 700 }}>
              Roster
            </Typography>
            {!loading && !error && (
              <Typography variant="body2" sx={{ ...font, color: 'text.secondary' }}>
                {members.length} {members.length === 1 ? 'member' : 'members'} · {activeMembers} with at least one check-in
              </Typography>
            )}
          </Box>
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', alignItems: 'center' }}>
            <ToggleButtonGroup
              size="small"
              exclusive
              value={view}
              onChange={(_, value) => value && setView(value)}
              sx={{ '& .Mui-selected': { backgroundColor: 'rgba(254, 165, 176, 0.35) !important', color: `${INK} !important` } }}
            >
              <ToggleButton value="list" sx={{ ...font, textTransform: 'none', px: 1.5 }}>
                Members
              </ToggleButton>
              <ToggleButton value="grid" sx={{ ...font, textTransform: 'none', px: 1.5 }}>
                Attendance grid
              </ToggleButton>
            </ToggleButtonGroup>
            <Button
              size="small"
              startIcon={<DownloadIcon />}
              disabled={loading || members.length === 0}
              onClick={() => downloadRosterCsv(visible, events)}
              sx={{ ...font, textTransform: 'none', color: PURPLE }}
            >
              Export CSV
            </Button>
          </Box>
        </Box>

        <TextField
          size="small"
          fullWidth
          placeholder="Search by name or UFID"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon fontSize="small" />
              </InputAdornment>
            ),
          }}
          sx={{ mb: 2 }}
        />

        {deleteError && (
          <Alert severity="error" onClose={() => setDeleteError('')} sx={{ ...font, mb: 2 }}>
            {deleteError}
          </Alert>
        )}

        {error ? (
          <Alert
            severity="error"
            sx={font}
            action={
              <Button color="inherit" size="small" onClick={load}>
                Retry
              </Button>
            }
          >
            {error}
          </Alert>
        ) : loading ? (
          <CircularProgress size={24} sx={{ color: PURPLE }} />
        ) : visible.length === 0 ? (
          <Typography variant="body2" sx={{ ...font, color: 'text.secondary', textAlign: 'left', py: 2 }}>
            {query ? `No members match "${search.trim()}".` : 'No members yet. People show up here once they log in with their UFID.'}
          </Typography>
        ) : view === 'grid' ? (
          <AttendanceGrid members={visible} events={events} />
        ) : (
          <TableContainer>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <SortHeader id="name" label="Name" sort={sort} onSort={handleSort} />
                  <TableCell sx={{ ...headCell, display: { xs: 'none', sm: 'table-cell' } }}>
                    <TableSortLabel active={sort.by === 'ufid'} direction={sort.by === 'ufid' ? sort.dir : 'asc'} onClick={() => handleSort('ufid')}>
                      UFID
                    </TableSortLabel>
                  </TableCell>
                  <SortHeader id="events" label="Events" sort={sort} onSort={handleSort} align="right" />
                  <SortHeader id="points" label="Points" sort={sort} onSort={handleSort} align="right" />
                  <TableCell sx={{ width: 48 }} />
                </TableRow>
              </TableHead>
              <TableBody>
                {visible.map((member) => (
                  <MemberRow
                    key={member.id}
                    member={member}
                    deleting={deletingId === member.id}
                    onDelete={() => handleDelete(member)}
                  />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </CardContent>
    </Card>
  );
}
