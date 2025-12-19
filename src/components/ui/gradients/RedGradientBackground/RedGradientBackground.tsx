import { FC, ReactNode } from 'react';
import { Box, SxProps } from '@mui/material';

const baseSx: SxProps = {
  position: 'relative',
  overflow: 'hidden',
  background: 'linear-gradient(140deg, #0a0f1c 0%, #0c1224 45%, #060811 100%)',
  border: '1px solid rgba(255, 96, 141, 0.2)',
  boxShadow: '0 25px 80px rgba(0, 0, 0, 0.7), inset 0 1px 0 rgba(255,255,255,0.06)',
  backdropFilter: 'blur(28px)',
  borderRadius: '20px',
  '&::before': {
    content: '""',
    position: 'absolute',
    inset: 0,
    background:
      'radial-gradient(circle at 20% 20%, rgba(255, 92, 141, 0.18), transparent 35%),' +
      'radial-gradient(circle at 85% 0%, rgba(255, 255, 255, 0.08), transparent 25%),' +
      'radial-gradient(circle at 70% 80%, rgba(255, 92, 141, 0.08), transparent 35%)',
    pointerEvents: 'none'
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    inset: -1,
    background:
      'linear-gradient(120deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0) 45%),' +
      'repeating-linear-gradient(90deg, rgba(255,255,255,0.04) 0, rgba(255,255,255,0.04) 1px, transparent 1px, transparent 18px)',
    mixBlendMode: 'screen',
    opacity: 0.7,
    pointerEvents: 'none'
  }
};

export const RedGradientBackground: FC<{
  children: ReactNode,
  sx: SxProps
}> = ({ children, sx }) => {
  return (
    <Box sx={[baseSx, sx]}>
      {children}
    </Box>
  );
};
