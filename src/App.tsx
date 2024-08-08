import { useState } from 'react';

import Background from './components/Background';
import Container from './components/Container';
import Footer from './components/Footer';
import Header from './components/Header';
import SearchForm from './components/SearchForm';
import JobItemContent from './components/JobItemContent';
import Sidebar from './components/Sidebar';
import JobList from './components/JobList';
import { useActiveId, useDebounce, useJobItem, useJobItems } from './lib/hooks';

function App() {
  const [searchText, setSearchText] = useState<string>('');
  const { activeId } = useActiveId();
  const debouncedSearchText = useDebounce<string>(searchText, 500);
  const {
    jobItemsSliced: jobItems,
    numOfResults,
    isLoading: isLoadingAllJobs,
  } = useJobItems(debouncedSearchText);

  const { activeJob, isLoading: isLoadingJobItem } = useJobItem(activeId);

  const handleSearchText = (text: string) => {
    setSearchText(text);
  };

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
          <JobList jobItems={jobItems} isLoading={isLoadingAllJobs} />
        </Sidebar>
        <JobItemContent isLoading={isLoadingJobItem} activeJob={activeJob} />
      </Container>

      <Footer />
    </>
  );
}

export default App;
