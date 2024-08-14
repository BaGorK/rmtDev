import { forwardRef } from 'react';
import { useBookmarkContext } from '../contexts/BookmarkProvider';
import JobList from './JobList';

const BookmarksPopover = forwardRef<HTMLDivElement>((_, ref) => {
  const { bookmarkedJobItems, isLoading } = useBookmarkContext();

  return (
    <div ref={ref} className='bookmarks-popover'>
      <JobList isLoading={isLoading} jobItems={bookmarkedJobItems} />
    </div>
  );
});

export default BookmarksPopover;
