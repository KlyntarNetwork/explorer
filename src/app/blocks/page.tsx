import { Metadata } from 'next';
import { Box, Typography } from '@mui/material';
import {
  GeneralBlocksInfo,
  BlocksByShard
} from './sections';
import { GradientBackground, DimGradientBackground } from '@/components/ui';
import { PageContainer } from '@/components/ui';

interface Props {
  searchParams: {
    shard?: string;
    page?: string;
    rows?: string;
  }
}

export const metadata: Metadata = {
  title: 'Blocks',
};

export default function BlocksPage({ searchParams }: Props) {
  const shard = searchParams?.shard || '';
  const currentPage = Number(searchParams?.page) || 1;
  const rowsPerPage = Math.min(100, Math.max(10, Number(searchParams?.rows) || 10));

  return (
    <GradientBackground sx={{ backgroundColor: '#000' }}>
      <DimGradientBackground>
        <PageContainer sx={{ pt: { xs: 2.5, md: 3.5 }, pb: { xs: 4, md: 6 } }}>
          <Box sx={{ mb: { xs: 3, md: 4 } }}>
            <Typography variant='h1' sx={{ fontSize: { xs: '1.5rem', md: '1.85rem' } }}>
              Blocks
            </Typography>
            <Typography sx={{ mt: 1, color: 'rgba(255,255,255,0.6)' }}>
              Browse blocks by shard, inspect details, and explore network activity.
            </Typography>
          </Box>

          <GeneralBlocksInfo />
          <BlocksByShard shard={shard} currentPage={currentPage} rowsPerPage={rowsPerPage} />
        </PageContainer>
      </DimGradientBackground>
    </GradientBackground>
  );
}