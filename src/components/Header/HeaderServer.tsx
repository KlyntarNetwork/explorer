import { Header as HeaderClient } from './Header';
import { fetchCurrentShards } from '@/data';

export const Header = async () => {
  // Header is part of RootLayout; it must never crash the whole app due to node/API issues.
  // Fallback to a safe default shard list.
  let shards: string[] = ['0'];

  try {
    shards = await fetchCurrentShards();
    if (!Array.isArray(shards) || shards.length === 0) {
      shards = ['0'];
    }
  } catch {
    shards = ['0'];
  }

  return <HeaderClient shardsList={shards} />;
};




