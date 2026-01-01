'use client';
import { FC } from 'react';
import { Box, Typography } from '@mui/material';
import { PageContainer } from '@/components/ui';
import { ExplorerSearchBar } from './ExplorerSearchBar';
import { AnnouncementsTicker } from './AnnouncementsTicker';

export const BlockchainInfoSearchBar: FC = () => {
  return (
    <Box
      sx={{
        position: 'relative',
        overflow: 'hidden',
        backgroundColor: '#030405',
        pt: { xs: 8, md: 12 },
        pb: { xs: 3, md: 4 },
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        '&::before': {
          content: '""',
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          // Hero background: soft gradients + subtle dot matrix on the right (Solscan-ish)
          backgroundImage: [
            'radial-gradient(1200px 520px at 18% 8%, rgba(122,238,229,0.18), transparent 62%)',
            'radial-gradient(900px 520px at 78% -2%, rgba(255,49,49,0.12), transparent 62%)',
            'radial-gradient(760px 460px at 84% 34%, rgba(122,238,229,0.12), transparent 58%)',
            'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.11) 1px, transparent 1px)',
          ].join(','),
          backgroundSize: ['auto', 'auto', 'auto', '16px 16px'].join(','),
          backgroundPosition: ['0 0', '0 0', '0 0', 'right -24px top 0'].join(','),
          opacity: 1,
          transform: 'translateZ(0)',
          // Show dot matrix mostly on the right side
          WebkitMaskImage: 'linear-gradient(to left, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 54%)',
          maskImage: 'linear-gradient(to left, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 54%)',
        },
        '&::after': {
          content: '""',
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          height: { xs: 56, md: 72 },
          pointerEvents: 'none',
          background: 'linear-gradient(to bottom, rgba(0,0,0,0), rgba(0,0,0,0.92))',
        },
      }}
    >
      <PageContainer sx={{ position: 'relative', zIndex: 1 }}>
        <Box sx={{ mb: { xs: 2.5, md: 3 } }}>
          <Typography
            sx={{
              mb: 0.75,
              fontSize: { xs: 10, md: 11 },
              letterSpacing: '0.28em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.60)',
              userSelect: 'none',
            }}
          >
            KLY Explorer
          </Typography>
          <Typography
            sx={{
              fontSize: { xs: 28, sm: 34, md: 42 },
              lineHeight: { xs: 1.08, md: 1.06 },
              fontWeight: 700,
              letterSpacing: '-0.02em',
              color: '#fff',
              textWrap: 'balance',
            }}
          >
            Explore the Klyntar network
          </Typography>
          <Typography
            sx={{
              mt: 1,
              maxWidth: 760,
              fontSize: { xs: 13, md: 14 },
              lineHeight: 1.55,
              color: 'rgba(255,255,255,0.65)',
            }}
          >
            Search blocks, transactions, accounts, pools, and contracts in real time.
          </Typography>
        </Box>
        <ExplorerSearchBar />
        <Box sx={{ mt: { xs: 1.5, md: 2 } }}>
          <AnnouncementsTicker />
        </Box>
      </PageContainer>
    </Box>
  );
}

