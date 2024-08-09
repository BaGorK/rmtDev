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

function App() {
  const [searchText, setSearchText] = useState<string>('');
  const { activeId } = useActiveId();
  const debouncedSearchText = useDebounce<string>(searchText, 500);

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

  const handleSearchText = (text: string) => {
    setSearchText(text);
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
        <Sidebar numOfResults={jobItems?.length}>
          <JobList
            jobItems={jobItems as JobItem[]}
            isLoading={isLoadingAllJobs}
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
