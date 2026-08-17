import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, TextField, Button, Card, CardContent, Alert, CircularProgress, Link } from '@mui/material';
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

export default function Login() {
  const navigate = useNavigate();
  const googleButtonRef = React.useRef(null);

  const [checkingSession, setCheckingSession] = React.useState(true);
  const [fullName, setFullName] = React.useState('');
  const [ufid, setUfid] = React.useState('');
  const [submitting, setSubmitting] = React.useState(false);
  const [formError, setFormError] = React.useState('');
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

  React.useEffect(() => {
    if (!showAdminSignIn) return undefined;

    async function handleCredentialResponse(response) {
      setAdminError('');
      try {
        await apiPost('/api/admin/google-signin', { credential: response.credential });
        navigate('/admin/events');
      } catch (err) {
        setAdminError(err.message || 'Sign-in failed');
      }
    }

    function renderButton() {
      if (window.google && googleButtonRef.current) {
        window.google.accounts.id.initialize({
          client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
          callback: handleCredentialResponse,
        });
        window.google.accounts.id.renderButton(googleButtonRef.current, {
          theme: 'outline',
          size: 'large',
        });
      }
    }

    if (window.google) {
      renderButton();
      return undefined;
    }

    const interval = setInterval(() => {
      if (window.google) {
        clearInterval(interval);
        renderButton();
      }
    }, 100);
    return () => clearInterval(interval);
  }, [showAdminSignIn, navigate]);

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
    <div>
      <Typography
        variant="h3"
        pt={2}
        pl={{ xs: 2, md: 4 }}
        sx={{ fontFamily: 'DM Sans', textAlign: 'left', color: '#1A1421', fontWeight: '700', letterSpacing: '3px' }}
      >
        LOG IN
      </Typography>

      <Box sx={{ padding: 3, display: 'flex', justifyContent: 'center' }}>
        {checkingSession ? (
          <CircularProgress sx={{ color: '#BE9BCB' }} />
        ) : (
          <Card style={cardStyle} sx={{ width: '100%', maxWidth: 420 }}>
            <CardContent style={{ margin: '8px' }}>
              <Typography variant="body2" sx={{ fontFamily: 'DM Sans', pb: 1 }}>
                Enter your info to see your points.
              </Typography>
              <form onSubmit={handleLogin}>
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
                    variant="contained"
                    size="large"
                    style={{ ...buttonStyle, marginTop: '12px' }}
                    disabled={submitting}
                  >
                    {submitting ? 'Logging in...' : 'Log In'}
                  </Button>
                </Box>
              </form>

              <Box sx={{ mt: 3, textAlign: 'center' }}>
                {!showAdminSignIn ? (
                  <Link
                    component="button"
                    type="button"
                    variant="body2"
                    onClick={() => setShowAdminSignIn(true)}
                    sx={{ fontFamily: 'DM Sans', color: '#1A1421' }}
                  >
                    Board member? Sign in with Google
                  </Link>
                ) : (
                  <>
                    <Box sx={{ display: 'flex', justifyContent: 'center' }} ref={googleButtonRef} />
                    {adminError && (
                      <Alert severity="error" sx={{ fontFamily: 'DM Sans', mt: 2 }}>
                        {adminError}
                      </Alert>
                    )}
                  </>
                )}
              </Box>
            </CardContent>
          </Card>
        )}
      </Box>
    </div>
  );
}
