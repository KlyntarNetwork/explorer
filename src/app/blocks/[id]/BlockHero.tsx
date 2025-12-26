import { Box } from '@mui/material';

export function BlockHero() {
  return (
    <Box
      aria-hidden
      sx={{
        width: { xs: 220, md: 280 },
        height: { xs: 220, md: 280 },
        maxWidth: '100%',
        borderRadius: { xs: '1rem', md: '1.25rem' },
        border: '1px solid rgba(255,255,255,0.10)',
        backgroundColor: 'rgba(0,0,0,0.45)',
        backdropFilter: 'blur(14px)',
        boxShadow:
          '0 18px 60px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.06)',
        display: 'grid',
        placeItems: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Isometric cube (real 3-face block) */}
      <Box
        component="svg"
        viewBox="0 0 220 220"
        sx={{
          width: { xs: 210, md: 250 },
          height: { xs: 210, md: 250 },
          zIndex: 1,
          filter:
            'drop-shadow(0 22px 46px rgba(0,0,0,0.6)) drop-shadow(0 0 26px rgba(122,238,229,0.14))',
          animation: 'blockFloat 4.6s cubic-bezier(0.2, 0.8, 0.2, 1) infinite',
          '@keyframes blockFloat': {
            '0%': { transform: 'translateY(10px) scale(0.995)' },
            '50%': { transform: 'translateY(-18px) scale(1.01)' },
            '100%': { transform: 'translateY(10px) scale(0.995)' },
          },
        }}
      >
        <defs>
          <linearGradient id="kTop" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="rgba(255,255,255,0.20)" />
            <stop offset="0.25" stopColor="rgba(122,238,229,0.92)" />
            <stop offset="1" stopColor="rgba(122,238,229,0.55)" />
          </linearGradient>
          <linearGradient id="kLeft" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="rgba(122,238,229,0.55)" />
            <stop offset="1" stopColor="rgba(0,0,0,0.55)" />
          </linearGradient>
          <linearGradient id="kRight" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="rgba(122,238,229,0.42)" />
            <stop offset="1" stopColor="rgba(0,0,0,0.68)" />
          </linearGradient>
          <filter id="kGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="10" result="blur" />
            <feColorMatrix
              in="blur"
              type="matrix"
              values="
                0 0 0 0 0.48
                0 0 0 0 0.93
                0 0 0 0 0.90
                0 0 0 0.55 0"
              result="cyan"
            />
            <feMerge>
              <feMergeNode in="cyan" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* subtle back shadow */}
        <path
          d="M110 62 L54 94 L54 158 L110 190 L166 158 L166 94 Z"
          fill="rgba(0,0,0,0.28)"
          transform="translate(0,10)"
          opacity="0.8"
        />

        {/* Left face */}
        <path
          d="M54 94 L110 126 L110 190 L54 158 Z"
          fill="url(#kLeft)"
          stroke="rgba(255,255,255,0.14)"
          strokeWidth="1"
          filter="url(#kGlow)"
        />
        {/* Right face */}
        <path
          d="M166 94 L110 126 L110 190 L166 158 Z"
          fill="url(#kRight)"
          stroke="rgba(255,255,255,0.14)"
          strokeWidth="1"
          filter="url(#kGlow)"
        />
        {/* Top face */}
        <path
          d="M110 62 L54 94 L110 126 L166 94 Z"
          fill="url(#kTop)"
          stroke="rgba(255,255,255,0.20)"
          strokeWidth="1"
          filter="url(#kGlow)"
        />

        {/* edge highlight */}
        <path
          d="M110 62 L166 94"
          stroke="rgba(255,255,255,0.22)"
          strokeWidth="1"
        />
        <path
          d="M110 62 L54 94"
          stroke="rgba(255,255,255,0.18)"
          strokeWidth="1"
        />
      </Box>
    </Box>
  );
}


