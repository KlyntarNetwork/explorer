import { getDefaultShardId, getShardNodeUrl, SHARD_COOKIE_KEY } from '@/config/shards';

const CUSTOM_RPC_COOKIE_PREFIX = 'klyntar_custom_rpc_';
const CUSTOM_RPC_STORAGE_PREFIX = 'klyntar:customRpc:';

function withTrailingSlash(url: string) {
  const u = (url || '').trim();
  if (!u) return u;
  return u.endsWith('/') ? u : `${u}/`;
}

function safeDecode(v?: string) {
  if (!v) return '';
  try {
    return decodeURIComponent(v);
  } catch {
    return v;
  }
}

class Fetcher {
  private getBaseUrl() {
    // Server: shard is stored in cookie by middleware
    if (typeof window === 'undefined') {
      // IMPORTANT: do not statically import `next/headers` here (module is also used client-side).
      // Use a runtime require so client bundling doesn't fail.
      const fallbackUrl = getShardNodeUrl(getDefaultShardId());
      try {
        const mod = require('next/headers') as { cookies: () => { get: (k: string) => { value?: string } | undefined } };
        const shard = mod.cookies().get(SHARD_COOKIE_KEY)?.value || getDefaultShardId();
        const custom = safeDecode(mod.cookies().get(`${CUSTOM_RPC_COOKIE_PREFIX}${shard}`)?.value);
        const base = custom || getShardNodeUrl(shard);
        return withTrailingSlash(base);
      } catch {
        return withTrailingSlash(fallbackUrl);
      }
    }

    // Client: read from URL (?shard=) as the source of truth.
    try {
      const params = new URLSearchParams(window.location.search);
      const shard = params.get('shard') || getDefaultShardId();
      let custom = '';
      try {
        custom = window.localStorage.getItem(`${CUSTOM_RPC_STORAGE_PREFIX}${shard}`) || '';
      } catch {
        // ignore
      }
      const base = custom || getShardNodeUrl(shard);
      return withTrailingSlash(base);
    } catch {
      const url = getShardNodeUrl(getDefaultShardId());
      return withTrailingSlash(url);
    }
  }

  async get<T>(url: string): Promise<T> {
    const fullUrl = `${this.getBaseUrl()}${url}`;

    const response = await fetch(fullUrl, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      next: {
        revalidate: 0
      }
    });

    const responseData = await response.json();

    if (!response.ok) {
      throw new Error(
        `API error: ${response.status} ${response.statusText} at ${fullUrl} - ${responseData.message || 'Unknown error'}`
      );
    }

    return responseData;
  }
}

const fetcher = new Fetcher();

export default fetcher;
