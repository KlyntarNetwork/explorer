import { FC, Suspense } from 'react';
import Link from 'next/link';
import { ButtonPagination, FlexCenterBox, Label, PageContainer } from '@/components/ui';
import { Box, Grid, Typography } from '@mui/material';
import BTCIcon from '@public/icons/currencies/BTC.svg';
import ETHIcon from '@public/icons/currencies/ETH.svg';
import SOLIcon from '@public/icons/currencies/SOL.svg';
import LaunchIcon from '@mui/icons-material/Launch';

interface Checkpoint {
  hostchain: string;
  hash: string;
  isSuccessful: boolean;
  url: string;
}

const checkpointsData: Checkpoint[] = [
  {
    hostchain: 'BTC',
    hash: 'b43cede8cb0cfbe5b4f96cc5a37c0e35f8a153b65844899058681b0a9880015a',
    isSuccessful: true,
    url: '#'
  },
  {
    hostchain: 'ETH',
    hash: '0xc9e984f8c47a5488042d090e301fcd9bfb3f0a4b2b06c487e1bf6e16b27f9fdb',
    isSuccessful: true,
    url: '#'
  },
  {
    hostchain: 'SOL',
    hash: '3GTDR7Etmhw2Y4nxmyTN58TyvRqp8n7pL3dMaUc2C6CcJq6RwxKSb18QCmD1xLB2j9wAkFzoGe1qR8gAWK62GBzv',
    isSuccessful: true,
    url: '#'
  },
];

const icons: {[hostchain: string]: any} = {
  'BTC': <BTCIcon />,
  'ETH': <ETHIcon />,
  'SOL': <SOLIcon />
}

