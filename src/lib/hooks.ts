import { useEffect, useState } from 'react';
import { type JobItem, type JobItemDetail } from './types';
import { API_BASE_URL } from './constants';

export const useJobItem = (activeId: number | null) => {
  const [activeJob, setActiveJob] = useState<JobItemDetail | null>(null);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      const res = await fetch(`${API_BASE_URL}/${activeId}`);

      if (!res.ok) {
        console.error('Error fetching data');
        return;
      }

      const data = await res.json();
      setIsLoading(false);
      setActiveJob(data.jobItem);
    }
    if (activeId) fetchData();
  }, [activeId]);

  return { activeJob, isLoading };
};

export const useJobItems = (searchText: string) => {
  const [jobItems, setJobItems] = useState<JobItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const numOfResults = jobItems.length;

  useEffect(() => {
    // https://bytegrad.com/course-assets/projects/rmtdev/api/data

    async function fetchData() {
      setIsLoading(true);
      const res = await fetch(`${API_BASE_URL}?search=${searchText}`);
      if (!res.ok) {
        console.error('Error fetching data');
        return;
      }

      const data = await res.json();
      setIsLoading(false);
      setJobItems(data.jobItems);
    }
    if (searchText) fetchData();
  }, [searchText]);

  const jobItemsSliced = jobItems.slice(0, 7);

  return { jobItemsSliced, isLoading, numOfResults };
  // return [jobItemsSliced, isLoading] as const;
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

// export const useDebounce = <T>(value: T, delay = 500): T => {}
export function useDebounce<T>(value: T, delay = 500): T {
  const [debounceValue, setDebounceValue] = useState<T>(value);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebounceValue(value);
    }, delay);

    return () => clearTimeout(timeout);
  }, [value, delay]);

  return debounceValue;
}
