import { Skeleton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';

export const LatestBlocksTableSkeleton = () => {
  return (
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
            {['SID', 'Creator', 'Index', 'Txs', 'Created'].map((label) => (
              <TableCell key={label} sx={{ py: 1.5 }}>
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
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {[...Array(10)].map((_, index) => (
            <TableRow key={index}>
              <TableCell>
                <Skeleton variant='text' width='100%' sx={{ bgcolor: 'rgba(255,255,255,0.10)' }} />
              </TableCell>
              <TableCell>
                <Skeleton variant='text' width='100%' sx={{ bgcolor: 'rgba(255,255,255,0.10)' }} />
              </TableCell>
              <TableCell>
                <Skeleton variant='text' width='100%' sx={{ bgcolor: 'rgba(255,255,255,0.10)' }} />
              </TableCell>
              <TableCell>
                <Skeleton variant='text' width='100%' sx={{ bgcolor: 'rgba(255,255,255,0.10)' }} />
              </TableCell>
              <TableCell>
                <Skeleton variant='text' width='100%' sx={{ bgcolor: 'rgba(255,255,255,0.10)' }} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}