import { type JobItem, type JobItemDetail } from './types';
import { API_BASE_URL } from './constants';

export const fetchAllJobItems = async (
  searchText: string
): Promise<JobItem[]> => {
  const res = await fetch(`${API_BASE_URL}?search=${searchText}`);
  
  if (!res.ok) {
    console.log('Error fetching data');
    throw new Error('Error fetching data');
  }

  const data = await res.json();

  return data.jobItems;
};

export const fetchJobItem = async (
  activeId: number
): Promise<JobItemDetail> => {
  const res = await fetch(`${API_BASE_URL}/${activeId}`);

  if (!res.ok) {
    console.error('Error fetching data');
    throw new Error('Error fetching job detail');
  }

  const data = await res.json();

  return data.jobItem;
};
