import { Metadata } from 'next';
import { ContentBlock, TransactionsTable, EntityPageLayout, PageContainer } from '@/components/ui';
import { Box, Typography } from '@mui/material';
import { fetchBlockById } from '@/data';
import { TransactionPreview } from '@/definitions';
import { GradientBackground, DimGradientBackground } from '@/components/ui';
import { BlockHero } from './BlockHero';

interface Props {
  params: {
    id: string
  }
}

export const metadata: Metadata = {
  title: 'Block info',
};

export default async function BlockByIdPage({ params }: Props) {
  const id = decodeURIComponent(params.id);
  const block = await fetchBlockById(id);

  const status = !!block.aggregatedFinalizationProof.proofs ? 'Finalized' : 'Awaiting finalization';
  
  const txPreviews: TransactionPreview[] = block.transactions.map(tx => ({
    txid: tx.txHash,
    txType: tx.type,
    sigType: tx.sigType,
    priorityFee: tx.fee,
    totalFee: 'N/A',
    creator: tx.creator
  }));

  return (
    <GradientBackground sx={{ backgroundColor: '#000' }}>
      <DimGradientBackground>
        <PageContainer sx={{ pt: { xs: 3, md: 4 }, pb: { xs: 5, md: 7 } }}>
          <Box sx={{ mb: { xs: 3, md: 4 } }}>
            <Typography variant='h1'>Block</Typography>
            <Typography sx={{ mt: 1, color: 'rgba(255,255,255,0.6)' }}>
              Inspect block metadata, hashes and included transactions.
            </Typography>
          </Box>

          <Box
            sx={{
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: { xs: '0.75rem', md: '1rem' },
              backgroundColor: 'rgba(17, 17, 17, 0.35)',
              backdropFilter: 'blur(12px)',
              boxShadow:
                '0 10px 40px rgba(0, 0, 0, 0.55), inset 0 1px 0 rgba(255,255,255,0.06)',
              p: { xs: 1.5, md: 2.25 },
            }}
          >
            <EntityPageLayout
              dense
              header={{
                title: 'Block ID',
                clipBoardValue: block.id,
                value: block.truncatedId,
                label: {
                  variant: status === 'Finalized' ? 'green' : 'red',
                  value: status
                },
                actionText: {
                  url: `/blocks/${id}/aggregated-finalization-proof`,
                  value: 'Aggregated Finalization Proof'
                }
              }}
              items={[
                <ContentBlock
                  key='creator'
                  density='compact'
                  blurred
                  sx={{
                    border: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: { xs: '0.75rem', md: '1rem' },
                    backgroundColor: 'rgba(0,0,0,0.55)',
                    boxShadow: '0 6px 24px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.06)',
                  }}
                  title='Creator'
                  url={`/pools/${block.creator}(POOL)`}
                  value={block.creator}
                />,
                [
                  <ContentBlock
                    key='created_at'
                    density='compact'
                    blurred
                    sx={{
                      border: '1px solid rgba(255,255,255,0.08)',
                      borderRadius: { xs: '0.75rem', md: '1rem' },
                      backgroundColor: 'rgba(0,0,0,0.55)',
                      boxShadow: '0 6px 24px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.06)',
                    }}
                    title='Created at'
                    value={block.createdAt}
                  />,
                  <ContentBlock
                    key='epoch'
                    density='compact'
                    blurred
                    sx={{
                      border: '1px solid rgba(255,255,255,0.08)',
                      borderRadius: { xs: '0.75rem', md: '1rem' },
                      backgroundColor: 'rgba(0,0,0,0.55)',
                      boxShadow: '0 6px 24px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.06)',
                    }}
                    title='Epoch'
                    url={`/epochs/${block.epochId}`}
                    value={block.epochId}
                  />
                ],
                [
                  <ContentBlock
                    key='txs_number'
                    density='compact'
                    blurred
                    sx={{
                      border: '1px solid rgba(255,255,255,0.08)',
                      borderRadius: { xs: '0.75rem', md: '1rem' },
                      backgroundColor: 'rgba(0,0,0,0.55)',
                      boxShadow: '0 6px 24px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.06)',
                    }}
                    title='Txs count'
                    value={block.txsNumber}
                  />,
                  <ContentBlock
                    key='index_in_own_sequence'
                    density='compact'
                    blurred
                    sx={{
                      border: '1px solid rgba(255,255,255,0.08)',
                      borderRadius: { xs: '0.75rem', md: '1rem' },
                      backgroundColor: 'rgba(0,0,0,0.55)',
                      boxShadow: '0 6px 24px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.06)',
                    }}
                    title='Index'
                    value={block.index}
                  />,
                ],
                <ContentBlock
                  key='this_block_hash'
                  density='compact'
                  blurred
                  sx={{
                    border: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: { xs: '0.75rem', md: '1rem' },
                    backgroundColor: 'rgba(0,0,0,0.55)',
                    boxShadow: '0 6px 24px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.06)',
                  }}
                  title='Block hash'
                  value={block.aggregatedFinalizationProof.blockHash}
                />,
                <ContentBlock
                  key='previous_block_hash'
                  density='compact'
                  blurred
                  sx={{
                    border: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: { xs: '0.75rem', md: '1rem' },
                    backgroundColor: 'rgba(0,0,0,0.55)',
                    boxShadow: '0 6px 24px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.06)',
                  }}
                  title='Previous block hash'
                  value={block.prevHash}
                />
              ]}
            >
              <BlockHero />
            </EntityPageLayout>
          </Box>

          <Box sx={{ mt: { xs: 3, md: 4 } }}>
            <Typography variant='h1'>Transactions</Typography>
            <Typography sx={{ mt: 1, color: 'rgba(255,255,255,0.6)' }}>
              Included transactions (simulated while the node is unavailable).
            </Typography>

            <Box
              sx={{
                mt: { xs: 2, md: 2.5 },
                border: '1px solid rgba(255,255,255,0.10)',
                borderRadius: { xs: '0.75rem', md: '1rem' },
                backgroundColor: 'rgba(0,0,0,0.55)',
                backdropFilter: 'blur(12px)',
                boxShadow:
                  '0 10px 40px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.06)',
                p: { xs: 1.5, md: 2.25 },
              }}
            >
              <TransactionsTable transactions={txPreviews} variant='glass' dense />
            </Box>
          </Box>
        </PageContainer>
      </DimGradientBackground>
    </GradientBackground>
  );
}