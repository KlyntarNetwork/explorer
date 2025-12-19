import { FC, ReactNode } from 'react';
import { Box, SxProps } from '@mui/material';


const baseSx: SxProps = {
  position: 'relative',
  overflow: 'hidden',
  background: 'linear-gradient(145deg, #080d16 0%, #0b111f 50%, #05070d 100%)',
  border: '1px solid rgba(46, 255, 196, 0.25)',
  boxShadow: '0 25px 80px rgba(0, 0, 0, 0.75), inset 0 1px 0 rgba(255,255,255,0.05)',
  backdropFilter: 'blur(28px)',
  borderRadius: '20px',
  '&::before': {
    content: '""',
    position: 'absolute',
    inset: 0,
    background:
      'radial-gradient(circle at 18% 22%, rgba(42, 255, 196, 0.18), transparent 36%),' +
      'radial-gradient(circle at 82% 10%, rgba(255, 255, 255, 0.08), transparent 28%),' +
      'radial-gradient(circle at 76% 78%, rgba(42, 255, 196, 0.1), transparent 36%)',
    pointerEvents: 'none'
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    inset: -1,
    background:
      'linear-gradient(130deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0) 50%),' +
      'repeating-linear-gradient(90deg, rgba(255,255,255,0.04) 0, rgba(255,255,255,0.04) 1px, transparent 1px, transparent 18px)',
    mixBlendMode: 'screen',
    opacity: 0.75,
    pointerEvents: 'none'
  }
};


export const GreenGradientBackground: FC<{
  children: ReactNode,
  sx: SxProps
}> = ({ children, sx }) => {
  return (
    <Box sx={[baseSx, sx]}>
      {children}
    </Box>
  );
};
