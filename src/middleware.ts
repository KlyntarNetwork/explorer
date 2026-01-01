import { NextRequest, NextResponse } from 'next/server';
import { getDefaultShardId, getShardIds, SHARD_COOKIE_KEY } from '@/config/shards';

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();

  // Ignore static assets / Next internals.
  if (
    url.pathname.startsWith('/_next') ||
    url.pathname.startsWith('/api') ||
    url.pathname.startsWith('/favicon') ||
    url.pathname.startsWith('/icons') ||
    url.pathname.startsWith('/opengraph-image')
  ) {
    return NextResponse.next();
  }

  const defaultShard = getDefaultShardId();
  const allowed = new Set(getShardIds());

  const shardParam = url.searchParams.get('shard');
  const normalizedShard = shardParam && allowed.has(shardParam) ? shardParam : defaultShard;

  // Always set cookie so server-side fetches can route to the correct node.
  // If URL has no shard -> redirect to shard=default to make links shareable.
  if (!shardParam) {
    url.searchParams.set('shard', normalizedShard);
    const res = NextResponse.redirect(url);
    res.cookies.set(SHARD_COOKIE_KEY, normalizedShard, { path: '/', sameSite: 'lax' });
    return res;
  }

  const res = NextResponse.next();
  res.cookies.set(SHARD_COOKIE_KEY, normalizedShard, { path: '/', sameSite: 'lax' });
  return res;
}

export const config = {
  matcher: ['/((?!.*\\..*).*)'],
};