export default function CheckpointsPage() {
  return (
    <Box
      sx={{
        position: 'relative',
        backgroundColor: '#000',
        minHeight: '100vh',
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
            '50%': {
              background: 'radial-gradient(ellipse at top, rgba(255, 49, 49, 0.05) 0%, transparent 50%), radial-gradient(ellipse at bottom, rgba(255, 49, 49, 0.03) 0%, transparent 50%)',
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
      <PageContainer sx={{ py: { xs: 4, md: 6 }, position: 'relative', zIndex: 1 }}>
        <Typography
          variant='h1'
          sx={{
            fontSize: { xs: '1.5rem', md: '2rem' },
            textTransform: 'uppercase',
            letterSpacing: { xs: '0.15em', md: '0.2em' },
            color: 'rgba(255,255,255,0.9)',
            fontWeight: 400,
            mb: 3,
          }}
        >
          Checkpoints to hostchains
        </Typography>
        <Box sx={{ mt: 3, mb: 4 }}>
          <Typography
            sx={{
              display: 'inline',
              fontSize: { xs: '0.875rem', md: '1rem' },
              color: 'rgba(255,255,255,0.6)',
              fontWeight: 300,
              lineHeight: 1.6,
            }}
          >
            These checkpoints help the network to prevent long range attacks
          </Typography>
          {' '}
          <Typography
            sx={{
              display: { xs: 'inline', md: 'block' },
              fontSize: { xs: '0.875rem', md: '1rem' },
              color: 'rgba(255,255,255,0.6)',
              fontWeight: 300,
              lineHeight: 1.6,
            }}
          >
            and prove you that the history has only one variant
          </Typography>
        </Box>

        <EpochCheckpoints
          epochId={70}
          checkpoints={checkpointsData}
        />
        <EpochCheckpoints
          epochId={69}
          checkpoints={checkpointsData.map((c, i) => i === 2 ? {...c, isSuccessful: false} : c)}
        />
        <EpochCheckpoints
          epochId={68}
          checkpoints={checkpointsData.map((c, i) => i === 1 || i === 2 ? {...c, isSuccessful: false} : c)}
        />
      </PageContainer>

      <FlexCenterBox sx={{ mt: 4, position: 'relative', zIndex: 1 }}>
        <Suspense>
          <ButtonPagination />
        </Suspense>
      </FlexCenterBox>
    </Box>
  );
}

interface CheckpointsPerEpochProps {
  epochId: number;
  checkpoints: Checkpoint[];
}

const EpochCheckpoints: FC<CheckpointsPerEpochProps> = ({
  epochId,
  checkpoints
}) => {
  const total = checkpoints.length;
  const successful = checkpoints.filter(c => c.isSuccessful).length;

  const color = successful === total
    ? '#7aeee5'
    : successful === total - 1
    ? 'rgba(252, 255, 80, 1)'
    : 'rgba(255, 49, 49, 0.9)';

  const bgColor = (isSuccessful: boolean) => isSuccessful
    ? 'rgba(122, 238, 229, 0.15)'
    : 'rgba(255, 49, 49, 0.15)';

  return (
    <Box
      sx={{
        mt: { xs: 4, md: 6 },
        backgroundColor: '#000',
        border: '1px solid rgba(255,255,255,0.1)',
        p: { xs: '1.5rem', md: '2rem' },
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
        position: 'relative',
        '&::after': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(135deg, rgba(122, 238, 229, 0.03) 0%, transparent 50%)',
          pointerEvents: 'none',
          opacity: 0.5,
          animation: 'colorPulse 10s ease-in-out infinite',
          '@keyframes colorPulse': {
            '0%': {
              background: 'linear-gradient(135deg, rgba(122, 238, 229, 0.03) 0%, transparent 50%)',
            },
            '50%': {
              background: 'linear-gradient(135deg, rgba(255, 49, 49, 0.03) 0%, transparent 50%)',
            },
            '100%': {
              background: 'linear-gradient(135deg, rgba(122, 238, 229, 0.03) 0%, transparent 50%)',
            },
          },
        },
      }}
    >
      <Typography
        variant='h2'
        sx={{
          fontSize: { xs: '1.125rem', md: '1.25rem' },
          textTransform: 'uppercase',
          letterSpacing: { xs: '0.12em', md: '0.15em' },
          color: 'rgba(255,255,255,0.9)',
          fontWeight: 400,
          mb: 1,
        }}
      >
        Epoch {epochId}
        <Typography
          component='span'
          sx={{
            fontSize: { xs: '0.75rem', md: '0.875rem' },
            textTransform: 'uppercase',
            letterSpacing: { xs: '0.1em', md: '0.12em' },
            color: 'rgba(255,255,255,0.4)',
            fontWeight: 300,
            ml: 1,
          }}
        >
          (Simulated data)
        </Typography>
      </Typography>
      <Typography
        sx={{
          fontSize: { xs: '0.75rem', md: '0.875rem' },
          textTransform: 'uppercase',
          letterSpacing: { xs: '0.1em', md: '0.12em' },
          color: 'rgba(255,255,255,0.5)',
          fontWeight: 300,
          mt: 2,
        }}
      >
        Checkpoints:
      </Typography>

      <Typography
        sx={{
          fontSize: { xs: '1.25rem', md: '1.5rem' },
          fontWeight: 400,
          mt: 0.5,
          color: color,
        }}
      >
        {successful}/{total}
      </Typography>

      <Box sx={{ mt: 3 }}>
        {checkpoints.map(checkpoint => (
          <Box
            key={checkpoint.hash}
            sx={{
              mt: { xs: 1.5, md: 2 },
              border: '1px solid rgba(255,255,255,0.1)',
              backgroundColor: 'rgba(17, 17, 17, 0.4)',
              backdropFilter: 'blur(10px)',
              display: 'flex',
              minHeight: { xs: '75px', md: '85px' },
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
              transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
              '&:hover': {
                borderColor: 'rgba(255,255,255,0.2)',
                boxShadow: '0 8px 30px rgba(0, 0, 0, 0.6), 0 0 15px rgba(122, 238, 229, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
              },
            }}
          >
            <Box
              sx={{
                width: { xs: '80px', md: '100px', lg: '120px' },
                backgroundColor: bgColor(checkpoint.isSuccessful),
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexShrink: 0,
              }}
            >
              {icons[checkpoint.hostchain]}
            </Box>
            <Box
              sx={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                pl: { xs: 2, md: 4 },
                py: 2,
                overflow: 'hidden',
              }}
            >
              {checkpoint.isSuccessful ? (
                <Link
                  href={checkpoint.url}
                  passHref
                  target='_blank'
                  style={{ textDecoration: 'none', width: '100%' }}
                >
                  <Typography
                    sx={{
                      fontSize: { xs: '0.875rem', md: '1rem' },
                      fontWeight: 400,
                      wordBreak: 'break-all',
                      whiteSpace: 'pre-wrap',
                      color: '#7aeee5',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1,
                      transition: 'color 0.3s ease',
                      '&:hover': {
                        color: '#fff',
                      },
                    }}
                  >
                    <LaunchIcon sx={{ fontSize: { xs: '1rem', md: '1.25rem' }, flexShrink: 0 }} />
                    {checkpoint.hash}
                  </Typography>
                </Link>
              ) : (
                <Label variant='red'>
                  N/A
                </Label>
              )}
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
}