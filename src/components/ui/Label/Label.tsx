import { FC, ReactNode } from 'react';
import { SxProps, Typography } from '@mui/material';
import { COLORS } from '@/styles';

function hexToRgba(color: string, a: number) {
  // Supports #RGB and #RRGGBB. Fallback returns original color (best-effort).
  if (!color || typeof color !== 'string') return color as any;
  const c = color.trim();
  if (!c.startsWith('#')) return color;
  const hex = c.slice(1);
  const norm =
    hex.length === 3
      ? `${hex[0]}${hex[0]}${hex[1]}${hex[1]}${hex[2]}${hex[2]}`
      : hex.length === 6
        ? hex
        : '';
  if (!norm) return color;

  const r = parseInt(norm.slice(0, 2), 16);
  const g = parseInt(norm.slice(2, 4), 16);
  const b = parseInt(norm.slice(4, 6), 16);
  const alpha = Math.max(0, Math.min(1, a));
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

export const Label: FC<{
  children: ReactNode,
  variant: 'green' | 'red' | 'blue' | 'orange' | 'silver',
  sx?: SxProps
}> = ({
  children,
  variant,
  sx
}) => {
  const fg =
    variant === 'green' ? COLORS.GREEN :
      variant === 'red' ? COLORS.RED :
        variant === 'blue' ? COLORS.CYAN :
          variant === 'orange' ? COLORS.ORANGE :
            COLORS.SILVER;

  return (
    <Typography
      variant='body2'
      color={fg}
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        px: 0.9,
        py: 0.2,
        fontSize: '0.76rem',
        fontWeight: 600,
        letterSpacing: '0.02em',
        lineHeight: 1.2,
        borderRadius: '999px',
        border: `1px solid ${hexToRgba(fg, 0.38)}`,
        backgroundColor: hexToRgba(fg, 0.10),
        userSelect: 'none',
        whiteSpace: 'nowrap',
        ...sx
      }}
    >
      {children}
    </Typography>
  );
}