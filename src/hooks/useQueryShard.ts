import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useQueryParams } from './useQueryParams';

interface ComboboxItemProps {
  label: string,
  value: string
}

export function useQueryShard(shardsList: ComboboxItemProps[]) {
  const { replace } = useRouter();
  const {
    shard: initialShard,
    searchParams,
    pathname
  } = useQueryParams();

  const [query, setQuery] = useState<ComboboxItemProps|undefined>(shardsList[0]);

  useEffect(() => {
    const shardById = shardsList.find(i => i.label === initialShard);

    const shard  = shardById ? shardById : shardsList[0];

    setQuery(shard);
    setQueryParameters(shard.label, !!shardById);
  }, [initialShard, shardsList]);

  const handleQueryChange = (_: any, newValue: ComboboxItemProps) => {
    if (newValue && newValue.label) {
      // Shard switch changes the underlying dataset (e.g. /blocks), so reset pagination.
      setQueryParameters(newValue.label, true, true);
    } else {
      setQuery(undefined);
    }
  }

  const setQueryParameters = (shard: string, shardWasFound: boolean, resetPage: boolean = false) => {
    const params = new URLSearchParams(searchParams);
    params.set('shard', shard)
    if (!shardWasFound || resetPage) {
      // Reset pagination without polluting URL with page=1
      params.delete('page');
    }
    replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

  return {
    shard: query,
    handleShardChange: handleQueryChange
  }
}