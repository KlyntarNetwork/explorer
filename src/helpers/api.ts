import { getDefaultShardId, getShardNodeUrl, SHARD_COOKIE_KEY } from '@/config/shards';

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
        const url = getShardNodeUrl(shard);
        return url.endsWith('/') ? url : `${url}/`;
      } catch {
        return fallbackUrl.endsWith('/') ? fallbackUrl : `${fallbackUrl}/`;
      }
    }

    // Client: read from URL (?shard=) as the source of truth.
    try {
      const params = new URLSearchParams(window.location.search);
      const shard = params.get('shard') || getDefaultShardId();
      const url = getShardNodeUrl(shard);
      return url.endsWith('/') ? url : `${url}/`;
    } catch {
      const url = getShardNodeUrl(getDefaultShardId());
      return url.endsWith('/') ? url : `${url}/`;
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
