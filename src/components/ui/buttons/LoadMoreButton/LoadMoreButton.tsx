import { FC } from 'react';
import { Button, Typography, Box } from '@mui/material';
import DoubleArrowDown from '@public/icons/ui/doubleArrowDown.svg';

interface LoadMoreButtonProps {
  onClick: () => void;
}

export const LoadMoreButton: FC<LoadMoreButtonProps> = ({ onClick }) => {
  return (
    <Button
      variant="outlined"
      onClick={onClick}
      sx={{
        borderColor: 'rgba(255,255,255,0.1)',
        color: 'rgba(255,255,255,0.8)',
        textTransform: 'uppercase',
        letterSpacing: '0.1em',
        fontSize: { xs: '0.6875rem', md: '0.75rem' },
        px: { xs: 3, md: 4 },
        py: { xs: 1.25, md: 1.5 },
        backgroundColor: 'rgba(17, 17, 17, 0.4)',
        backdropFilter: 'blur(10px)',
        transition: 'all 0.3s ease',
        '&:hover': {
          borderColor: 'rgba(255,255,255,0.2)',
          backgroundColor: 'rgba(17, 17, 17, 0.6)',
          color: '#fff',
        },
      }}
    >
      <Typography
        sx={{
          mr: 1,
          fontSize: 'inherit',
          textTransform: 'inherit',
          letterSpacing: 'inherit',
          color: 'inherit',
          lineHeight: 1,
          display: 'inline-flex',
          alignItems: 'center',
        }}
      >
        Load more
      </Typography>
      <Box
        component={DoubleArrowDown}
        sx={{
          width: { xs: '1.125rem', md: '1.25rem' },
          height: { xs: '1.125rem', md: '1.25rem' },
          opacity: 1,
          color: 'inherit',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          '& path': {
            fill: 'currentColor',
            stroke: 'currentColor',
          },
          ml: 0.5,
          mt: '-2px',
        }}
      />
    </Button>
  );
}