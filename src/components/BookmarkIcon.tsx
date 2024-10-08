import { BookmarkFilledIcon } from '@radix-ui/react-icons';
import { useBookmarkContext } from '../contexts/BookmarkProvider';

export default function BookmarkIcon({ id }: { id: number }) {
  const { handleToggleBookmark, bookmarkedIds } = useBookmarkContext();

  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();

        handleToggleBookmark(id);
      }}
      className='bookmark-btn'
    >
      <BookmarkFilledIcon
        className={`${bookmarkedIds.includes(id) ? 'filled' : ''}`}
      />
    </button>
  );
}
