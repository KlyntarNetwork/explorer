import { Metadata } from 'next';
import { Box, Typography } from '@mui/material';
import { redirect } from 'next/navigation';
import {
  GeneralBlocksInfo,
  BlocksByShard
} from './sections';
import { GradientBackground, DimGradientBackground } from '@/components/ui';
import { PageContainer } from '@/components/ui';
import { fetchLatestBlockHeightByShard } from '@/data';
import { getDefaultShardId } from '@/config/shards';

interface Props {
  searchParams: {
    shard?: string;
    from?: string;
    // legacy (was used for "load more" style paging)
    page?: string;
    rows?: string;
  }
}

export const metadata: Metadata = {
  title: 'Blocks',
};

export default async function BlocksPage({ searchParams }: Props) {
  const shard = searchParams?.shard || getDefaultShardId();
  const from = searchParams?.from ? Number(searchParams.from) : undefined;
  const rowsPerPage = Math.min(100, Math.max(10, Number(searchParams?.rows) || 10));

  if (!Number.isFinite(from as any)) {
    const latestHeight = await fetchLatestBlockHeightByShard(shard);
    const legacyPage = Math.max(1, Number(searchParams?.page) || 1);
    const computedFrom = Math.max(0, latestHeight - (legacyPage - 1) * rowsPerPage);
    const params = new URLSearchParams();
    params.set('shard', shard);
    params.set('rows', String(rowsPerPage));
    params.set('from', String(computedFrom));
    redirect(`/blocks?${params.toString()}`);
  }

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
          <BlocksByShard shard={shard} from={from} rowsPerPage={rowsPerPage} />
        </PageContainer>
      </DimGradientBackground>
    </GradientBackground>
  );
}