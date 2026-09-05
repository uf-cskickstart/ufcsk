import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

export default function BoardCard({
  name,
  position,
  blurb,
  avatar,
  linkedin,
  reverse,
}) {
  return (
    <Card
      style={{
        boxShadow: 'none',
        // borderRadius: '30px',
        backgroundColor: 'transparent',
      }}
    >
      <Typography
        variant="body3"
        sx={{
          display: { xs: 'block', md: 'none' },
          fontFamily: 'DM Sans',
          fontWeight: 600,
          color: '#fea5b0',
          textAlign: 'center',
          mb: 1,
          mt: 3,
        }}
      >
        {position}
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: reverse ? 'row-reverse' : 'row', md: 'column' },
          alignItems: { xs: 'center', md: 'stretch' },
          gap: { xs: 2, md: 0 },
        }}
      >
        <CardMedia
          sx={{
            width: { xs: 150, md: '100%' },
            height: { xs: 150, md: 400 },
            flexShrink: 0,
            borderRadius: { xs: '16px', md: '30px' },
          }}
          component="img"
          src={avatar}
          title="avatar"
          alt="avatar"
        />
        <CardContent
          sx={{
            flex: 1,
            minWidth: 0,
            p: { xs: 0, md: 2 },
            '&:last-child': { pb: { xs: 0, md: 3 } },
          }}
        >
          <Grid container sx={{ paddingBottom: { xs: '2px', md: '15px' } }}>
            <Grid item xs={12} md={12}>
              <Typography
                gutterBottom
                variant="h5"
                mb={1}
                p={0}
                component="div"
                sx={{
                  fontSize: { xs: '1.1rem', md: '1.5rem' },
                  textAlign: { xs: reverse ? 'right' : 'left', md: 'left' },
                }}
                style={{
                  fontFamily: 'DM Sans',
                  fontWeight: '500',
                }}
              >
                <a
                  href={linkedin}
                  style={{
                    textDecoration: 'none',
                    color: 'inherit',
                    borderBottom: '2px solid #ffe45e',
                  }}
                  target="_blank"
                  rel="noreferrer"
                >
                  {name}
                </a>
              </Typography>
            </Grid>
            <Grid item xs={12} md={12}>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  textAlign: { xs: reverse ? 'right' : 'left', md: 'left' },
                }}
                style={{ fontFamily: 'DM Sans' }}
              >
                {blurb}
              </Typography>
            </Grid>
          </Grid>
          <Box sx={{ display: { xs: 'none', md: 'block' }, textAlign: 'left' }}>
            <Button
              variant="outlined"
              size="small"
              sx={{
                fontFamily: 'DM Sans',
                color: '#fea5b0',
                borderColor: '#fdc7cc',
                borderRadius: '8px',
                pointerEvents: 'none',
                width: '100%',
                lineHeight: '1.5',
              }}
            >
              {position}
            </Button>
          </Box>
        </CardContent>
      </Box>
    </Card>
  );
}
