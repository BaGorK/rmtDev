import { useBookmarkContext } from '../contexts/BookmarkProvider';
import JobList from './JobList';
import Spinner from './Spinner';

export default function BookmarksPopover() {
  const { bookmarkedJobItems, isLoading } = useBookmarkContext();

  if (isLoading) {
    return (
      <div className='bookmarks-popover'>
        <Spinner />
      </div>
    );
  }


  return (
    <div className='bookmarks-popover'>
      <JobList isLoading={isLoading} jobItems={bookmarkedJobItems} />
    </div>
  );
}
