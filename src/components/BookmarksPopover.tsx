import { useBookmarkContext } from '../contexts/BookmarkProvider';
import JobList from './JobList';

export default function BookmarksPopover() {
  const { bookmarkedJobItems, isLoading } = useBookmarkContext();

  return (
    <div className='bookmarks-popover'>
      <JobList isLoading={isLoading} jobItems={bookmarkedJobItems} />
    </div>
  );
}
