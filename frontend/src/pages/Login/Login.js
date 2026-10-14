import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, TextField, Button, Card, CardContent, Alert, CircularProgress, Link, Divider } from '@mui/material';
import { apiGet, apiPost } from '../../api.js';
import PageHeader from '../../components/PageHeader/PageHeader.js';

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

export default function Login() {
  const navigate = useNavigate();

  const [checkingSession, setCheckingSession] = React.useState(true);
  const [fullName, setFullName] = React.useState('');
  const [ufid, setUfid] = React.useState('');
  const [submitting, setSubmitting] = React.useState(false);
  const [formError, setFormError] = React.useState('');
  const [adminUsername, setAdminUsername] = React.useState('');
  const [adminPassword, setAdminPassword] = React.useState('');
  const [adminSubmitting, setAdminSubmitting] = React.useState(false);
  const [adminError, setAdminError] = React.useState('');
  const [showAdminSignIn, setShowAdminSignIn] = React.useState(false);

  React.useEffect(() => {
    let cancelled = false;
    apiGet('/api/profile')
      .then(() => {
        if (!cancelled) navigate('/profile');
      })
      .catch(() => {
        if (!cancelled) setCheckingSession(false);
      });
    return () => {
      cancelled = true;
    };
  }, [navigate]);

  const handleAdminLogin = async (e) => {
    e.preventDefault();
    setAdminError('');
    setAdminSubmitting(true);
    try {
      await apiPost('/api/admin/login', { username: adminUsername.trim(), password: adminPassword });
      navigate('/admin/events');
    } catch (err) {
      setAdminError(err.message || 'Sign-in failed');
    } finally {
      setAdminSubmitting(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setFormError('');
    setSubmitting(true);
    try {
      await apiPost('/api/register-or-lookup', {
        full_name: fullName.trim(),
        ufid: ufid.trim(),
      });
      navigate('/profile');
    } catch (err) {
      setFormError(err.message || 'Something went wrong');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Box sx={{ padding: { xs: 2, sm: 3 }, display: 'flex', justifyContent: 'center' }}>
      <Box sx={{ width: '100%', maxWidth: 440 }}>
        <PageHeader eyebrow="MEMBERS" title="LOG IN" />

        {checkingSession ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
            <CircularProgress sx={{ color: '#BE9BCB' }} />
          </Box>
        ) : (
          <Card style={cardStyle}>
            <CardContent style={{ margin: '8px' }} sx={{ textAlign: 'left' }}>
              <Typography variant="h6" sx={{ fontFamily: 'DM Sans', color: '#1A1421', fontWeight: '700' }}>
                Check your points
              </Typography>
              <Typography variant="body2" sx={{ fontFamily: 'DM Sans', color: 'text.secondary', pt: 0.5 }}>
                Enter the name and UFID you use to check in at events.
              </Typography>
              <form onSubmit={handleLogin}>
                <TextField
                  label="Full Name"
                  fullWidth
                  required
                  margin="normal"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
                <TextField
                  label="UFID"
                  fullWidth
                  required
                  margin="normal"
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
                  {submitting ? 'Logging in...' : 'Log In'}
                </Button>
              </form>

              <Divider sx={{ my: 3 }} />

              {!showAdminSignIn ? (
                <Box sx={{ textAlign: 'center' }}>
                  <Link
                    component="button"
                    type="button"
                    variant="body2"
                    onClick={() => setShowAdminSignIn(true)}
                    sx={{ fontFamily: 'DM Sans', color: '#BE9BCB', fontWeight: 700 }}
                  >
                    Board member? Sign in
                  </Link>
                </Box>
              ) : (
                <form onSubmit={handleAdminLogin}>
                  <Typography sx={{ fontFamily: 'DM Sans', color: '#BE9BCB', fontWeight: '700', letterSpacing: '2px', fontSize: '0.8rem' }}>
                    BOARD SIGN IN
                  </Typography>
                  <TextField
                    label="Admin Username"
                    fullWidth
                    required
                    margin="normal"
                    value={adminUsername}
                    onChange={(e) => setAdminUsername(e.target.value)}
                  />
                  <TextField
                    label="Admin Password"
                    type="password"
                    fullWidth
                    required
                    margin="normal"
                    value={adminPassword}
                    onChange={(e) => setAdminPassword(e.target.value)}
                  />
                  {adminError && (
                    <Alert severity="error" sx={{ fontFamily: 'DM Sans', mt: 1 }}>
                      {adminError}
                    </Alert>
                  )}
                  <Button
                    type="submit"
                    variant="outlined"
                    size="large"
                    fullWidth
                    sx={{ mt: 1.5, fontFamily: 'DM Sans', textTransform: 'none', color: '#1A1421', borderColor: '#BE9BCB', borderRadius: '10px' }}
                    disabled={adminSubmitting}
                  >
                    {adminSubmitting ? 'Signing in...' : 'Sign In'}
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>
        )}
      </Box>
    </Box>
  );
}
