import { Box, Skeleton, Typography } from '@mui/material';
import { PageContainer } from '@/components/ui';

export default function Loading() {
  return (
    <Box
      sx={{
        position: 'relative',
        backgroundColor: '#000',
        minHeight: '100vh',
        '&::before': {
          content: '""',
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background:
            'radial-gradient(ellipse at top, rgba(122, 238, 229, 0.05) 0%, transparent 50%), radial-gradient(ellipse at bottom, rgba(122, 238, 229, 0.03) 0%, transparent 50%)',
          animation: 'backgroundGlowPulse 10s ease-in-out infinite',
          '@keyframes backgroundGlowPulse': {
            '0%': {
              background:
                'radial-gradient(ellipse at top, rgba(122, 238, 229, 0.05) 0%, transparent 50%), radial-gradient(ellipse at bottom, rgba(122, 238, 229, 0.03) 0%, transparent 50%)',
            },
            '50%': {
              background:
                'radial-gradient(ellipse at top, rgba(255, 49, 49, 0.05) 0%, transparent 50%), radial-gradient(ellipse at bottom, rgba(255, 49, 49, 0.03) 0%, transparent 50%)',
            },
            '100%': {
              background:
                'radial-gradient(ellipse at top, rgba(122, 238, 229, 0.05) 0%, transparent 50%), radial-gradient(ellipse at bottom, rgba(122, 238, 229, 0.03) 0%, transparent 50%)',
            },
          },
          pointerEvents: 'none',
          zIndex: 0,
        },
      }}
    >
      <PageContainer sx={{ py: { xs: 4, md: 6 }, position: 'relative', zIndex: 1 }}>
        <Typography
          variant="h1"
          sx={{
            fontSize: { xs: '1.5rem', md: '2rem' },
            textTransform: 'uppercase',
            letterSpacing: { xs: '0.15em', md: '0.2em' },
            color: 'rgba(255,255,255,0.9)',
            fontWeight: 400,
            mb: 3,
          }}
        >
          <Skeleton variant="text" width={420} sx={{ bgcolor: 'rgba(255,255,255,0.10)' }} />
        </Typography>

        <Box sx={{ mt: 3, mb: 4 }}>
          <Skeleton variant="text" width="70%" sx={{ bgcolor: 'rgba(255,255,255,0.08)' }} />
          <Skeleton variant="text" width="52%" sx={{ bgcolor: 'rgba(255,255,255,0.08)' }} />
        </Box>

        {[...Array(3)].map((_, i) => (
          <Box
            key={i}
            sx={{
              mt: { xs: 4, md: 6 },
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: { xs: '0.75rem', md: '1rem' },
              backgroundColor: 'rgba(17, 17, 17, 0.35)',
              backdropFilter: 'blur(12px)',
              boxShadow: '0 10px 40px rgba(0, 0, 0, 0.55), inset 0 1px 0 rgba(255,255,255,0.06)',
              p: { xs: 1.5, md: 2.25 },
            }}
          >
            <Skeleton variant="text" width={120} sx={{ bgcolor: 'rgba(255,255,255,0.10)' }} />
            <Box sx={{ mt: 1.5 }}>
              {[...Array(3)].map((__, r) => (
                <Box
                  key={r}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1.5,
                    py: 1,
                    borderBottom: r === 2 ? 'none' : '1px solid rgba(255,255,255,0.06)',
                  }}
                >
                  <Skeleton variant="circular" width={22} height={22} sx={{ bgcolor: 'rgba(255,255,255,0.10)' }} />
                  <Skeleton variant="text" width="35%" sx={{ bgcolor: 'rgba(255,255,255,0.10)' }} />
                  <Skeleton variant="text" width="55%" sx={{ bgcolor: 'rgba(255,255,255,0.10)' }} />
                </Box>
              ))}
            </Box>
          </Box>
        ))}
      </PageContainer>
    </Box>
  );
}


