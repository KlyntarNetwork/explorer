import { FC } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import { RedGradientBackground } from '@/components/ui';
import { BlockchainData } from '@/definitions';

interface Props {
  data: BlockchainData
}

export const NetworkParameters:FC<Props> = async ({ data }) => {
  return (
    <RedGradientBackground sx={{ p: { xs: 3, md: 4 }, pb: { xl: 13, sm: 10 }, color: '#e6edf7' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
        <Box sx={{
          width: 38,
          height: 38,
          borderRadius: '12px',
          background: 'linear-gradient(135deg, rgba(255,95,146,0.25), rgba(255,255,255,0.06))',
          boxShadow: '0 0 25px rgba(255, 95, 146, 0.45)',
          border: '1px solid rgba(255,95,146,0.4)'
        }} />
        <Box>
          <Typography variant='h1' sx={{ fontSize: { xs: '22px', md: '28px' }, letterSpacing: '0.05em' }}>
            Network Parameters
          </Typography>
          <Typography variant='body2' color='text.secondary' sx={{ mt: 0.25 }}>
            Core protocol settings wrapped in a high-fidelity, dark shell.
          </Typography>
        </Box>
      </Box>
      <Grid container spacing={1.5} sx={{ mt: 1 }}>
        <Grid item xs={12}>
          <ContentItem title='Network ID' value={data.chainInfo.networkId} />
        </Grid>
        <Grid item xs={12} md={6}>
          <ContentItem title='Validator stake size' value={data.chainInfo.validatorStakeSize} />
        </Grid>
        <Grid item xs={12} md={6}>
          <ContentItem title='Core major version' value={data.chainInfo.coreMajorVersion} />
        </Grid>
        <Grid item xs={12} md={6}>
          <ContentItem title='Quorum size' value={data.chainInfo.quorumSize} />
        </Grid>
        <Grid item xs={12} md={6}>
          <ContentItem title='Minimal stake size' value={data.chainInfo.minimalStakePerEntity} />
        </Grid>
        <Grid item xs={12} md={6}>
          <ContentItem title='Epoch duration' value={data.chainInfo.epochDuration} />
        </Grid>
        <Grid item xs={12} md={6}>
          <ContentItem title='Leader timeframe' value={data.chainInfo.leaderTimeframe} />
        </Grid>
        <Grid item xs={12} md={6}>
          <ContentItem title='Slot time(block time)' value={data.chainInfo.slotTime} />
        </Grid>
        <Grid item xs={12} md={6}>
          <ContentItem title='Max block size' value={data.chainInfo.maxBlockSize} />
        </Grid>
      </Grid>
    </RedGradientBackground>
  );
}

const ContentItem: FC<{ title: string, value: string | number }> = ({
  title,
  value
}) => {
  return (
    <Box
      sx={{
        position: 'relative',
        overflow: 'hidden',
        px: 2.25,
        py: 2,
        borderRadius: '14px',
        border: '1px solid rgba(255,255,255,0.08)',
        background: 'linear-gradient(140deg, rgba(21, 28, 42, 0.9) 0%, rgba(11, 15, 24, 0.95) 100%)',
        boxShadow: '0 18px 50px rgba(0, 0, 0, 0.6)',
        transition: 'border-color 0.2s ease, transform 0.2s ease',
        '&::before': {
          content: '""',
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(90deg, rgba(255,95,146,0.16), rgba(255,255,255,0))',
          opacity: 0.7,
          pointerEvents: 'none'
        },
        '&:hover': {
          borderColor: 'rgba(255,95,146,0.35)',
          transform: 'translateY(-4px)'
        }
      }}
    >
      <Typography
        variant='caption'
        color='text.secondary'
        sx={{ letterSpacing: '0.08em', textTransform: 'uppercase' }}
      >
        {title}
      </Typography>
      <Typography sx={{ fontWeight: 700, wordBreak: 'break-word', mt: 0.5, fontSize: '18px' }}>
        {value}
      </Typography>
    </Box>
  );
};
