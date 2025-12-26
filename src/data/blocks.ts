import api from '@/helpers/api';
import { FormattedDate, hashData, parseEvmTransaction, truncateMiddle } from '@/helpers';
import {
  Block,
  BLOCK_ID_TYPE,
  BlockExtendedView,
  BlockPreview,
  AggregatedFinalizationProof,
  SyncStats,
  EVMTransaction,
  TX_TYPE
} from '@/definitions';
import { BLOCKS_PER_PAGE } from '@/constants';
import { API_ROUTES } from '@/constants/api';

export async function fetchBlocksByShard(
  shard: string,
  currentPage: number,
  rowsPerPage: number = BLOCKS_PER_PAGE
): Promise<BlockPreview[]> {
  const effectiveShard = shard || '0';
  const perPage = Math.min(100, Math.max(10, rowsPerPage || BLOCKS_PER_PAGE));

  if (process.env.STUB_MODE) {
    return mockBlocksByShard(effectiveShard, currentPage, perPage);
  }

  try {
    const syncStats = await api.get<SyncStats>(API_ROUTES.CHAIN.SYNCHRONIZATION_STATS);
    const latestBlockIndex = syncStats.heightPerShard[effectiveShard];

    const startIndex = latestBlockIndex - 1;
    const blocks = await api.get<
      Array<Block & { sid: string }>
    >(API_ROUTES.BLOCKS.LATEST_N_BLOCKS(effectiveShard, startIndex, perPage * currentPage));

    return blocks.map(block => {
      const {sid, creator, epoch, index, transactions, time} = block;

      const epochId = getEpochId(epoch);
      const id = epochId + ':' + creator + ':' + index;

      const txsNumber = transactions.length;
      const createdAt = new FormattedDate(time).preview;

      return {
        id,
        sid,
        creator,
        epochId,
        index,
        txsNumber,
        createdAt
      }
    });
  } catch (e: any) {
    if (process.env.NODE_ENV !== 'production') {
      return mockBlocksByShard(effectiveShard, currentPage, perPage);
    }
    throw new Error(`Failed to fetch blocks by shard "${effectiveShard}" - ${e.message}`);
  }
}

export async function fetchBlockById(id: string): Promise<BlockExtendedView> {
  if (process.env.STUB_MODE) {
    return mockBlockById(id);
  }

  let block;

  try {
    if (identifyIdType(id) === BLOCK_ID_TYPE.SID) {
      const [shard, indexInShard] = id.split(':');
      block = await api.get<Block>(API_ROUTES.BLOCKS.BLOCK_BY_SID(shard, indexInShard));
    } else {
      block = await api.get<Block>(API_ROUTES.BLOCKS.BLOCK_BY_ID(id));
    }

    const {  creator, index, transactions: blockTxs, time, epoch, prevHash } = block;
    const txsNumber = blockTxs.length;
    const createdAt = new FormattedDate(time).full;

    const epochId = getEpochId(epoch);

    const blockId = epochId + ':' + creator + ':' + index;
    const truncatedBlockId = `${epochId}:${truncateMiddle(creator)}:${index}`;

    const aggregatedFinalizationProof = await fetchAggregatedFinalizationProof(blockId);

    const transactions = await Promise.all(
      blockTxs.map(async (tx) =>
        tx.type === TX_TYPE.EVM_CALL
          ? parseEvmTransaction(tx as EVMTransaction)
          : { ...tx, txHash: await hashData(tx.sig) }
      )
    );

    return {
      id: blockId,
      truncatedId: truncatedBlockId,
      creator,
      epoch,
      epochId,
      index,
      transactions,
      txsNumber,
      createdAt,
      prevHash,
      aggregatedFinalizationProof
    };
  } catch (e: any) {
    if (process.env.NODE_ENV !== 'production') {
      return mockBlockById(id);
    }
    throw new Error(`Failed to fetch block by ID "${id}" - ${e.message}`);
  }
}

export async function fetchAggregatedFinalizationProof(id: string): Promise<AggregatedFinalizationProof> {
  let blockId = id;

  if (process.env.STUB_MODE) {
    return mockAggregatedFinalizationProof(blockId);
  }

  try {
    if (identifyIdType(id) === BLOCK_ID_TYPE.SID) {
      const [shard, indexInShard] = id.split(':');
      const {epoch, creator, index} = await api.get<Block>(API_ROUTES.BLOCKS.BLOCK_BY_SID(shard, indexInShard));

      const epochId = getEpochId(epoch);

      blockId = epochId + ':' + creator + ':' + index;
    }

    return await api.get(API_ROUTES.BLOCKS.AGGREGATED_FINALIZATION_PROOF(blockId));
  } catch (e: any) {
    if (process.env.NODE_ENV !== 'production') {
      return mockAggregatedFinalizationProof(blockId);
    }
    throw new Error(`Failed to fetch aggregated finalization proof by block ID "${blockId}" - ${e.message}`);
  }
}

