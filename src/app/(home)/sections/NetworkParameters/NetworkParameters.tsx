import { FC } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import { BlockchainData } from '@/definitions';

interface Props {
  data: BlockchainData
}

export const NetworkParameters:FC<Props> = async ({ data }) => {
  return (
    <Box
      sx={{
        backgroundColor: '#000',
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: { xs: '0.5rem', md: '0.75rem' },
        p: { xs: '1.5rem', md: '2rem' },
       
        display: 'flex',
        flexDirection: 'column',
        gap: { xs: '1.25rem', md: '1.5rem' },
        height: '100%',
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
            '10%': {
              background: 'linear-gradient(135deg, rgba(122, 238, 229, 0.028) 0%, transparent 50%)',
            },
            '20%': {
              background: 'linear-gradient(135deg, rgba(122, 238, 229, 0.025) 0%, transparent 50%)',
            },
            '30%': {
              background: 'linear-gradient(135deg, rgba(122, 238, 229, 0.02) 0%, transparent 50%)',
            },
            '40%': {
              background: 'linear-gradient(135deg, rgba(122, 238, 229, 0.015) 0%, transparent 50%)',
            },
            '50%': {
              background: 'linear-gradient(135deg, rgba(255, 49, 49, 0.03) 0%, transparent 50%)',
            },
            '60%': {
              background: 'linear-gradient(135deg, rgba(255, 49, 49, 0.028) 0%, transparent 50%)',
            },
            '70%': {
              background: 'linear-gradient(135deg, rgba(255, 49, 49, 0.025) 0%, transparent 50%)',
            },
            '80%': {
              background: 'linear-gradient(135deg, rgba(255, 49, 49, 0.02) 0%, transparent 50%)',
            },
            '90%': {
              background: 'linear-gradient(135deg, rgba(255, 49, 49, 0.015) 0%, transparent 50%)',
            },
            '100%': {
              background: 'linear-gradient(135deg, rgba(122, 238, 229, 0.03) 0%, transparent 50%)',
            },
          },
        },
      }}
    >
      <Typography
        component='h2'
        sx={{
          fontSize: { xs: '0.6875rem', md: '0.75rem' },
          textTransform: 'uppercase',
          letterSpacing: { xs: '0.35em', md: '0.45em' },
          color: 'rgba(255,255,255,0.45)',
          fontWeight: 400,
        }}
      >
        Network Parameters
      </Typography>
      
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: 'repeat(4, 1fr)' },
          gridTemplateRows: { md: 'auto auto auto auto' },
          gap: { xs: '0.75rem', md: '0.875rem' },
        }}
      >
        {/* Network ID - занимает всю ширину */}
        <Box
          sx={{
            gridColumn: { xs: '1', md: '1 / -1' },
          }}
        >
          <ContentItem title='Network ID' value={data.chainInfo.networkId} />
        </Box>
        
        {/* Validator stake size - занимает 2 колонки */}
        <Box
          sx={{
            gridColumn: { xs: '1', md: 'span 2' },
          }}
        >
          <ContentItem title='Validator stake size' value={data.chainInfo.validatorStakeSize} />
        </Box>
        
        {/* Core major version - занимает 2 колонки */}
        <Box
          sx={{
            gridColumn: { xs: '1', md: 'span 2' },
          }}
        >
          <ContentItem title='Core major version' value={data.chainInfo.coreMajorVersion} />
        </Box>
        
        {/* Quorum size - занимает 2 колонки */}
        <Box
          sx={{
            gridColumn: { xs: '1', md: 'span 2' },
          }}
        >
          <ContentItem title='Quorum size' value={data.chainInfo.quorumSize} />
        </Box>
        
        {/* Minimal stake size - занимает 2 колонки */}
        <Box
          sx={{
            gridColumn: { xs: '1', md: 'span 2' },
          }}
        >
          <ContentItem title='Minimal stake size' value={data.chainInfo.minimalStakePerEntity} />
        </Box>
        
        {/* Epoch duration - занимает 2 колонки */}
        <Box
          sx={{
            gridColumn: { xs: '1', md: 'span 2' },
          }}
        >
          <ContentItem title='Epoch duration' value={data.chainInfo.epochDuration} />
        </Box>
        
        {/* Leader timeframe - занимает 2 колонки */}
        <Box
          sx={{
            gridColumn: { xs: '1', md: 'span 2' },
          }}
        >
          <ContentItem title='Leader timeframe' value={data.chainInfo.leaderTimeframe} />
        </Box>
        
        {/* Slot time - занимает 2 колонки */}
        <Box
          sx={{
            gridColumn: { xs: '1', md: 'span 2' },
          }}
        >
          <ContentItem title='Slot time(block time)' value={data.chainInfo.slotTime} />
        </Box>
        
        {/* Max block size - занимает 2 колонки */}
        <Box
          sx={{
            gridColumn: { xs: '1', md: 'span 2' },
          }}
        >
          <ContentItem title='Max block size' value={data.chainInfo.maxBlockSize} />
        </Box>
      </Box>
    </Box>
  );
}

