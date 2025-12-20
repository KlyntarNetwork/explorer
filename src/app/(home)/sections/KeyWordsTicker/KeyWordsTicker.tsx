import Marquee from 'react-fast-marquee';
import { Box, Typography } from '@mui/material';

// const KEY_WORDS = [
//   'Web2, Web3 & Real World = 1B users',
//   'Ecosystem of blockchains',
//   'Shared security model',
//   'Post-quantum cryptography',
//   'Parallel virtual machines',
//   'Account abstraction 2.0',
//   'Storage abstraction',
//   'Tons of features',
//   'Amazing TPS & TTF',
//   'Mutability',
//   'AI (FHE ML & ZKML)',
//   'Multistaking',
//   'Cloud',
//   'Multilevel sharding',
//   'L1 blockchain',
//   'EVM & WASM & XVM',
//   'Codeless smart-contracts for real world',
//   'RWAs',
//   'Quantum currency',
// ];

const KEY_WORDS = ['Launch soon', 'Launch soon', 'Launch soon', 'Launch soon', 'Launch soon', 'Launch soon', 'Launch soon', 'Launch soon', 'Launch soon', 'Launch soon', 'Launch soon', 'Launch soon', 'Launch soon', 'Launch soon', 'Launch soon', 'Launch soon', 'Launch soon', 'Launch soon', 'Launch soon'];

export const KeyWordsTicker = () => {
  return (
    <Box 
      sx={{ 
        minHeight: '32px',
        backgroundColor: '#000',
        borderTop: '1px solid rgba(255,255,255,0.1)',
        borderBottom: '1px solid rgba(255,255,255,0.1)',
        py: { xs: '0.5rem', md: '0.625rem' },
      }}
    >
      <Marquee>
        {KEY_WORDS.map((tag, index) => (
          <Typography
            key={`${tag}-${index}`}
            component='span'
            sx={{
              mx: { xs: 0.375, md: 0.5 },
              px: { xs: '0.75rem', md: '0.875rem' },
              py: { xs: '0.375rem', md: '0.5rem' },
              height: 'fit-content',
              width: 'max-content',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '0',
              fontSize: { xs: '0.6875rem', md: '0.75rem' },
              textTransform: 'uppercase',
              letterSpacing: { xs: '0.12em', md: '0.15em' },
              color: 'rgba(255,255,255,0.6)',
              fontWeight: 400,
              backgroundColor: '#000',
              transition: 'border-color 0.3s ease, color 0.3s ease',
              '&:hover': {
                borderColor: 'rgba(255,255,255,0.2)',
                color: 'rgba(255,255,255,0.8)',
              },
            }}
          >
            {tag}
          </Typography>
        ))}
      </Marquee>
    </Box>
  );
}
