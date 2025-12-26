'use client';
import { useEffect, useRef } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { majorMonoDisplay } from '@/styles/theme';
import { logUserAction } from '@/helpers';
import { USER_ACTIONS } from '@/constants';

export default function Error() {
  const headingRef = useRef<HTMLHeadingElement | null>(null);

  useEffect(() => {
    // When an error boundary is shown, Next.js can preserve the current scroll position.
    // Force the viewport to the top so the user sees the error immediately.
    window.scrollTo({ top: 0, left: 0 });
    // Move focus to the top heading for accessibility and to avoid "footer focus" feeling.
    headingRef.current?.focus();
  }, []);

  const handleReload = () => {
    logUserAction(USER_ACTIONS.RETRY_ON_ERROR);
    setTimeout(() => {
      window.location.reload();
    }, 300);
  };

  return (
    <Box
      sx={{
        position: 'relative',
        backgroundColor: '#000',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        textAlign: 'center',
        px: { xs: 2, md: 3 },
        py: { xs: '8rem', md: '10rem' },
        '&::before': {
          content: '""',
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'radial-gradient(ellipse at top, rgba(122, 238, 229, 0.05) 0%, transparent 50%), radial-gradient(ellipse at bottom, rgba(122, 238, 229, 0.03) 0%, transparent 50%)',
          animation: 'backgroundGlowPulse 10s ease-in-out infinite',
          '@keyframes backgroundGlowPulse': {
            '0%': {
              background: 'radial-gradient(ellipse at top, rgba(122, 238, 229, 0.05) 0%, transparent 50%), radial-gradient(ellipse at bottom, rgba(122, 238, 229, 0.03) 0%, transparent 50%)',
            },
            '50%': {
              background: 'radial-gradient(ellipse at top, rgba(255, 49, 49, 0.05) 0%, transparent 50%), radial-gradient(ellipse at bottom, rgba(255, 49, 49, 0.03) 0%, transparent 50%)',
            },
            '100%': {
              background: 'radial-gradient(ellipse at top, rgba(122, 238, 229, 0.05) 0%, transparent 50%), radial-gradient(ellipse at bottom, rgba(122, 238, 229, 0.03) 0%, transparent 50%)',
            },
          },
          pointerEvents: 'none',
          zIndex: 0,
        },
      }}
    >
      <Box
        sx={{
          position: 'relative',
          zIndex: 1,
          maxWidth: '500px',
          width: '100%',
        }}
      >
        <Typography
          variant="h1"
          component="h1"
          tabIndex={-1}
          ref={headingRef}
          sx={{
            mb: 2,
            fontFamily: majorMonoDisplay.style.fontFamily,
            fontSize: { xs: '5rem', md: '7rem' },
            color: 'rgba(255, 49, 49, 0.9)',
            fontWeight: 300,
            letterSpacing: '-0.02em',
            lineHeight: 1,
            outline: 'none',
          }}
        >
          500
        </Typography>
        <Typography
          sx={{
            mb: 3,
            fontSize: { xs: '0.75rem', md: '0.875rem' },
            textTransform: 'uppercase',
            letterSpacing: { xs: '0.2em', md: '0.25em' },
            color: 'rgba(255,255,255,0.5)',
            fontWeight: 400,
          }}
        >
          Something went wrong
        </Typography>
        <Button
          variant="outlined"
          onClick={handleReload}
          sx={{
            borderColor: 'rgba(255,255,255,0.1)',
            color: 'rgba(255,255,255,0.8)',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            fontSize: { xs: '0.6875rem', md: '0.75rem' },
            px: { xs: 3, md: 4 },
            py: { xs: 1.25, md: 1.5 },
            backgroundColor: 'rgba(17, 17, 17, 0.4)',
            backdropFilter: 'blur(10px)',
            transition: 'all 0.3s ease',
            '&:hover': {
              borderColor: 'rgba(255,255,255,0.2)',
              backgroundColor: 'rgba(17, 17, 17, 0.6)',
              color: '#fff',
            },
          }}
        >
          Try again
        </Button>
      </Box>
    </Box>
  );
}
