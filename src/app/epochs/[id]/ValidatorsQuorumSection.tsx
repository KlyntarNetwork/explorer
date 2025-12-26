'use client';
import { Box, Typography } from '@mui/material';
import { Epoch } from '@/definitions';
import React, { FC } from 'react';
import { VadlidatorsTable } from '@/components/ui/tables/ValidatorsTable';


export const ValidatorsQuorumSection: FC<{ epoch: Epoch }> = ({
  epoch
}) => {

  let validatorsSequence;

  if(process.env.MODE_1){

    // In case it's MODE_1 - list the pools registry to show quorum members first

    const quorum = new Set(epoch.quorum);

    validatorsSequence = epoch.poolsRegistry.sort((a, b) => {
      
      return quorum.has(a) && !quorum.has(b) ? -1 : !quorum.has(a) && quorum.has(b) ? 1 : 0;
    
    });

  } else {

    // Otherwise visualize in sequence of leadership

    validatorsSequence = epoch.leadersSequence

  }

  const validatorsData = validatorsSequence.map(validator => ({
    text: validator,
    url: `/pools/${validator}(POOL)`,
    inQuorum: epoch.quorum.includes(validator)
  }));

  return (
    <Box
      sx={{
        mt: { xs: 3, md: 4 },
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: { xs: '0.75rem', md: '1rem' },
        backgroundColor: 'rgba(17, 17, 17, 0.35)',
        backdropFilter: 'blur(12px)',
        boxShadow:
          '0 10px 40px rgba(0, 0, 0, 0.55), inset 0 1px 0 rgba(255,255,255,0.06)',
        p: { xs: 1.5, md: 2.25 },
      }}
    >
      <Typography variant='h1' sx={{ fontSize: { xs: '1.25rem', md: '1.5rem' } }}>
        Epoch validators
      </Typography>
      <Typography sx={{ mt: 1, mb: 2, color: 'rgba(255,255,255,0.6)' }}>
        Validator pools for this epoch (quorum members are highlighted).
      </Typography>

      <Box
        sx={{
          mt: 2,
          border: '1px solid rgba(255,255,255,0.10)',
          borderRadius: { xs: '0.75rem', md: '1rem' },
          backgroundColor: 'rgba(0,0,0,0.55)',
          backdropFilter: 'blur(12px)',
          boxShadow:
            '0 10px 40px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.06)',
          p: { xs: 1, md: 1.5 },
        }}
      >
        {validatorsData.length ? (
          <VadlidatorsTable value={validatorsData} variant="glass" dense />
        ) : (
          <Typography color='primary.main'>No validators found</Typography>
        )}
      </Box>
    </Box>
  );
}