const ContentItem: FC<{ title: string, value: string | number }> = ({
  title,
  value
}) => {
  return (
      <Box
        sx={{
          border: '1px solid rgba(255,255,255,0.1)',
          px: { xs: '0.875rem', md: '1rem' },
          py: { xs: '0.75rem', md: '0.875rem' },
          backgroundColor: 'rgba(17, 17, 17, 0.3)',
          backdropFilter: 'blur(5px)',
          display: 'flex',
          flexDirection: 'column',
          gap: { xs: '0.375rem', md: '0.5rem' },
          height: '100%',
          boxShadow: '0 2px 12px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.03)',
          transition: 'border-color 0.3s ease, background-color 0.3s ease, transform 0.3s ease',
          position: 'relative',
          animation: 'subtleGlow 10s ease-in-out infinite',
          '@keyframes subtleGlow': {
            '0%': {
              boxShadow: '0 2px 12px rgba(0, 0, 0, 0.3), 0 0 8px rgba(122, 238, 229, 0.05), inset 0 1px 0 rgba(255, 255, 255, 0.03)',
            },
            '10%': {
              boxShadow: '0 2px 12px rgba(0, 0, 0, 0.3), 0 0 8px rgba(122, 238, 229, 0.04), inset 0 1px 0 rgba(255, 255, 255, 0.03)',
            },
            '20%': {
              boxShadow: '0 2px 12px rgba(0, 0, 0, 0.3), 0 0 8px rgba(122, 238, 229, 0.03), inset 0 1px 0 rgba(255, 255, 255, 0.03)',
            },
            '30%': {
              boxShadow: '0 2px 12px rgba(0, 0, 0, 0.3), 0 0 8px rgba(122, 238, 229, 0.02), inset 0 1px 0 rgba(255, 255, 255, 0.03)',
            },
            '40%': {
              boxShadow: '0 2px 12px rgba(0, 0, 0, 0.3), 0 0 8px rgba(122, 238, 229, 0.015), inset 0 1px 0 rgba(255, 255, 255, 0.03)',
            },
            '50%': {
              boxShadow: '0 2px 12px rgba(0, 0, 0, 0.3), 0 0 8px rgba(255, 49, 49, 0.05), inset 0 1px 0 rgba(255, 255, 255, 0.03)',
            },
            '60%': {
              boxShadow: '0 2px 12px rgba(0, 0, 0, 0.3), 0 0 8px rgba(255, 49, 49, 0.04), inset 0 1px 0 rgba(255, 255, 255, 0.03)',
            },
            '70%': {
              boxShadow: '0 2px 12px rgba(0, 0, 0, 0.3), 0 0 8px rgba(255, 49, 49, 0.03), inset 0 1px 0 rgba(255, 255, 255, 0.03)',
            },
            '80%': {
              boxShadow: '0 2px 12px rgba(0, 0, 0, 0.3), 0 0 8px rgba(255, 49, 49, 0.02), inset 0 1px 0 rgba(255, 255, 255, 0.03)',
            },
            '90%': {
              boxShadow: '0 2px 12px rgba(0, 0, 0, 0.3), 0 0 8px rgba(255, 49, 49, 0.015), inset 0 1px 0 rgba(255, 255, 255, 0.03)',
            },
            '100%': {
              boxShadow: '0 2px 12px rgba(0, 0, 0, 0.3), 0 0 8px rgba(122, 238, 229, 0.05), inset 0 1px 0 rgba(255, 255, 255, 0.03)',
            },
          },
          '&:hover': {
            borderColor: 'rgba(255,255,255,0.2)',
            backgroundColor: 'rgba(17, 17, 17, 0.5)',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.4), 0 0 15px rgba(122, 238, 229, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
            transform: 'translateY(-1px)',
            animation: 'hoverGlow 10s ease-in-out infinite',
            '@keyframes hoverGlow': {
              '0%': {
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.4), 0 0 15px rgba(122, 238, 229, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
              },
              '10%': {
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.4), 0 0 15px rgba(122, 238, 229, 0.07), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
              },
              '20%': {
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.4), 0 0 15px rgba(122, 238, 229, 0.05), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
              },
              '30%': {
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.4), 0 0 15px rgba(122, 238, 229, 0.03), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
              },
              '40%': {
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.4), 0 0 15px rgba(122, 238, 229, 0.02), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
              },
              '50%': {
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.4), 0 0 15px rgba(255, 49, 49, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
              },
              '60%': {
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.4), 0 0 15px rgba(255, 49, 49, 0.07), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
              },
              '70%': {
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.4), 0 0 15px rgba(255, 49, 49, 0.05), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
              },
              '80%': {
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.4), 0 0 15px rgba(255, 49, 49, 0.03), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
              },
              '90%': {
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.4), 0 0 15px rgba(255, 49, 49, 0.02), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
              },
              '100%': {
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.4), 0 0 15px rgba(122, 238, 229, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
              },
            },
          },
        }}
      >
      <Typography
        component='p'
        sx={{
          fontSize: { xs: '0.625rem', md: '0.6875rem' },
          textTransform: 'uppercase',
          letterSpacing: { xs: '0.2em', md: '0.25em' },
          color: 'rgba(255,255,255,0.5)',
          fontWeight: 400,
        }}
      >
        {title}
      </Typography>
      <Typography
        component='p'
        sx={{
          fontSize: { xs: '0.875rem', md: '0.9375rem' },
          fontWeight: 300,
          wordBreak: 'break-word',
          color: '#fff',
          letterSpacing: '0.02em',
          lineHeight: 1.4,
        }}
      >
        {value}
      </Typography>
    </Box>
  );
}