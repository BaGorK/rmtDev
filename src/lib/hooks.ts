import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchAllJobItems, fetchJobItem } from './api-client';

export const useJobItem = (activeId: number | null) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['job-item', activeId],
    queryFn: () => fetchJobItem(activeId!),
    retry: false,
    enabled: Boolean(activeId),
  });

  return { data, isLoading, isError };
};

export const useJobItems = (searchText: string) => {
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
