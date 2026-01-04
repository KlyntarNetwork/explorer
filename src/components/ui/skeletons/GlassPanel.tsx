import { Box, BoxProps } from '@mui/material';

export const glassPanelSx = {
  border: '1px solid rgba(255,255,255,0.10)',
  borderRadius: { xs: '0.75rem', md: '1rem' },
  backgroundColor: 'rgba(17, 17, 17, 0.35)',
  backdropFilter: 'blur(12px)',
  boxShadow: '0 10px 40px rgba(0, 0, 0, 0.55), inset 0 1px 0 rgba(255,255,255,0.06)',
} as const;

export function GlassPanel({ sx, ...props }: BoxProps) {
  return <Box {...props} sx={{ ...glassPanelSx, ...(sx as any) }} />;
}


