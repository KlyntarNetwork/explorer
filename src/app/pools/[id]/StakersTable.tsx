'use client';
import React, { ChangeEvent, FC, useState } from 'react';
import { Stakers } from '@/definitions';
import { STAKERS_PER_PAGE } from '@/constants';
import { truncateMiddle } from '@/helpers';
import { FlexBetweenBox, FlexCenterBox, GeometricButton, LoadMoreButton } from '@/components/ui';
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,
  TextField,
  Tooltip,
  LinearProgress
} from '@mui/material';
import Link from 'next/link';
import LaunchIcon from '@mui/icons-material/Launch';
import SearchIcon from '@public/icons/ui/search.svg';
import { BG_COLORS } from '@/styles';
import Web3 from 'web3';

const getTableData = (poolStakers: Stakers) => {
  return Object.entries(poolStakers).map(
    ([id, { kly, uno }]) => ({
      id,
      kly,
      uno
    })
  );
}

interface StakersTableProps {
  poolStakers: Stakers,
  poolOriginShard: string,
  variant?: 'default' | 'glass';
  dense?: boolean;
}

export const StakersTable: FC<StakersTableProps> = ({
  poolStakers,
  poolOriginShard,
  variant = 'default',
  dense,
}) => {
  const isGlass = variant === 'glass';
  const isDense = dense ?? isGlass;

  const tableStakers = getTableData(poolStakers);

  const [stakers, setStakers] = useState(tableStakers.slice(0, STAKERS_PER_PAGE));
  
  const [query, setQuery] = useState('');
  
  const nextPage = Math.floor(stakers.length / STAKERS_PER_PAGE) + 1;
  
  const nextPageAvailable = stakers.length < tableStakers.length;

  const filteredStakers = query ? stakers.filter(st => st.id.includes(query)) : stakers;

  const totalStake = filteredStakers.reduce((sum, s) => sum + BigInt(s.kly) + BigInt(s.uno), BigInt(0));

  const sortedStakers = [...filteredStakers].map((st) => {

      const stakeAmount = BigInt(st.kly) + BigInt(st.uno);
      const percentage = totalStake > 0 ? (Number(stakeAmount * BigInt(100)) / Number(totalStake)) : 0;
      return { ...st, stakeAmount, percentage };
    
  }).sort((a, b) => b.percentage - a.percentage);


  const handleLoadMore = () => {
    if (nextPageAvailable) {
      setStakers(tableStakers.slice(0, STAKERS_PER_PAGE * nextPage));
    }
  }

  const handleSetQuery = (e: ChangeEvent<HTMLInputElement>) => setQuery(e.target.value.trim());

  if (!tableStakers.length) {
    return (
      <Box sx={{ py: 6, textAlign: 'center' }}>
        <Typography color='primary.main'>No stakers found</Typography>
      </Box>
    );
  }

  return (
    <>
      <Box sx={{
        display: 'flex',
        justifyContent: 'flex-end',
        mt: isDense ? 2 : 3
      }}>
        <Box sx={{
          width: {
            lg: 'calc(50% - 24px)',
            xs: '100%'
          }
        }}>
          <StakerSearchBar handleSetQuery={handleSetQuery} variant={variant} dense={isDense} />
        </Box>
      </Box>

      <TableContainer
        sx={
          isGlass
            ? {
                mt: { xs: 2, md: 2.5 },
                border: '1px solid rgba(255,255,255,0.10)',
                borderRadius: { xs: '0.75rem', md: '1rem' },
                backgroundColor: 'rgba(0,0,0,0.55)',
                backdropFilter: 'blur(12px)',
                boxShadow:
                  '0 10px 40px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.06)',
                overflow: 'hidden',
              }
            : { mt: 2 }
        }
      >
        <Table
          sx={{
            minWidth: 650,
            ...(isGlass && {
              '& th, & td': {
                borderBottom: '1px solid rgba(255,255,255,0.06)',
              },
            }),
          }}
          aria-label='Stakers table'
        >
          <TableHead>
            <TableRow
              sx={
                isGlass
                  ? {
                      background:
                        'linear-gradient(90deg, rgba(122,238,229,0.06) 0%, rgba(255,49,49,0.04) 100%)',
                    }
                  : undefined
              }
            >
              
              <TableCell>
                <Tooltip title='Address of staker'>
                  <Typography
                    variant={isGlass ? undefined : 'h6'}
                    sx={
                      isGlass
                        ? {
                            fontSize: { xs: '0.6875rem', md: '0.75rem' },
                            textTransform: 'uppercase',
                            letterSpacing: '0.14em',
                            color: 'rgba(255,255,255,0.65)',
                            fontWeight: 500,
                          }
                        : undefined
                    }
                  >
                    ID
                  </Typography>
                </Tooltip>
                </TableCell>
              <TableCell>
                <Tooltip title='Amount of staked native coins'>
                  <Typography variant={isGlass ? undefined : 'h6'} sx={isGlass ? {
                    fontSize: { xs: '0.6875rem', md: '0.75rem' },
                    textTransform: 'uppercase',
                    letterSpacing: '0.14em',
                    color: 'rgba(255,255,255,0.65)',
                    fontWeight: 500,
                  } : undefined}>KLY</Typography>
                </Tooltip>
              </TableCell>
              <TableCell>
                <Tooltip title='Amount of staked multistaking points'>
                  <Typography variant={isGlass ? undefined : 'h6'} sx={isGlass ? {
                    fontSize: { xs: '0.6875rem', md: '0.75rem' },
                    textTransform: 'uppercase',
                    letterSpacing: '0.14em',
                    color: 'rgba(255,255,255,0.65)',
                    fontWeight: 500,
                  } : undefined}>UNO</Typography>
                </Tooltip>
              </TableCell>
              <TableCell>
                <Tooltip title='Percent of total staking power'>
                  <Typography variant={isGlass ? undefined : 'h6'} sx={isGlass ? {
                    fontSize: { xs: '0.6875rem', md: '0.75rem' },
                    textTransform: 'uppercase',
                    letterSpacing: '0.14em',
                    color: 'rgba(255,255,255,0.65)',
                    fontWeight: 500,
                  } : undefined}>Percentage</Typography>
                </Tooltip>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody
            sx={
              isGlass
                ? {
                    '& .MuiTableRow-root': {
                      transition: 'background-color 160ms ease',
                    },
                    '& .MuiTableRow-root:hover': {
                      backgroundColor: 'rgba(255,255,255,0.03)',
                    },
                    '& .MuiTableCell-root': {
                      py: 1.35,
                    },
                  }
                : undefined
            }
          >
            {sortedStakers.map((st) => (
              <TableRow key={st.id}>
                <TableCell sx={{ width: '25%' }}>
                  <Link
                    href={`/users/${poolOriginShard}:${st.id}`}
                    passHref
                    style={{ textDecoration: 'none' }}
                  >
                    <Typography color='primary.main' sx={{ fontSize: isDense ? { xs: '0.8125rem', md: '0.875rem' } : '16px' }}>
                      <LaunchIcon color='primary' sx={{ position: 'relative', bottom: '-4px', height: '20px' }} />{' '}
                      {truncateMiddle(st.id)}
                    </Typography>
                  </Link>
                </TableCell>
                <TableCell sx={{ width: '25%' }}>
                  <Typography sx={{ fontSize: isDense ? { xs: '0.8125rem', md: '0.875rem' } : '16px' }}>{Web3.utils.fromWei(st.kly, 'ether')}</Typography>
                </TableCell>
                <TableCell sx={{ width: '25%' }}>
                  <Typography sx={{ fontSize: isDense ? { xs: '0.8125rem', md: '0.875rem' } : '16px' }}>{Web3.utils.fromWei(st.uno, 'ether')}</Typography>
                </TableCell>
                <TableCell sx={{ width: '25%' }}>
                  <Typography sx={{ fontSize: isDense ? { xs: '0.8125rem', md: '0.875rem' } : '16px', mb: 1 }}>{st.percentage.toFixed(2)}%</Typography>
                  <LinearProgress variant="determinate" value={st.percentage} sx={{ height: 8, borderRadius: 4, backgroundColor: 'rgba(255,255,255,0.08)', '& .MuiLinearProgress-bar': { backgroundColor: 'rgba(122,238,229,0.75)' } }} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <FlexCenterBox sx={{ my: 3 }}>
        {nextPageAvailable && !query && (
          <LoadMoreButton onClick={handleLoadMore}/>
        )}
      </FlexCenterBox>
    </>
  );
}

const StakerSearchBar = ({
  handleSetQuery,
  variant,
  dense,
}: {
  handleSetQuery: (e: ChangeEvent<HTMLInputElement>) => void;
  variant: 'default' | 'glass';
  dense: boolean;
}) => {
  const isGlass = variant === 'glass';
  return (
    <FlexBetweenBox
      sx={{
        gap: 2,
        pl: 1.5,
        pr: 0.4,
        py: 0.25,
        ...(isGlass
          ? {
              border: '1px solid rgba(255,255,255,0.12)',
              borderRadius: { xs: '0.75rem', md: '1rem' },
              backgroundColor: 'rgba(0,0,0,0.55)',
              backdropFilter: 'blur(10px)',
              boxShadow: '0 6px 24px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.06)',
            }
          : {
              border: 1,
              borderColor: 'border.main',
              background: BG_COLORS.GRAY_LIGHT
            }),
      }}
    >
      <TextField
        onChange={handleSetQuery}
        sx={{ width: '100%' }}
        autoComplete='off'
        spellCheck={false}
        inputProps={{ maxLength: 200 }}
        placeholder='Enter the ID of the staker'
        InputProps={{
          sx: {
            '& input': { fontSize: dense ? '14px' : undefined },
          },
        }}
      />
      <GeometricButton
        variant='cyan'
        disableShadow={true}
        sx={{ py: 0.75, cursor: 'default' }}
      >
        <SearchIcon />
      </GeometricButton>
    </FlexBetweenBox>
  );
}
