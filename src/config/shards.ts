import shardsConfig from './shards.json';

export type ShardId = string;

export interface ShardConfigItem {
  id: ShardId;
  nodeUrl: string;
}

export interface ShardsConfig {
  defaultShardId: ShardId;
  shards: ShardConfigItem[];
}

export const SHARD_COOKIE_KEY = 'klyntar_shard';

export function getShardsConfig(): ShardsConfig {
  return shardsConfig as unknown as ShardsConfig;
}

export function getDefaultShardId(): ShardId {
  const cfg = getShardsConfig();
  return cfg.defaultShardId || cfg.shards?.[0]?.id || '0';
}

export function getAllShards(): ShardConfigItem[] {
  const cfg = getShardsConfig();
  return Array.isArray(cfg.shards) && cfg.shards.length ? cfg.shards : [{ id: '0', nodeUrl: 'http://localhost:7332' }];
}

export function getShardIds(): ShardId[] {
  return getAllShards().map((s) => s.id);
}

export function getShardById(id: ShardId): ShardConfigItem | undefined {
  return getAllShards().find((s) => s.id === id);
}

export function getShardNodeUrl(id: ShardId): string {
  const shard = getShardById(id);
  return shard?.nodeUrl || getShardById(getDefaultShardId())?.nodeUrl || 'http://localhost:7332';
}



