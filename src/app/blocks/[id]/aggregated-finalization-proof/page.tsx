import { Metadata } from 'next';
import { ContentBlock, PageContainer } from '@/components/ui';
import { Box, Grid, Typography } from '@mui/material';
import { PrettyJSON } from '@/components';
import { fetchAggregatedFinalizationProof } from '@/data';
import { GradientBackground, DimGradientBackground } from '@/components/ui';
import { CopyJsonButton } from './CopyJsonButton';

interface AggregatedFinalizationProofProps {
  params: {
    id: string;
  }
}

export const metadata: Metadata = {
  title: 'Aggregated Finalization Proof',
};

export default async function AggregatedFinalizationProofPage({ params }: AggregatedFinalizationProofProps) {
  const id = decodeURIComponent(params.id);
  const aggregatedFinalizationProof = await fetchAggregatedFinalizationProof(id);

  return (
    <GradientBackground sx={{ backgroundColor: '#000' }}>
      <DimGradientBackground>
        <PageContainer sx={{ pt: { xs: 3, md: 4 }, pb: { xs: 5, md: 7 } }}>
          <Box sx={{ mb: { xs: 3, md: 4 } }}>
            <Typography variant='h1' sx={{ fontSize: { xs: '1.5rem', md: '1.85rem' } }}>
              Aggregated Finalization Proof
            </Typography>
            <Typography sx={{ mt: 1, color: 'rgba(255,255,255,0.6)' }}>
              A set of signatures from a supermajority (2/3) that finalizes this block.
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
              <Grid item xs={12} md={6}>
                <ContentBlock
                  density='compact'
                  blurred
                  sx={{
                    border: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: { xs: '0.75rem', md: '1rem' },
                    backgroundColor: 'rgba(0,0,0,0.55)',
                    boxShadow:
                      '0 6px 24px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.06)',
                  }}
                  title='Block ID'
                  value={aggregatedFinalizationProof.blockID}
                  url={`/blocks/${aggregatedFinalizationProof.blockID}`}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <ContentBlock
                  density='compact'
                  blurred
                  sx={{
                    border: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: { xs: '0.75rem', md: '1rem' },
                    backgroundColor: 'rgba(0,0,0,0.55)',
                    boxShadow:
                      '0 6px 24px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.06)',
                  }}
                  title='Block hash'
                  value={aggregatedFinalizationProof.blockHash}
                />
              </Grid>

              <Grid item xs={12}>
                <ContentBlock
                  blurred
                  sx={{
                    border: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: { xs: '0.75rem', md: '1rem' },
                    backgroundColor: 'rgba(0,0,0,0.55)',
                    boxShadow:
                      '0 6px 24px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.06)',
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      mb: 1.25,
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: { xs: '0.6875rem', md: '0.75rem' },
                        textTransform: 'uppercase',
                        letterSpacing: { xs: '0.16em', md: '0.18em' },
                        color: 'rgba(255,255,255,0.65)',
                        fontWeight: 500,
                      }}
                    >
                      Proof JSON
                    </Typography>
                    <CopyJsonButton data={aggregatedFinalizationProof} />
                  </Box>
                  <PrettyJSON data={aggregatedFinalizationProof} />
                </ContentBlock>
              </Grid>
            </Grid>
          </Box>
        </PageContainer>
      </DimGradientBackground>
    </GradientBackground>
  );
}