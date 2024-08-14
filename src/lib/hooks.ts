import { useEffect, useState } from 'react';
import { useQueries, useQuery } from '@tanstack/react-query';
import { fetchAllJobItems, fetchJobItem } from './api-client';
import { type JobItemDetail } from './types';

export const useJobItems = (bookmarkedIds: number[]) => {
  const { data, isLoading } = useQueries({
    queries: bookmarkedIds.map((id) => ({
      queryKey: ['job-item', id],
      queryFn: () => fetchJobItem(id),
    })),
    combine: (results) => {
      return {
        data: results.map((result) => result.data),
        isLoading: results.some((result) => result.isPending),
      };
    },
  });

  return { data, isLoading } as {
    data: JobItemDetail[];
    isLoading: boolean;
  };
};

export const useJobItem = (activeId: number | null) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['job-item', activeId],
    queryFn: () => fetchJobItem(activeId!),
    retry: false,
    enabled: Boolean(activeId),
  });

  return { data, isLoading, isError };
};

export const useSearchQuery = (searchText: string) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['job-items', searchText],
    queryFn: () => fetchAllJobItems(searchText),
    enabled: Boolean(searchText),
    retry: false,
  });

  return { data, isLoading, isError };
};

export const useActiveId = () => {
  const [activeId, setActiveId] = useState<number | null>(null);

  useEffect(() => {
    const handleHashchange = () => {
      setActiveId(Number(window.location.hash.slice(1)));
    };

    handleHashchange();

    window.addEventListener('hashchange', handleHashchange);

    return () => window.removeEventListener('hashchange', handleHashchange);
  }, []);

  return { activeId };
};

