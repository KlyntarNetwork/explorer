export const SEARCH_OPTIONS = {
  CHOOSE: 'choose',
  TRANSACTION_BY_HASH: 'transaction_by_hash',
  ALIAS: 'alias',
  BLOCK_BY_SID: 'block_by_sid',
  BLOCK_BY_ID: 'block_by_id',
  POOL_BY_ID: 'pool_by_id',
  EPOCH_BY_ID: 'epoch_by_id',
  ACCOUNT_BY_ID: 'account_by_id',
  CONTRACT_BY_ID: 'contract_by_id'
};

export const SEARCH_OPTIONS_PLACEHOLDER = {
  [SEARCH_OPTIONS.CHOOSE]:
    'Search by tx hash, block id, epoch, account, contract, pool id, or alias.',
  [SEARCH_OPTIONS.TRANSACTION_BY_HASH]: 'Enter the Tx ID - BLAKE3(KLY) or SHA3(EVM) hash of transaction',
  [SEARCH_OPTIONS.ALIAS]: 'Enter the alias of contract or user',
  [SEARCH_OPTIONS.BLOCK_BY_SID]: 'Enter the SID in format <shard>:<index>',
  [SEARCH_OPTIONS.BLOCK_BY_ID]: 'Enter Block ID in format <epoch>:<creator>:<index>',
  [SEARCH_OPTIONS.POOL_BY_ID]: 'Enter Pool ID in format <pool pubkey>(POOL)',
  [SEARCH_OPTIONS.EPOCH_BY_ID]: 'Enter epoch index',
  [SEARCH_OPTIONS.ACCOUNT_BY_ID]: 'Enter Account ID in format <shard>:<account>',
  [SEARCH_OPTIONS.CONTRACT_BY_ID]: 'Enter Contract ID in format <shard>:<contract>',
};

export const SEARCH_OPTIONS_URL = {
  [SEARCH_OPTIONS.CHOOSE]: '#',
  [SEARCH_OPTIONS.TRANSACTION_BY_HASH]: '/tx',
  [SEARCH_OPTIONS.ALIAS]: '#',
  [SEARCH_OPTIONS.BLOCK_BY_SID]: '/blocks',
  [SEARCH_OPTIONS.BLOCK_BY_ID]: '/blocks',
  [SEARCH_OPTIONS.POOL_BY_ID]: '/pools',
  [SEARCH_OPTIONS.EPOCH_BY_ID]: '/epochs',
  [SEARCH_OPTIONS.ACCOUNT_BY_ID]: '/users',
  [SEARCH_OPTIONS.CONTRACT_BY_ID]: '/contracts',
};