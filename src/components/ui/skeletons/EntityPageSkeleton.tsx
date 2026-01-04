import { Box, Grid, Skeleton, Typography } from '@mui/material';
import { GlassPanel } from './GlassPanel';

const innerGlassSx = {
  border: '1px solid rgba(255,255,255,0.08)',
  borderRadius: { xs: '0.75rem', md: '1rem' },
  backgroundColor: 'rgba(0,0,0,0.55)',
  backdropFilter: 'blur(12px)',
  boxShadow: '0 6px 24px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.06)',
} as const;

function BlockSkeleton({ w = '60%', h = 18 }: { w?: number | string; h?: number }) {
  return <Skeleton variant="text" width={w} height={h} sx={{ bgcolor: 'rgba(255,255,255,0.10)' }} />;
}

export function EntityPageSkeleton({
  title = 'Loading',
  blocks = 8,
  showTable = false,
}: {
  title?: string;
  blocks?: number;
  showTable?: boolean;
}) {
  return (
    <>
      <Box sx={{ mb: { xs: 3, md: 4 } }}>
        <Typography variant="h1" sx={{ fontSize: { xs: '1.5rem', md: '1.85rem' } }}>
          <Skeleton variant="text" width={220} sx={{ bgcolor: 'rgba(255,255,255,0.10)' }} />
        </Typography>
        <Skeleton variant="text" width={420} sx={{ bgcolor: 'rgba(255,255,255,0.08)' }} />
      </Box>

      <GlassPanel sx={{ p: { xs: 1.5, md: 2.25 } }}>
        <Box sx={{ mb: 2 }}>
          <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.55)' }}>
            {title}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
            <Skeleton variant="text" width={280} height={34} sx={{ bgcolor: 'rgba(255,255,255,0.10)' }} />
            <Skeleton variant="rounded" width={86} height={26} sx={{ bgcolor: 'rgba(255,255,255,0.10)', borderRadius: 999 }} />
          </Box>
        </Box>

        <Grid container spacing={{ xs: 1.5, md: 2 }}>
          {[...Array(blocks)].map((_, i) => (
            <Grid key={i} item xs={12} md={i % 3 === 0 ? 12 : 6}>
              <Box sx={{ ...innerGlassSx, p: { xs: 1.25, md: 1.5 } }}>
                <BlockSkeleton w="38%" h={16} />
                <BlockSkeleton w="82%" h={22} />
              </Box>
            </Grid>
          ))}
        </Grid>
      </GlassPanel>

      {showTable && (
        <Box sx={{ mt: { xs: 3, md: 4 } }}>
          <Typography variant="h1" sx={{ fontSize: { xs: '1.25rem', md: '1.5rem' } }}>
            <Skeleton variant="text" width={180} sx={{ bgcolor: 'rgba(255,255,255,0.10)' }} />
          </Typography>
          <Skeleton variant="text" width={360} sx={{ bgcolor: 'rgba(255,255,255,0.08)' }} />
          <Box sx={{ mt: { xs: 2, md: 2.5 }, ...innerGlassSx, p: { xs: 1.5, md: 2 } }}>
            {[...Array(8)].map((__, r) => (
              <Box key={r} sx={{ display: 'flex', gap: 2, py: 1, borderBottom: r === 7 ? 'none' : '1px solid rgba(255,255,255,0.06)' }}>
                <Skeleton variant="text" width="18%" sx={{ bgcolor: 'rgba(255,255,255,0.10)' }} />
                <Skeleton variant="text" width="26%" sx={{ bgcolor: 'rgba(255,255,255,0.10)' }} />
                <Skeleton variant="text" width="18%" sx={{ bgcolor: 'rgba(255,255,255,0.10)' }} />
                <Skeleton variant="text" width="22%" sx={{ bgcolor: 'rgba(255,255,255,0.10)' }} />
              </Box>
            ))}
          </Box>
        </Box>
      )}
    </>
  );
}


