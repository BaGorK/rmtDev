import React from 'react';
import PaginationControls from './PaginationControls';
import ResultsCount from './ResultsCount';
import SortingControls from './SortingControls';

export default function Sidebar({ children }: { children: React.ReactNode }) {
  return (
    <div className='sidebar'>
      <div className='sidebar__top'>
        <ResultsCount />
        <SortingControls />
      </div>

      {children}

      <PaginationControls />
    </div>
  );
}
