import api from '@/helpers/api';
import { formatNumber } from '@/helpers';
import { BlockStats, ChainInfo, ShardsData, BlockchainData, RecentBlockStats } from '@/definitions';
import { API_ROUTES } from '@/constants/api';
import { fetchCurrentEpoch } from '@/data/epochs';
import { getInfoFromEpoch, getTxSuccessRate } from './utils';
import { isEntityStubMode, isGlobalStubMode } from '@/config/stubMode';

export async function fetchBlockchainData(): Promise<BlockchainData> {

  const defaultData: BlockchainData = {
    epochId: 0,
    shardsNumber: 0,
    validatorsNumber: 0,
    totalTxsNumber: 'N/A',
    txsSuccessRate: 'N/A',
    totalBlocksNumber: 'N/A',
    totalBlocksNumberInCurrentEpoch: 'N/A',
    slotTimeInSeconds: 0,
    totalStaked: 'N/A',
    chainInfo: {
      networkId: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
      validatorStakeSize: 'N/A',
      coreMajorVersion: 0,
      quorumSize: 'N/A validators',
      minimalStakePerEntity: 0,
      epochDuration: 'N/A hours',
      leaderTimeframe: 'N/A seconds',
      slotTime: 'N/A seconds',
      maxBlockSize: 'N/A Mb',
    }
  }

  if (isGlobalStubMode()) {
    return defaultData;
  }

  try {
    const verificationThreadStats = await api.get<BlockStats>(API_ROUTES.STATS.VERIFICATION_THREAD_STATS);
    const epochMetadata = await fetchCurrentEpoch();
    const verificationThreadStatsPerEpoch = await fetchTotalBlocksAndTxsByEpoch(epochMetadata.id);
    const chainData = await api.get<ChainInfo>(API_ROUTES.CHAIN.INFO);

    const { shardsNumber, validatorsNumber } = getInfoFromEpoch(epochMetadata);

    const txsSuccessRate = getTxSuccessRate(verificationThreadStats);

    const slotTimeInSeconds = chainData.approvementThread.params.BLOCK_TIME / 1000;

    const totalStaked = verificationThreadStats.totalKlyStaked;

    return {
      shardsNumber,
      validatorsNumber,
      txsSuccessRate,
      epochId: epochMetadata.id,
      slotTimeInSeconds,
      totalBlocksNumber: formatNumber(verificationThreadStats.totalBlocksNumber),
      totalTxsNumber: formatNumber(verificationThreadStats.totalTxsNumber),
      totalBlocksNumberInCurrentEpoch: formatNumber(verificationThreadStatsPerEpoch.totalBlocksNumber),
      totalStaked: formatNumber(totalStaked),
      chainInfo: {
        networkId: chainData.genesis.networkID,
        validatorStakeSize: formatNumber(chainData.approvementThread.params.VALIDATOR_STAKE),
        coreMajorVersion: chainData.approvementThread.version,
        quorumSize: chainData.approvementThread.params.QUORUM_SIZE + ' validators',
        minimalStakePerEntity: chainData.approvementThread.params.MINIMAL_STAKE_PER_ENTITY,
        epochDuration: chainData.approvementThread.params.EPOCH_TIME / 3600000 + ' hours',
        leaderTimeframe: chainData.approvementThread.params.LEADERSHIP_TIMEFRAME / 1000 + ' seconds',
        slotTime: chainData.approvementThread.params.BLOCK_TIME / 1000 + ' seconds',
        maxBlockSize: (chainData.approvementThread.params.MAX_BLOCK_SIZE_IN_BYTES / 1000000).toFixed(2) + 'Mb'
      }
    };
  } catch (e: any) {
    throw new Error(`Failed to fetch blockchain data - ${e.message}`);
  }
}

export async function fetchTotalBlocksAndTxsByEpoch(id: number | string): Promise<BlockStats> {
  const mockForEpoch = (epochId: number): BlockStats => {
    const baseBlocks = 95_000;
    const baseTxs = 2_400_000;
    const blocks = baseBlocks + (epochId % 200) * 420;
    const txs = baseTxs + (epochId % 200) * 38_000;
    const success = Math.floor(txs * (0.965 + ((epochId % 7) * 0.002)));

    return {
      totalBlocksNumber: blocks,
      totalTxsNumber: txs,
      successfulTxsNumber: Math.min(success, txs),
      // keep same shape as API
      // @ts-expect-error: declared as literal 'string' in definitions
      totalKlyStaked: '45807498008',
    };
  };

  if (isEntityStubMode()) {
    return mockForEpoch(Number(id));
  }

  try {
    return await api.get<BlockStats>(API_ROUTES.STATS.VERIFICATION_THREAD_STATS_PER_EPOCH(Number(id)));
  } catch (e: any) {
    throw new Error(`Failed to fetch total blocks and txs by epoch ID "${id}" - ${e.message}`);
  }
}

export async function fetchRecentTotalBlocksAndTxs(limit: number): Promise<RecentBlockStats> {
  const mockRecentStats = (): RecentBlockStats => {
    // deterministic mock: last N epochs with increasing tx count
    const stats: RecentBlockStats = {};
    const baseEpoch = 1200;
    for (let i = 0; i < limit; i++) {
      const epochId = String(baseEpoch + i);
      stats[epochId] = {
        totalBlocksNumber: 120_000 + i * 1_250,
        totalTxsNumber: 3_000_000 + i * 120_000,
        successfulTxsNumber: 2_940_000 + i * 118_000,
        // keep the same shape as in API even if it's not used by this chart
        // @ts-expect-error: type in definitions is currently declared as literal 'string'
        totalKlyStaked: '45807498008',
      };
    }
    return stats;
  };

  if (isEntityStubMode()) {
    return mockRecentStats();
  }

  try {
    return await api.get<RecentBlockStats>(API_ROUTES.STATS.RECENT_VERIFICATION_THREAD_STATS_PER_EPOCH(limit));
  } catch (e: any) {
    throw new Error(`Failed to fetch recent total blocks and txs - ${e.message}`);
  }
}

export async function fetchCurrentShards(): Promise<string[]> {
  const mockShards = () => ['0', '1', '2', '3'];

  if (isEntityStubMode()) {
    return mockShards();
  }

  try {
    const currentShardsData = await api.get<ShardsData>(API_ROUTES.CHAIN.CURRENT_SHARDS_LEADERS);

    return Object.keys(currentShardsData);
  } catch (e: any) {
    throw new Error(`Failed to fetch current shards - ${e.message}`);
  }
}
