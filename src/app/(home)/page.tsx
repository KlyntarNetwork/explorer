export const dynamic = 'force-dynamic';
import { Metadata } from 'next';
import { Box, Grid } from '@mui/material';
import {
  BlockchainInfoSearchBar,
  NetworkParameters,
  NetworkStatus,
  TopStatsRow
} from './sections';
import { fetchBlockchainData } from '@/data';
import { PageContainer } from '@/components/ui';

export const metadata: Metadata = {
  title: 'Home',
};

export default async function HomePage() {
  const blockchainData = await fetchBlockchainData();

  return (
    <Box
      sx={{
        position: 'relative',
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
            '10%': {
              background: 'radial-gradient(ellipse at top, rgba(122, 238, 229, 0.045) 0%, transparent 50%), radial-gradient(ellipse at bottom, rgba(122, 238, 229, 0.028) 0%, transparent 50%)',
            },
            '20%': {
              background: 'radial-gradient(ellipse at top, rgba(122, 238, 229, 0.04) 0%, transparent 50%), radial-gradient(ellipse at bottom, rgba(122, 238, 229, 0.025) 0%, transparent 50%)',
            },
            '30%': {
              background: 'radial-gradient(ellipse at top, rgba(122, 238, 229, 0.035) 0%, transparent 50%), radial-gradient(ellipse at bottom, rgba(122, 238, 229, 0.02) 0%, transparent 50%)',
            },
            '40%': {
              background: 'radial-gradient(ellipse at top, rgba(122, 238, 229, 0.03) 0%, transparent 50%), radial-gradient(ellipse at bottom, rgba(122, 238, 229, 0.015) 0%, transparent 50%)',
            },
            '50%': {
              background: 'radial-gradient(ellipse at top, rgba(255, 49, 49, 0.05) 0%, transparent 50%), radial-gradient(ellipse at bottom, rgba(255, 49, 49, 0.03) 0%, transparent 50%)',
            },
            '60%': {
              background: 'radial-gradient(ellipse at top, rgba(255, 49, 49, 0.045) 0%, transparent 50%), radial-gradient(ellipse at bottom, rgba(255, 49, 49, 0.028) 0%, transparent 50%)',
            },
            '70%': {
              background: 'radial-gradient(ellipse at top, rgba(255, 49, 49, 0.04) 0%, transparent 50%), radial-gradient(ellipse at bottom, rgba(255, 49, 49, 0.025) 0%, transparent 50%)',
            },
            '80%': {
              background: 'radial-gradient(ellipse at top, rgba(255, 49, 49, 0.035) 0%, transparent 50%), radial-gradient(ellipse at bottom, rgba(255, 49, 49, 0.02) 0%, transparent 50%)',
            },
            '90%': {
              background: 'radial-gradient(ellipse at top, rgba(255, 49, 49, 0.03) 0%, transparent 50%), radial-gradient(ellipse at bottom, rgba(255, 49, 49, 0.015) 0%, transparent 50%)',
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
      <BlockchainInfoSearchBar />
      <PageContainer sx={{ pt: { xs: 3, md: 4 }, pb: 5, position: 'relative', zIndex: 1 }}>
        <Box sx={{ mb: { xs: 3, md: 4 } }}>
          <TopStatsRow data={blockchainData} />
        </Box>

        <Grid container spacing={{ xs: 3, lg: 6 }} sx={{ alignItems: 'flex-start' }}>
          <Grid item xs={12} lg={6}>
            <NetworkParameters data={blockchainData} />
          </Grid>
          <Grid item xs={12} lg={6}>
            <NetworkStatus data={blockchainData} />
          </Grid>
        </Grid>
      </PageContainer>
    </Box>
  );
}
