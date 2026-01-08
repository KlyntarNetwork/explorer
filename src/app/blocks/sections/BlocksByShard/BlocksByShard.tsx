import { FC, Suspense } from 'react';
import { Box, Typography } from '@mui/material';
import { LatestBlocksTable } from './LatestBlocksTable';
import { LatestBlocksTableSkeleton } from './LatestBlocksTableSkeleton';
import { ShowRowsSelect } from './ShowRowsSelect';

interface BlocksByShardProps {
  shard: string;
  from?: number;
  rowsPerPage: number;
}

export const BlocksByShard: FC<BlocksByShardProps> = async ({
  shard,
  from,
  rowsPerPage,
}: BlocksByShardProps) => {
  return (
    <Box sx={{ mt: { xs: 3, md: 4 } }}>
      <Box
        sx={{
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: { xs: '0.75rem', md: '1rem' },
          backgroundColor: 'rgba(17, 17, 17, 0.35)',
          backdropFilter: 'blur(12px)',
          boxShadow:
            '0 10px 40px rgba(0, 0, 0, 0.55), inset 0 1px 0 rgba(255,255,255,0.06)',
          p: { xs: 2, md: 3 },
        }}
      >
        <Typography variant='h1' sx={{ fontSize: { xs: '1.5rem', md: '2rem' } }}>
          Blocks by shard
        </Typography>
        <Typography sx={{ mt: 1, mb: { xs: 2, md: 2.5 }, color: 'rgba(255,255,255,0.6)' }}>
          Pick a shard to explore the latest blocks and navigate through pages.
        </Typography>

        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              gap: { xs: 1.25, md: 2 },
              alignItems: { md: 'center' },
              justifyContent: 'space-between',
            }}
          >
            <ShowRowsSelect value={rowsPerPage} />
          </Box>
        </Box>

        <Suspense key={`${shard}_${from ?? 'latest'}_${rowsPerPage}`} fallback={<LatestBlocksTableSkeleton />}>
          <LatestBlocksTable shard={shard} from={from} rowsPerPage={rowsPerPage} />
        </Suspense>
      </Box>
    </Box>
  );
}