import React from 'react';
import ResultsCount from './ResultsCount';
import SortingControls from './SortingControls';

export default function Sidebar({
  children,
  numOfResults = 0,
}: {
  children: React.ReactNode;
  numOfResults?: number;
}) {
  return (
    <div className='sidebar'>
      <div className='sidebar__top'>
        <ResultsCount numOfResults={numOfResults} />
        <SortingControls />
      </div>

      {children}
    </div>
  );
}
