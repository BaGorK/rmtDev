import { createPortal } from 'react-dom';
import { forwardRef } from 'react';

import { useBookmarkContext } from '../contexts/BookmarkProvider';
import JobList from './JobList';

const BookmarksPopover = forwardRef<HTMLDivElement>((_, ref) => {
  const { bookmarkedJobItems, isLoading } = useBookmarkContext();

  return createPortal(
    <div ref={ref} className='bookmarks-popover'>
      <JobList isLoading={isLoading} jobItems={bookmarkedJobItems} />
    </div>,
    document.querySelector('#modal')!
  );
});

export default BookmarksPopover;
