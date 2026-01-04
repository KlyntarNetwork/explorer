import { Box, Skeleton, Typography } from '@mui/material';
import { DimGradientBackground, GradientBackground, PageContainer } from '@/components/ui';
import { LatestBlocksTableSkeleton } from './sections/BlocksByShard/LatestBlocksTableSkeleton';

export default function Loading() {
  return (
    <GradientBackground sx={{ backgroundColor: '#000' }}>
      <DimGradientBackground>
        <PageContainer sx={{ pt: { xs: 2.5, md: 3.5 }, pb: { xs: 4, md: 6 } }}>
          <Box sx={{ mb: { xs: 3, md: 4 } }}>
            <Typography variant="h1" sx={{ fontSize: { xs: '1.5rem', md: '1.85rem' } }}>
              <Skeleton variant="text" width={160} sx={{ bgcolor: 'rgba(255,255,255,0.10)' }} />
            </Typography>
            <Skeleton variant="text" width={520} sx={{ bgcolor: 'rgba(255,255,255,0.08)' }} />
          </Box>

          <Box
            sx={{
              border: '1px solid rgba(255,255,255,0.10)',
              borderRadius: { xs: '0.75rem', md: '1rem' },
              backgroundColor: 'rgba(17, 17, 17, 0.35)',
              backdropFilter: 'blur(12px)',
              boxShadow: '0 10px 40px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.06)',
              p: { xs: 1.5, md: 2.25 },
              mb: { xs: 3, md: 4 },
            }}
          >
            <Skeleton variant="text" width={220} sx={{ bgcolor: 'rgba(255,255,255,0.10)' }} />
            <Skeleton variant="text" width="60%" sx={{ bgcolor: 'rgba(255,255,255,0.08)' }} />
          </Box>

          <LatestBlocksTableSkeleton />
        </PageContainer>
      </DimGradientBackground>
    </GradientBackground>
  );
}


