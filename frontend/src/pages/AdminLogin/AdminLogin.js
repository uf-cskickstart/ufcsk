import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Card, CardContent, Alert } from '@mui/material';
import { apiPost } from '../../api.js';

const cardStyle = {
  borderRadius: '18px',
  boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px',
  fontFamily: 'DM Sans',
};

export default function AdminLogin() {
  const navigate = useNavigate();
  const buttonRef = React.useRef(null);
  const [error, setError] = React.useState('');

  React.useEffect(() => {
    async function handleCredentialResponse(response) {
      setError('');
      try {
        await apiPost('/api/admin/google-signin', { credential: response.credential });
        navigate('/admin/events');
      } catch (err) {
        setError(err.message || 'Sign-in failed');
      }
    }

    function renderButton() {
      if (window.google && buttonRef.current) {
        window.google.accounts.id.initialize({
          client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
          callback: handleCredentialResponse,
        });
        window.google.accounts.id.renderButton(buttonRef.current, {
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
  }, [navigate]);

  return (
    <div>
      <Typography
        variant="h3"
        pt={2}
        pl={{ xs: 2, md: 4 }}
        sx={{ fontFamily: 'DM Sans', textAlign: 'left', color: '#1A1421', fontWeight: '700', letterSpacing: '3px' }}
      >
        ADMIN LOGIN
      </Typography>

      <Box sx={{ padding: 3, display: 'flex', justifyContent: 'center' }}>
        <Card style={cardStyle} sx={{ width: '100%', maxWidth: 420 }}>
          <CardContent style={{ margin: '8px', textAlign: 'center' }}>
            <Typography variant="body1" sx={{ fontFamily: 'DM Sans', pb: 2 }}>
              Sign in with your board Google account.
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center' }} ref={buttonRef} />
            {error && (
              <Alert severity="error" sx={{ fontFamily: 'DM Sans', mt: 2 }}>
                {error}
              </Alert>
            )}
          </CardContent>
        </Card>
      </Box>
    </div>
  );
}
