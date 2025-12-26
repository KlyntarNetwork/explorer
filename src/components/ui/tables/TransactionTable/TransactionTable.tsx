'use client';
import React, { ChangeEvent, FC, ReactNode, useState } from 'react';
import Link from 'next/link';
import { TransactionPreview } from '@/definitions';
import { TRANSACTIONS_PER_PAGE } from '@/constants';
import { FormattedDate, truncateMiddle } from '@/helpers';
import { FlexBetweenBox, FlexCenterBox, GeometricButton, Label, LoadMoreButton } from '@/components/ui';
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
} from '@mui/material';
import { BG_COLORS } from '@/styles';
import LaunchIcon from '@mui/icons-material/Launch';
import SearchIcon from '@public/icons/ui/search.svg';
import Web3 from 'web3';

interface Props {
  transactions: TransactionPreview[];
  variant?: 'default' | 'glass';
  dense?: boolean;
}

export const TransactionsTable: FC<Props> = ({
  transactions,
  variant = 'default',
  dense,
}) => {
  const isGlass = variant === 'glass';
  const isDense = dense ?? isGlass;

  const [txs, setTxs] = useState(transactions.slice(0, TRANSACTIONS_PER_PAGE));
  const [query, setQuery] = useState('');
  const nextPage = Math.floor(txs.length / TRANSACTIONS_PER_PAGE) + 1;
  const nextPageAvailable = txs.length < transactions.length;

  const filteredTxs = query ? txs.filter(tx => tx.txid.includes(query)) : txs;

  const handleLoadMore = () => {
    if (nextPageAvailable) {
      setTxs(transactions.slice(0, TRANSACTIONS_PER_PAGE * nextPage));
    }
  }

  const handleSetQuery = (e: ChangeEvent<HTMLInputElement>) => setQuery(e.target.value.trim());

  if (!transactions.length) {
    return (
      <Box sx={{ py: 6, textAlign: 'center' }}>
        <Typography color='primary.main'>No transactions found</Typography>
      </Box>
    );
  }

  const withCreator = !!txs[0].creator;
  const withTimestamp = !!txs[0].blockTimestamp;

  const TxTableCell = ({ children }: { children: ReactNode }) => (
    <TableCell sx={{ width: withCreator || withTimestamp ? '5%' : '25%' }}>
      {children}
    </TableCell>
  );

  const rowFontSize = isDense ? { xs: '0.8125rem', md: '0.875rem' } : '16px';
  const headerTypographySx = isGlass
    ? {
        fontSize: { xs: '0.6875rem', md: '0.75rem' },
        textTransform: 'uppercase',
        letterSpacing: '0.14em',
        color: 'rgba(255,255,255,0.65)',
        fontWeight: 500,
      }
    : undefined;
  
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
          <TransactionSearchBar
            handleSetQuery={handleSetQuery}
            variant={variant}
            dense={isDense}
          />
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
          aria-label='Transactions table'
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
              <TableCell sx={isGlass ? { py: 1.5 } : undefined}>
                <Tooltip title='Hash of transaction'>
                  <Typography variant={isGlass ? undefined : 'h6'} sx={headerTypographySx}>
                    TxID
                  </Typography>
                </Tooltip>
              </TableCell>
              <TableCell sx={isGlass ? { py: 1.5 } : undefined}>
                <Tooltip title='Execution status'>
                  <Typography variant={isGlass ? undefined : 'h6'} sx={headerTypographySx}>
                    Status
                  </Typography>
                </Tooltip>
              </TableCell>
              {withCreator && (
                <TableCell sx={isGlass ? { py: 1.5 } : undefined}>
                  <Tooltip title='Pubkey-initiator of transaction'>
                    <Typography variant={isGlass ? undefined : 'h6'} sx={headerTypographySx}>
                      Creator
                    </Typography>
                  </Tooltip>
                </TableCell>
              )}
              {withTimestamp && (
                <TableCell sx={isGlass ? { py: 1.5 } : undefined}>
                  <Tooltip title='Time of block location of tx'>
                    <Typography variant={isGlass ? undefined : 'h6'} sx={headerTypographySx}>
                      Timestamp
                    </Typography>
                  </Tooltip>
                </TableCell>
              )}
              <TableCell sx={isGlass ? { py: 1.5 } : undefined}>
                <Tooltip title='Type of transaction'>
                  <Typography variant={isGlass ? undefined : 'h6'} sx={headerTypographySx}>
                    TxType
                  </Typography>
                </Tooltip>
              </TableCell>
              <TableCell sx={isGlass ? { py: 1.5 } : undefined}>
                <Tooltip title='Fee to prioritize the transaction'>
                  <Typography variant={isGlass ? undefined : 'h6'} sx={headerTypographySx}>
                    Priority fee
                  </Typography>
                </Tooltip>
              </TableCell>
              <TableCell sx={isGlass ? { py: 1.5 } : undefined}>
                <Tooltip title='Required + priority fees'>
                  <Typography variant={isGlass ? undefined : 'h6'} sx={headerTypographySx}>
                    Total fee
                  </Typography>
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
            {filteredTxs.map((tx) => (
              <TableRow key={tx.txid}>
                <TxTableCell>
                  <Link
                    href={`/tx/${tx.txid}`}
                    passHref
                    style={{ textDecoration: 'none' }}
                  >
                    <Typography color='primary.main' sx={{ fontSize: rowFontSize }}>
                      <LaunchIcon color='primary' sx={{ position: 'relative', bottom: '-3px', height: '18px' }} />{' '}
                      {truncateMiddle(tx.txid)}
                    </Typography>
                  </Link>
                </TxTableCell>
                <TxTableCell>
                  <Label variant='green'>Success</Label>
                </TxTableCell>
                {tx.creator && (
                  <TxTableCell>
                    <Link
                      href={`/users/${tx.creator.includes(':') ? tx.creator : `0:${tx.creator}`}`}
                      passHref
                      style={{ textDecoration: 'none' }}
                    >
                      <Typography color='primary.main' sx={{ fontSize: rowFontSize }}>
                        <LaunchIcon
                          color='primary'
                          sx={{ position: 'relative', bottom: '-3px', height: '18px' }}
                        />{' '}
                        {truncateMiddle(tx.creator)}
                      </Typography>
                    </Link>
                  </TxTableCell>
                )}
                {tx.blockTimestamp && (
                  <TxTableCell>
                    <Typography sx={{ fontSize: rowFontSize }}>{new FormattedDate(tx.blockTimestamp).preview}</Typography>
                  </TxTableCell>
                )}
                <TxTableCell>
                  <Typography sx={{ fontSize: rowFontSize }}>{tx.txType}</Typography>
                </TxTableCell>
                <TxTableCell>
                  <Typography sx={{ fontSize: rowFontSize }}>{tx.priorityFee ? Web3.utils.fromWei(tx.priorityFee,'ether') : '0'}</Typography>
                </TxTableCell>
                <TxTableCell>
                  <Typography sx={{ fontSize: rowFontSize }}>{ tx.totalFee === 'N/A' ? 'N/A' : Web3.utils.fromWei(tx.totalFee,'ether')}</Typography>
                </TxTableCell>
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

const TransactionSearchBar = ({
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
        pl: { xs: 1.25, md: 1.5 },
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
              background: BG_COLORS.GRAY_LIGHT,
            }),
      }}
    >
      <TextField
        onChange={handleSetQuery}
        sx={{ width: '100%' }}
        autoComplete='off'
        spellCheck={false}
        placeholder='Enter the txID - BLAKE3(KLY) or SHA3(EVM) hash of transaction'
        inputProps={{ maxLength: 200, style: { fontSize: dense ? '14px' : undefined } }}
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