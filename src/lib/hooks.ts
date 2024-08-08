import { useEffect, useState } from 'react';
import { JobItem } from './types';

export const useJobItems = (searchText: string) => {
  const [jobItems, setJobItems] = useState<JobItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // https://bytegrad.com/course-assets/projects/rmtdev/api/data

    async function fetchData() {
      setIsLoading(true);
      const res = await fetch(
        `https://bytegrad.com/course-assets/projects/rmtdev/api/data?search=${searchText}`
      );
      if (!res.ok) {
        console.error('Error fetching data');
        return;
      }

      const data = await res.json();
      setIsLoading(false);
      setJobItems(data.jobItems);
    }
    if (!searchText) return;

    const timer = setTimeout(() => {
      fetchData();
    }, 500);

    return () => clearTimeout(timer);
  }, [searchText]);

  const jobItemsSliced = jobItems.slice(0, 7);

  return { jobItemsSliced, isLoading };
  // return [jobItemsSliced, isLoading] as const;
};
