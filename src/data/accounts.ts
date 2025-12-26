import api from '@/helpers/api';
import { API_ROUTES } from '@/constants/api';
import { UserAccount, ContractAccount } from '@/definitions';
import { isEntityStubMode } from '@/config/stubMode';

export async function fetchAccountById(
  shard: string,
  id: string,
  opts?: { forceStub?: boolean }
): Promise<UserAccount|ContractAccount> {
  if (opts?.forceStub || isEntityStubMode()) {
    return mockAccountById(shard, id);
  }

  try {
    return await api.get<UserAccount|ContractAccount>(API_ROUTES.ACCOUNTS.ACCOUNT_BY_ID(shard, id));
  } catch (e: any) {
    throw new Error(`Failed to fetch account by id "${id}" in shard "${shard}" - ${e.message}`);
  }
}

function mockAccountById(_shard: string, id: string): UserAccount | ContractAccount {
  const isContract = id.startsWith('contract_') || id.includes('system/');
  if (isContract) {
    return {
      type: 'contract',
      lang: 'EVM',
      balance: '0',
      gas: 0,
      storages: [],
      storageAbstractionLastPayment: Date.now(),
    };
  }

  return {
    type: 'eoa',
    // 1.2345 KLY in wei
    balance: '1234500000000000000',
    nonce: 42,
    gas: 0,
  };
}