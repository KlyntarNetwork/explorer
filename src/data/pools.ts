import api from '@/helpers/api';
import { Pool } from '@/definitions';
import { API_ROUTES } from '@/constants/api';
import { isEntityStubMode } from '@/config/stubMode';

export async function fetchPoolById(poolId: string): Promise<Pool> {
  if (isEntityStubMode()) {
    return mockPoolById(poolId);
  }

  try {
    const poolData = await api.get<Pool>(API_ROUTES.POOL.POOL_STATS(poolId));

    return {
      ...poolData,
      poolStorage: {
        ...poolData.poolStorage
      }
    }
  } catch (e: any) {
    throw new Error(`Failed to fetch pool by ID "${poolId}" - ${e.message}`);
  }
}

function mockPoolById(poolId: string): Pool {
  const baseId = poolId.split('(')[0];
  const isActiveValidator = true;
  const isCurrentQuorumMember = (seedInt(`quorum:${poolId}`) % 3) === 0;
  const poolOriginShard = String(seedInt(`shard:${poolId}`) % 4);

  const WEI = BigInt("1000000000000000000");
  const totalStakedKly = String(BigInt(25_000 + (seedInt(`kly:${poolId}`) % 18_000)) * WEI);
  const totalStakedUno = String(BigInt(3_000 + (seedInt(`uno:${poolId}`) % 4_000)) * WEI);
  const percentage = Number((5 + (seedInt(`pct:${poolId}`) % 35)).toFixed?.(2) ?? (5 + (seedInt(`pct:${poolId}`) % 35)));

  const stakersCount = 35 + (seedInt(`stakers:${poolId}`) % 45);
  const stakers: Pool['poolStorage']['stakers'] = {};
  for (let i = 0; i < stakersCount; i++) {
    const id = `0x${seedHex(`${poolId}:staker:${i}`).slice(0, 40)}`;
    const kly = BigInt(10 + (seedInt(`${poolId}:k:${i}`) % 900)) * WEI;
    const uno = BigInt(seedInt(`${poolId}:u:${i}`) % 120) * WEI;
    stakers[id] = { kly: kly.toString(), uno: uno.toString() };
  }

  return {
    isActiveValidator,
    isCurrentQuorumMember,
    poolOriginShard,
    poolMetadata: {
      type: 'contract',
      lang: 'WASM',
      balance: '0',
      gas: 0,
      storages: [],
      storageAbstractionLastPayment: Date.now(),
    },
    poolStorage: {
      activated: true,
      percentage,
      totalStakedKly,
      totalStakedUno,
      stakers,
      poolURL: `https://pool.${poolOriginShard}.klyntar.local/${encodeURIComponent(baseId)}`,
      wssPoolURL: `wss://pool.${poolOriginShard}.klyntar.local/${encodeURIComponent(baseId)}`,
    },
  };
}

function seedInt(seed: string): number {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function seedHex(seed: string): string {
  const n = seedInt(seed).toString(16).padStart(8, '0');
  return (n + n + n + n + n + n + n + n).slice(0, 64);
}
