import { Metadata } from 'next';
import { NavButton, PageContainer, FlexBetweenBox, ContentBlock, GradientBackground, DimGradientBackground } from '@/components/ui';
import { Box, Grid, Typography } from '@mui/material';
import { fetchEpochById } from '@/data';
import { FormattedDate } from '@/helpers';
import { ValidatorsQuorumSection } from './ValidatorsQuorumSection';

interface Props {
  params: {
    id: string;
  }
}

export const metadata: Metadata = {
  title: 'Epoch info',
};

export default async function PoolByIdPage({ params }: Props) {
  const id = decodeURIComponent(params.id);
  const epoch = await fetchEpochById(Number(id));

  const startedAt = new FormattedDate(epoch.startTimestamp).UTCHoursMinutesSeconds;

  const previousEpochRoute = `/epochs/${epoch.isFirst ? epoch.id : epoch.id - 1}`;
  const nextEpochRoute = `/epochs/${epoch.isCurrent ? epoch.id : epoch.id + 1}`;

  return (
    <GradientBackground sx={{ backgroundColor: '#000' }}>
      <DimGradientBackground>
        <PageContainer sx={{ pt: { xs: 3, md: 4 }, pb: { xs: 5, md: 7 } }}>
          <FlexBetweenBox sx={{ mb: { xs: 2, md: 2.5 } }}>
            <NavButton
              url={previousEpochRoute}
              variant='back'
              label='Previous epoch'
              sx={{ mb: 0 }}
              disabled={epoch.isFirst}
            />
            <NavButton
              url={nextEpochRoute}
              variant='forward'
              label='Next epoch'
              sx={{ mb: 0 }}
              disabled={epoch.isCurrent}
            />
          </FlexBetweenBox>

          <Box sx={{ mb: { xs: 3, md: 4 } }}>
            <Typography variant='h1' sx={{ fontSize: { xs: '1.5rem', md: '1.85rem' } }}>
              {epoch.isCurrent ? 'Current epoch' : 'Epoch'} {epoch.id}
            </Typography>
            <Typography sx={{ mt: 1, color: 'rgba(255,255,255,0.6)' }}>
              Epoch metadata, validator quorum and aggregated statistics.
            </Typography>
          </Box>

          <Box
            sx={{
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: { xs: '0.75rem', md: '1rem' },
              backgroundColor: 'rgba(17, 17, 17, 0.35)',
              backdropFilter: 'blur(12px)',
              boxShadow:
                '0 10px 40px rgba(0, 0, 0, 0.55), inset 0 1px 0 rgba(255,255,255,0.06)',
              p: { xs: 1.5, md: 2.25 },
            }}
          >
            <Grid container spacing={{ xs: 1.5, md: 2 }}>
              <Grid item xs={12}>
                <ContentBlock density="compact" blurred sx={glassBlockSx} title="Started at" value={startedAt} />
              </Grid>
              <Grid item xs={12} md={6}>
                <ContentBlock density="compact" blurred sx={glassBlockSx} title="Epoch index" value={epoch.id} />
              </Grid>
              <Grid item xs={12} md={6}>
                <ContentBlock density="compact" blurred sx={glassBlockSx} title="Shards" value={epoch.shardsNumber} />
              </Grid>
              <Grid item xs={12} md={6}>
                <ContentBlock density="compact" blurred sx={glassBlockSx} title="Quorum size" value={epoch.quorumSize} />
              </Grid>
              <Grid item xs={12} md={6}>
                <ContentBlock density="compact" blurred sx={glassBlockSx} title="Total validators" value={epoch.validatorsNumber} />
              </Grid>
              <Grid item xs={12} md={4}>
                <ContentBlock density="compact" blurred sx={glassBlockSx} title="Blocks generated" value={epoch.totalBlocksNumber} />
              </Grid>
              <Grid item xs={12} md={4}>
                <ContentBlock density="compact" blurred sx={glassBlockSx} title="Transactions executed" value={epoch.totalTxsNumber} />
              </Grid>
              <Grid item xs={12} md={4}>
                <ContentBlock density="compact" blurred sx={glassBlockSx} title="Txs success rate" value={epoch.txsSuccessRate} />
              </Grid>
              <Grid item xs={12}>
                <ContentBlock density="compact" blurred sx={glassBlockSx} title="Epoch hash" value={epoch.hash} />
              </Grid>
            </Grid>
          </Box>

          <ValidatorsQuorumSection epoch={epoch} />
        </PageContainer>
      </DimGradientBackground>
    </GradientBackground>
  );
}

const glassBlockSx = {
  border: '1px solid rgba(255,255,255,0.08)',
  borderRadius: { xs: '0.75rem', md: '1rem' },
  backgroundColor: 'rgba(0,0,0,0.55)',
  boxShadow:
    '0 6px 24px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.06)',
};