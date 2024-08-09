import { useState } from 'react';

import Background from './components/Background';
import Container from './components/Container';
import Footer from './components/Footer';
import Header from './components/Header';
import SearchForm from './components/SearchForm';
import JobItemContent from './components/JobItemContent';
import Sidebar from './components/Sidebar';
import JobList from './components/JobList';
import { useActiveId, useJobItem, useJobItems } from './lib/hooks';
import { type JobItemDetail, type JobItem } from './lib/types';
import { useDebounce } from './lib/utils';
import toast from 'react-hot-toast';
import PaginationControls from './components/PaginationControls';

function App() {
  const [searchText, setSearchText] = useState<string>('');
  const { activeId } = useActiveId();
  const debouncedSearchText = useDebounce<string>(searchText, 500);
  const [currentPage, setCurrentPage] = useState(1);

  const {
    data: jobItems,
    isLoading: isLoadingAllJobs,
    isError: errorOnFetchingAllJobItems,
  } = useJobItems(debouncedSearchText);

  const {
    data: activeJob,
    isLoading: isLoadingJobItem,
    isError: errorOnFetchingJobDetail,
  } = useJobItem(activeId);

  const numOfResults = jobItems?.length || 0;

  const length = jobItems?.length || 0;
  const limit = 7;
  const totalNumPages = Math.ceil(length / limit);
  const skip = currentPage * limit;

  const jobItemsSliced =
    jobItems?.slice((currentPage - 1) * skip, currentPage * skip) || [];

  const handleSearchText = (text: string) => {
    setSearchText(text);
  };

  const handleChangePage = (direction: 'next' | 'prev') => {
    if (direction === 'next') {
      setCurrentPage((p) => p + 1);
    } else if (direction === 'prev') {
      setCurrentPage((p) => p - 1);
    }
  };

  if (errorOnFetchingAllJobItems) {
    toast.error('Error fetching all jobs');
  }

  if (errorOnFetchingJobDetail) {
    toast.error('Error fetching job detail');
  }

  return (
    <>
      <Background />

      <Header>
        <SearchForm
          handleSearchText={handleSearchText}
          searchText={searchText}
        />
      </Header>

      <Container>
        <Sidebar numOfResults={numOfResults}>
          <JobList
            jobItems={jobItemsSliced as JobItem[]}
            isLoading={isLoadingAllJobs}
          />
          <PaginationControls
            currentPage={currentPage}
            onClick={handleChangePage}
            totalNumPages={totalNumPages}
          />
          <></>
        </Sidebar>
        <JobItemContent
          isLoading={isLoadingJobItem}
          activeJob={activeJob as JobItemDetail}
        />
      </Container>

      <Footer />
    </>
  );
}

export default App;
