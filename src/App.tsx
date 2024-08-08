import { useState } from 'react';

import Background from './components/Background';
import Container from './components/Container';
import Footer from './components/Footer';
import Header from './components/Header';
import SearchForm from './components/SearchForm';
import JobItemContent from './components/JobItemContent';
import Sidebar from './components/Sidebar';
import JobList from './components/JobList';
import { useJobItems } from './lib/hooks';

function App() {
  const [searchText, setSearchText] = useState('');

  const { jobItemsSliced: jobItems, isLoading } = useJobItems(searchText);

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
        <Sidebar>
          <JobList jobItems={jobItems} isLoading={isLoading} />
        </Sidebar>
        <JobItemContent />
      </Container>

      <Footer />
    </>
  );
}

export default App;
