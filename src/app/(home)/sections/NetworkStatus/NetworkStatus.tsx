'use client';
import { FC } from 'react';
import { Box, Typography } from '@mui/material';
import Link from 'next/link';
import { GreenGradientBackground } from '@/components/ui';
import { BlockchainData } from '@/definitions';
import { logUserAction } from '@/helpers';
import { LOCATION, USER_ACTIONS } from '@/constants';
import LaunchIcon from '@mui/icons-material/Launch';

interface Props {
  data: BlockchainData
}

export const NetworkStatus:FC<Props> = ({ data }) => {
  const linksToPages: Record<string, string> = {
    'Blocks data and stats': '/blocks',
    'Epochs data': '/epochs/' + data.epochId,
    'Hostchains checkpoints': '/checkpoints',
    'Voting & DAO': '/contracts/dao_voting',
    'RWX smart contracts': '/contracts/rwx_contract',
    'Multistaking stats': '/contracts/multistaking',
    'Appchains': '/coming-soon',
    'Mutations': '/coming-soon',
    'Charts': '/coming-soon'
  }

  return (
    <GreenGradientBackground sx={{ p: { xs: 3, md: 4 }, color: '#e6edf7' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
        <Box sx={{
          width: 38,
          height: 38,
          borderRadius: '12px',
          background: 'linear-gradient(135deg, rgba(46,255,196,0.25), rgba(255,255,255,0.05))',
          boxShadow: '0 0 25px rgba(46, 255, 196, 0.5)',
          border: '1px solid rgba(46,255,196,0.35)'
        }} />
        <Box>
          <Typography variant='h1' sx={{ fontSize: { xs: '22px', md: '28px' }, letterSpacing: '0.05em' }}>
            Network Info
          </Typography>
          <Typography variant='body2' color='text.secondary' sx={{ mt: 0.25 }}>
            Precision shortcuts into the ecosystem, framed by a luxe obsidian shell.
          </Typography>
        </Box>
      </Box>
      <Box sx={{ display: 'grid', gap: 1 }}>
        {Object.keys(linksToPages).map(title => (
          <ContentLink
            title={title}
            url={linksToPages[title]}
            key={title}
            disabled={linksToPages[title] === '#'}
          />
        ))}
      </Box>
    </GreenGradientBackground>
  );
}

const ContentLink: FC<{ title: string, url: string, disabled?: boolean }> = ({
  title,
  url,
  disabled
}) => {
  return (
    <Box
      component={disabled ? 'div' : Link}
      href={disabled ? undefined : url}
      aria-disabled={disabled}
      onClick={(event) => {
        if (disabled) {
          event.preventDefault();
          return;
        }
        logUserAction(USER_ACTIONS.VISIT_PAGE, { url, location: LOCATION.HOME_PAGE });
      }}
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1.5,
        px: 2.25,
        py: 1.75,
        borderRadius: '14px',
        border: '1px solid',
        borderColor: disabled ? 'rgba(255,255,255,0.06)' : 'rgba(46,255,196,0.35)',
        background: 'linear-gradient(140deg, rgba(18,26,39,0.95) 0%, rgba(10,15,24,0.95) 100%)',
        boxShadow: '0 18px 50px rgba(0, 0, 0, 0.6)',
        textDecoration: 'none',
        cursor: disabled ? 'not-allowed' : 'pointer',
        position: 'relative',
        overflow: 'hidden',
        transition: 'transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease',
        color: disabled ? 'text.secondary' : '#e6edf7',
        '&::before': {
          content: '""',
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(90deg, rgba(46,255,196,0.18), rgba(255,255,255,0))',
          opacity: disabled ? 0.2 : 0.55,
          pointerEvents: 'none'
        },
        '&:hover': !disabled ? {
          transform: 'translateY(-3px)',
          borderColor: 'rgba(46,255,196,0.55)',
          boxShadow: '0 20px 60px rgba(0,0,0,0.7)'
        } : undefined
      }}
    >
      <Box sx={{
        width: 10,
        height: 10,
        borderRadius: '50%',
        boxShadow: disabled ? '0 0 12px rgba(255,255,255,0.2)' : '0 0 18px rgba(46,255,196,0.8)',
        background: disabled ? 'rgba(255,255,255,0.25)' : 'linear-gradient(135deg, #2effc4, #96ffe7)',
        flexShrink: 0
      }} />
      <Box sx={{ flex: 1 }}>
        <Typography
          sx={{
            fontSize: '18px',
            fontWeight: 700,
            letterSpacing: '0.02em',
            lineHeight: 1.4
          }}
        >
          {title}
        </Typography>
        <Typography variant='caption' color='text.secondary'>
          {disabled ? 'Coming soon' : 'Open section'}
        </Typography>
      </Box>
      <LaunchIcon sx={{ position: 'relative', height: '22px', color: disabled ? 'text.secondary' : '#2effc4' }} />
    </Box>
  );
}
