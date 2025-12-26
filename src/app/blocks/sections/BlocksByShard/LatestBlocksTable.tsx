import { FC } from 'react';
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,
  Tooltip
} from '@mui/material';
import LaunchIcon from '@mui/icons-material/Launch';
import Link from 'next/link';
import { BlockPreview } from '@/definitions';
import { FlexCenterBox, ButtonPagination } from '@/components/ui';
import { fetchBlocksByShard } from '@/data';
import { truncateMiddle } from '@/helpers';

interface LatestBlocksTableProps {
  shard: string;
  currentPage: number;
  rowsPerPage: number;
}

export const LatestBlocksTable: FC<LatestBlocksTableProps> = async ({
  shard,
  currentPage,
  rowsPerPage,
}) => {
  const blocks = await fetchBlocksByShard(shard, currentPage, rowsPerPage);
  const blocksExist = !!blocks.length;

  const rows = blocks.map((block: BlockPreview) => (
    <TableRow key={block.sid}>
      <TableCell sx={{ width: '20%' }}>
        <Link
          href={`/blocks/${block.id}`}
          passHref
          style={{ textDecoration: 'none' }}
        >
          <Typography color='primary.main' sx={{ fontSize: { xs: '0.8125rem', md: '0.875rem' } }}>
            <LaunchIcon color='primary' sx={{ position: 'relative', bottom: '-3px', height: '18px' }} /> {block.sid}
          </Typography>
        </Link>
      </TableCell>
      <TableCell sx={{ width: '20%' }}>
        <Typography sx={{ fontSize: { xs: '0.8125rem', md: '0.875rem' } }}>
          {truncateMiddle(block.creator)}
        </Typography>
      </TableCell>
      <TableCell sx={{ width: '20%' }}>
        <Typography sx={{ fontSize: { xs: '0.8125rem', md: '0.875rem' } }}>{block.index}</Typography>
      </TableCell>
      <TableCell sx={{ width: '20%' }}>
        <Typography sx={{ fontSize: { xs: '0.8125rem', md: '0.875rem' } }}>{block.txsNumber}</Typography>
      </TableCell>
      <TableCell sx={{ width: '20%' }}>
        <Typography sx={{ fontSize: { xs: '0.8125rem', md: '0.875rem' } }}>{block.createdAt}</Typography>
      </TableCell>
    </TableRow>
  ));

  if (!blocksExist) {
    return (
      <Box sx={{ py: 6, textAlign: 'center' }}>
        <Typography color='primary.main'>No blocks found</Typography>
      </Box>
    );
  }

  return (
    <>
      <TableContainer
        sx={{
          mt: { xs: 3, md: 4 },
          border: '1px solid rgba(255,255,255,0.10)',
          borderRadius: { xs: '0.75rem', md: '1rem' },
          backgroundColor: 'rgba(0,0,0,0.55)',
          backdropFilter: 'blur(12px)',
          boxShadow: '0 10px 40px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.06)',
          overflow: 'hidden',
        }}
      >
        <Table
          sx={{
            minWidth: 650,
            '& th, & td': {
              borderBottom: '1px solid rgba(255,255,255,0.06)',
            },
          }}
          aria-label='Latest blocks table'
        >
          <TableHead>
            <TableRow
              sx={{
                background:
                  'linear-gradient(90deg, rgba(122,238,229,0.06) 0%, rgba(255,49,49,0.04) 100%)',
              }}
            >
              {[
                { label: 'SID', tip: 'Absolute height of block in shard' },
                { label: 'Creator', tip: 'Address of the block creator' },
                { label: 'Index', tip: 'Index of block in current epoch by this creator' },
                { label: 'Txs', tip: 'Number of transactions in the block' },
                { label: 'Created', tip: 'Timestamp when the block was created' },
              ].map(({ label, tip }) => (
                <TableCell key={label} sx={{ py: 1.5 }}>
                  <Tooltip title={tip}>
                    <Typography
                      sx={{
                        fontSize: { xs: '0.6875rem', md: '0.75rem' },
                        textTransform: 'uppercase',
                        letterSpacing: '0.14em',
                        color: 'rgba(255,255,255,0.65)',
                        fontWeight: 500,
                      }}
                    >
                      {label}
                    </Typography>
                  </Tooltip>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody
            sx={{
              '& .MuiTableRow-root': {
                transition: 'background-color 160ms ease',
              },
              '& .MuiTableRow-root:hover': {
                backgroundColor: 'rgba(255,255,255,0.03)',
              },
              '& .MuiTableCell-root': {
                py: 1.35,
              },
            }}
          >
            {rows}
          </TableBody>
        </Table>
      </TableContainer>

      <FlexCenterBox sx={{ my: 5 }}>
        <ButtonPagination
          disabled={blocks.length < rowsPerPage}
        />
      </FlexCenterBox>
    </>
  );
}
