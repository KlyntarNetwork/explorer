'use client';
import { FC } from 'react';
import { Box, Typography } from '@mui/material';
import Link from 'next/link';
import { BlockchainData } from '@/definitions';
import { logUserAction } from '@/helpers';
import { LOCATION, USER_ACTIONS } from '@/constants';
import BlockIcon from '@mui/icons-material/ViewModule';
import EpochIcon from '@mui/icons-material/History';
import CheckpointIcon from '@mui/icons-material/Verified';
import VoteIcon from '@mui/icons-material/HowToVote';
import ContractIcon from '@mui/icons-material/Description';
import StakingIcon from '@mui/icons-material/TrendingUp';
import AppchainIcon from '@mui/icons-material/AccountTree';
import MutationIcon from '@mui/icons-material/AutoFixHigh';
import ChartIcon from '@mui/icons-material/BarChart';

interface Props {
  data: BlockchainData
}

interface NetworkInfoItem {
  title: string;
  url: string;
  icon: React.ComponentType<any>;
  size: 'small' | 'medium' | 'large';
}

export const NetworkStatus:FC<Props> = ({ data }) => {
  const networkInfoItems: NetworkInfoItem[] = [
    { title: 'Blocks', url: '/blocks', icon: BlockIcon, size: 'large' },
    { title: 'Epochs', url: '/epochs/' + data.epochId, icon: EpochIcon, size: 'small' },
    { title: 'Voting & DAO', url: '/contracts/dao_voting', icon: VoteIcon, size: 'small' },
    { title: 'Checkpoints', url: '/checkpoints', icon: CheckpointIcon, size: 'medium' },
    { title: 'RWX Contracts', url: '/contracts/rwx_contract', icon: ContractIcon, size: 'medium' },
    { title: 'Multistaking', url: '/contracts/multistaking', icon: StakingIcon, size: 'small' },
    { title: 'Appchains', url: '/coming-soon', icon: AppchainIcon, size: 'medium' },
    { title: 'Mutations', url: '/coming-soon', icon: MutationIcon, size: 'small' },
    { title: 'Charts', url: '/coming-soon', icon: ChartIcon, size: 'large' },
  ];

  return (
    <Box
      sx={{
        backgroundColor: '#000',
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: { xs: '0.5rem', md: '0.75rem' },
        p: { xs: '1.5rem', md: '2rem' },
        // Чуть добавляем высоты снизу на desktop, чтобы Network Info догнал Network Parameters
        pb: { xs: '1.5rem', md: '3.25rem' },
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
        Network Info
      </Typography>
      
      <Box
        sx={{
          display: 'grid',
          // На md+ делаем 4 колонки, чтобы ужать сетку в 4 ряда (вместо 5) и
          // совпасть по высоте с Network Parameters без растягивания пустоты.
          gridTemplateColumns: { xs: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' },
          gap: { xs: '0.75rem', md: '0.875rem' },
          flex: 1,
        }}
      >
        {networkInfoItems.map((item) => (
          <InfoCard
            key={item.title}
            title={item.title}
            url={item.url}
            Icon={item.icon}
            size={item.size}
            disabled={item.url === '/coming-soon'}
          />
        ))}
      </Box>
    </Box>
  );
}

const InfoCard: FC<{ 
  title: string; 
  url: string; 
  Icon: React.ComponentType<any>; 
  size: 'small' | 'medium' | 'large';
  disabled?: boolean;
}> = ({ title, url, Icon, size, disabled }) => {
  const getGridSpan = (size: 'small' | 'medium' | 'large', title: string) => {
    if (title === 'Charts') {
      return { xs: 'span 2', md: 'span 4' };
    }
    if (size === 'large') {
      return { xs: 'span 2', md: 'span 2' };
    }
    if (size === 'medium') {
      return { xs: 'span 1', md: 'span 2' };
    }
    return 'span 1';
  };
  
  const gridSpan = getGridSpan(size, title);
  
  return (
    <Box
      component={Link}
      href={disabled ? '#' : url}
      onClick={(e) => {
        if (disabled) {
          e.preventDefault();
          return;
        }
        logUserAction(USER_ACTIONS.VISIT_PAGE, { url, location: LOCATION.HOME_PAGE });
      }}
      sx={{
        gridColumn: gridSpan,
        border: '1px solid rgba(255,255,255,0.1)',
        px: { xs: '0.875rem', md: '1rem' },
        py: { xs: '0.875rem', md: '1rem' },
        backgroundColor: 'rgba(17, 17, 17, 0.3)',
        backdropFilter: 'blur(5px)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: { xs: '0.5rem', md: '0.625rem' },
        textDecoration: 'none',
        color: disabled ? 'rgba(255,255,255,0.4)' : 'rgba(255,255,255,0.7)',
        boxShadow: '0 2px 12px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.03)',
        transition: 'border-color 0.3s ease, background-color 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease, color 0.3s ease',
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
          borderColor: disabled ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.2)',
          backgroundColor: disabled ? 'rgba(17, 17, 17, 0.3)' : 'rgba(17, 17, 17, 0.5)',
          color: disabled ? 'rgba(255,255,255,0.4)' : '#fff',
          transform: disabled ? 'none' : 'translateY(-2px)',
          boxShadow: disabled 
            ? '0 2px 12px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.03)' 
            : '0 4px 20px rgba(0, 0, 0, 0.4), 0 0 15px rgba(122, 238, 229, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
        },
      }}
      aria-disabled={disabled}
    >
      <Icon 
        sx={{ 
          fontSize: { xs: size === 'large' ? '2rem' : size === 'medium' ? '1.5rem' : '1.25rem', md: size === 'large' ? '2.5rem' : size === 'medium' ? '1.75rem' : '1.5rem' },
          opacity: disabled ? 0.4 : 0.7,
          transition: 'opacity 0.3s ease, transform 0.3s ease',
        }} 
      />
      <Typography
        component='span'
        sx={{
          fontSize: { xs: '0.6875rem', md: '0.75rem' },
          textTransform: 'uppercase',
          letterSpacing: { xs: '0.1em', md: '0.12em' },
          textAlign: 'center',
          fontWeight: 400,
        }}
      >
        {title}
      </Typography>
    </Box>
  );
}