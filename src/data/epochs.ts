import api from '@/helpers/api';
import { API_ROUTES } from '@/constants/api';
import { Epoch, EpochExtendedData } from '@/definitions';
import { fetchTotalBlocksAndTxsByEpoch } from './blockchain';
import { getInfoFromEpoch, getTxSuccessRate } from './utils';

export async function fetchEpochById(id: number): Promise<EpochExtendedData> {
  if (process.env.STUB_MODE) {
    return mockEpochById(id);
  }

  try {
    const currentEpoch = await fetchCurrentEpoch();

    const isFirst = id === 0;
    const isCurrent = id === currentEpoch.id;

    const epoch = isCurrent
      ? currentEpoch
      : await api.get<Epoch>(API_ROUTES.EPOCH.EPOCH_BY_ID(id));

    const { shardsNumber, validatorsNumber, quorumSize } = getInfoFromEpoch(epoch);

    const totalBlocksAndTxsData = await fetchTotalBlocksAndTxsByEpoch(epoch.id);
    const { totalBlocksNumber, totalTxsNumber  } = totalBlocksAndTxsData;
    const txsSuccessRate = getTxSuccessRate(totalBlocksAndTxsData);

    return {
      ...epoch,
      isFirst,
      isCurrent,
      shardsNumber,
      validatorsNumber,
      quorumSize,
      totalBlocksNumber,
      totalTxsNumber,
      txsSuccessRate
    }
  } catch (e: any) {
    if (process.env.NODE_ENV !== 'production') {
      return mockEpochById(id);
    }
    throw new Error(`Failed to fetch epoch by id "${id}" - ${e.message}`);
  }
}

export async function fetchCurrentEpoch(): Promise<Epoch> {
  if (process.env.STUB_MODE) {
    return mockEpochById(128);
  }

  try {
    return await api.get<Epoch>(API_ROUTES.EPOCH.CURRENT_EPOCH_AT);
  } catch (e: any) {
    if (process.env.NODE_ENV !== 'production') {
      return mockEpochById(128);
    }
    throw new Error(`Failed to fetch current epoch - ${e.message}`);
  }
}

function mockEpochById(id: number): EpochExtendedData {
  const epochId = Math.max(0, Number.isFinite(id) ? id : 0);
  const isFirst = epochId === 0;
  const isCurrent = epochId === 128;

  const shardCount = 4 + (epochId % 2); // 4-5 shards
  const validatorsCount = 28 + (epochId % 9); // 28-36 validators
  const quorumSize = Math.floor(validatorsCount * (2 / 3));

  const shardsRegistry = Array.from({ length: shardCount }).map((_, i) => String(i));
  const poolsRegistry = Array.from({ length: validatorsCount }).map((_, i) => `kly_${seedHex(`epoch:${epochId}:pool:${i}`).slice(0, 48)}`);
  const quorum = poolsRegistry.slice(0, quorumSize);
  const leadersSequence = [...poolsRegistry];

  const startTimestamp = Date.now() - (128 - epochId) * 60 * 60 * 1000;
  const hash = `0x${seedHex(`epoch:${epochId}:hash`).slice(0, 64)}`;

  const epoch: Epoch = {
    id: epochId,
    hash,
    poolsRegistry,
    shardsRegistry,
    startTimestamp,
    quorum,
    leadersSequence,
  };

  const { shardsNumber, validatorsNumber } = getInfoFromEpoch(epoch);
  const totalBlocksAndTxsData = {
    totalBlocksNumber: 95_000 + (epochId % 200) * 420,
    totalTxsNumber: 2_400_000 + (epochId % 200) * 38_000,
    successfulTxsNumber: 2_320_000 + (epochId % 200) * 36_000,
    // @ts-expect-error: declared as literal 'string'
    totalKlyStaked: '45807498008',
  };
  const txsSuccessRate = getTxSuccessRate(totalBlocksAndTxsData as any);

  return {
    ...epoch,
    isFirst,
    isCurrent,
    shardsNumber,
    validatorsNumber,
    quorumSize,
    totalBlocksNumber: (totalBlocksAndTxsData as any).totalBlocksNumber,
    totalTxsNumber: (totalBlocksAndTxsData as any).totalTxsNumber,
    txsSuccessRate,
  };
}

function seedHex(seed: string): string {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  const hex = (h >>> 0).toString(16).padStart(8, '0');
  return (hex + hex + hex + hex + hex + hex + hex + hex).slice(0, 64);
}