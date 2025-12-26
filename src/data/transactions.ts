import api from '@/helpers/api';
import { API_ROUTES } from '@/constants/api';
import {
  TransactionExtendedView,
  TransactionReceipt,
  TransactionWithTxHash,
  TransactionPreview,
  TX_TYPE
} from '@/definitions';
import { fetchBlockById } from './blocks';

export async function fetchTransactionByTxHash(hash: string): Promise<TransactionExtendedView> {
  if (process.env.STUB_MODE) {
    return mockTransactionByHash(hash);
  }

  try {
    const receipt = await api.get<TransactionReceipt>(API_ROUTES.TRANSACTIONS.TX_RECEIPT(hash));
    const block = await fetchBlockById(receipt.blockID);

    const transaction = block.transactions
      .find(tx => tx.txHash === hash) as TransactionWithTxHash;

    return {
      block,
      ...receipt,
      ...transaction,
      typeDescription: describeTransactionType(transaction.type),
      creatorFormatDescription: describeTransactionCreatorFormat(transaction.creator)
    }
  } catch (e: any) {
    if (process.env.NODE_ENV !== 'production') {
      return mockTransactionByHash(hash);
    }
    throw new Error(`Failed to fetch transaction by hash "${hash}" - ${e.message}`);
  }
}

export async function fetchAccountTransactions(shard: string, accountId: string): Promise<TransactionPreview[]> {
  if (process.env.STUB_MODE) {
    return mockAccountTransactions(shard, accountId);
  }

  try {
    return await api.get<TransactionPreview[]>(API_ROUTES.TRANSACTIONS.ACCOUNT_TRANSACTIONS(shard, accountId));
  } catch (e: any) {
    if (process.env.NODE_ENV !== 'production') {
      return mockAccountTransactions(shard, accountId);
    }
    throw new Error(`Failed to fetch transactions by account id "${accountId}" in shard "${shard}" - ${e.message}`);
  }
}

function describeTransactionType(type: string) {
  switch (type) {
    case TX_TYPE.TX:
      return 'simple address to address tx';
    case TX_TYPE.WVM_CONTRACT_DEPLOY:
      return 'contract deployment to WASM vm';
    case TX_TYPE.WVM_CALL:
      return 'call smart-contract in WASM vm';
    case TX_TYPE.EVM_CALL:
      return 'interaction with EVM';
    default:
      return '';
  }
}

export function describeTransactionCreatorFormat(creator: string) {
  const length = creator.length;

  if (length === 44 || length === 43) {
    return 'ED25519';
  } else if (length === 98) {
    return 'BLS, multisig';
  } else if (length === 96) {
    return 'TBLS, tsig';
  } else if (length === 64) {
    return 'PQC, post-quantum';
  } else if (creator.startsWith('0x') && length === 42) {
    return 'ECDSA, EVM-compatible';
  } else {
    return 'Unknown format';
  }
}

// -----------------------------
// Mocks (used when node/API is unavailable)
// -----------------------------

async function mockTransactionByHash(hash: string): Promise<TransactionExtendedView> {
  const shard = '0';
  const creator = hash.startsWith('0x') ? '0x' + hashSeed(`creator:${hash}`).slice(0, 40) : `kly_${hashSeed(`creator:${hash}`).slice(0, 48)}`;
  const to = hash.startsWith('0x') ? '0x' + hashSeed(`to:${hash}`).slice(0, 40) : `kly_${hashSeed(`to:${hash}`).slice(0, 48)}`;

  const block = await fetchBlockById(`128:${creator}:1`);

  const receipt: TransactionReceipt = {
    shard,
    blockID: block.id,
    order: 0,
    isOk: true,
    priorityFee: '0',
    totalFee: '0',
  };

  const tx: TransactionWithTxHash = {
    v: 1,
    creator,
    type: TX_TYPE.TX,
    nonce: 1,
    fee: '0',
    payload: {
      to,
      amount: '100000000000000000', // 0.1 KLY in wei
      touchedAccounts: [],
      gasAbstraction: false,
    },
    sigType: 'ED25519',
    sig: `sig_${hashSeed(`sig:${hash}`).slice(0, 64)}`,
    txHash: hash,
  };

  return {
    block,
    ...receipt,
    ...tx,
    typeDescription: describeTransactionType(tx.type),
    creatorFormatDescription: describeTransactionCreatorFormat(tx.creator),
  };
}

function mockAccountTransactions(_shard: string, accountId: string): TransactionPreview[] {
  return Array.from({ length: 12 }).map((_, i) => {
    const txid = `0x${hashSeed(`acct:${accountId}:${i}`).slice(0, 64)}`;
    return {
      txid,
      txType: i % 4 === 0 ? TX_TYPE.EVM_CALL : TX_TYPE.TX,
      sigType: 'ED25519',
      priorityFee: String(1000 + i * 17),
      totalFee: 'N/A',
      creator: accountId,
    };
  });
}

function hashSeed(seed: string): string {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  const hex = (h >>> 0).toString(16).padStart(8, '0');
  return (hex + hex + hex + hex + hex + hex + hex + hex).slice(0, 64);
}