function identifyIdType(id: string): BLOCK_ID_TYPE {
  const isSID = id.split(':').length === 2;

  return isSID ? BLOCK_ID_TYPE.SID : BLOCK_ID_TYPE.BLOCK_ID;
}

function getEpochId(fullEpoch: string): number {
  return Number(fullEpoch.split('#')[1]);
}

// -----------------------------
// Mocks (used when node/API is unavailable)
// -----------------------------

function mockBlocksByShard(shard: string, currentPage: number, perPage: number): BlockPreview[] {
  const page = Math.max(1, currentPage || 1);
  const epochId = 128;
  const now = Date.now();
  const start = (page - 1) * perPage;

  return Array.from({ length: perPage }).map((_, i) => {
    const height = 50_000 - (start + i);
    const creator = mockAddress(`${shard}:${height}`);
    const index = (height % 64) + 1;
    const txsNumber = (height % 7) + 1;
    const time = now - (start + i) * 12_000; // 12s slot time feel

    const sid = `${shard}:${height}`;
    const id = `${epochId}:${creator}:${index}`;

    return {
      id,
      sid,
      creator,
      epochId,
      index,
      txsNumber,
      createdAt: new FormattedDate(time).preview,
    };
  });
}

function mockBlockById(id: string): BlockExtendedView {
  const now = Date.now();
  const epochId = 128;
  const isSID = identifyIdType(id) === BLOCK_ID_TYPE.SID;

  const shard = isSID ? id.split(':')[0] : '0';
  const height = isSID ? Number(id.split(':')[1] || 50_000) : 50_000;

  const creator = isSID ? mockAddress(id) : id.split(':')[1] || mockAddress(id);
  const index = isSID ? (height % 64) + 1 : Number(id.split(':')[2] || 1);

  const blockId = isSID ? `${epochId}:${creator}:${index}` : id;
  const truncatedBlockId = `${epochId}:${truncateMiddle(creator)}:${index}`;

  const txCount = (index % 9) + 3;
  const transactions = Array.from({ length: txCount }).map((_, i) => {
    const nonce = index * 100 + i;
    const type = i % 4 === 0 ? TX_TYPE.EVM_CALL : TX_TYPE.TX;
    const sig = `sig_${shard}_${index}_${i}`.padEnd(64, '0');
    const txHash = `0x${hashSeed(`${blockId}:${i}`)}`;

    return {
      v: 1,
      creator,
      type,
      nonce,
      fee: String(1000 + i * 7),
      payload: type === TX_TYPE.EVM_CALL ? '0x' + hashSeed(`payload:${blockId}:${i}`) : { memo: 'mock tx' },
      sigType: 'ED25519',
      sig,
      txHash,
    };
  });

  const createdAt = new FormattedDate(now - (50_000 - height) * 12_000).full;
  const prevHash = `0x${hashSeed(`prev:${blockId}`)}`;
  const aggregatedFinalizationProof = mockAggregatedFinalizationProof(blockId);

  return {
    id: blockId,
    truncatedId: truncatedBlockId,
    creator,
    epoch: `epoch#${epochId}`,
    epochId,
    index,
    txsNumber: transactions.length,
    transactions,
    createdAt,
    aggregatedFinalizationProof,
    prevHash,
  };
}

function mockAggregatedFinalizationProof(blockId: string): AggregatedFinalizationProof {
  const prevBlockHash = `0x${hashSeed(`afp:prev:${blockId}`)}`;
  const blockHash = `0x${hashSeed(`afp:block:${blockId}`)}`;

  return {
    prevBlockHash,
    blockID: blockId,
    blockHash,
    proofs: {
      '0': `sig_${hashSeed(`proof:0:${blockId}`).slice(0, 32)}`,
      '1': `sig_${hashSeed(`proof:1:${blockId}`).slice(0, 32)}`,
      '2': `sig_${hashSeed(`proof:2:${blockId}`).slice(0, 32)}`,
    },
  };
}

function mockAddress(seed: string): string {
  return `kly_${hashSeed(`addr:${seed}`).slice(0, 48)}`;
}

function hashSeed(seed: string): string {
  // cheap deterministic hash (not cryptographic)
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  // convert to hex and repeat to get a long-ish string
  const hex = (h >>> 0).toString(16).padStart(8, '0');
  return (hex + hex + hex + hex + hex + hex + hex + hex).slice(0, 64);
}