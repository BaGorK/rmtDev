/* eslint-disable react-refresh/only-export-components */
import { createContext, type ReactNode, useContext } from 'react';
import { useJobItems } from '../lib/hooks';
import { type JobItemDetail } from '../lib/types';
import { useLocalStorage } from '../lib/useLocalStorage';

type BookmarkContextValue = {
  bookmarkedIds: number[];
  handleToggleBookmark: (id: number) => void;
  bookmarkedJobItems: JobItemDetail[];
  isLoading: boolean;
};

const BookmarkContext = createContext<BookmarkContextValue | null>(null);

function BookmarkProvider({ children }: { children: ReactNode }) {
  const [bookmarkedIds, setBookmarkedIds] = useLocalStorage<number[]>(
    'bookmarkedIds',
    []
  );
  const { data: bookmarkedJobItems, isLoading } = useJobItems(bookmarkedIds);

  const handleToggleBookmark = (id: number) => {
    if (bookmarkedIds?.includes(id)) {
      setBookmarkedIds((prev) => prev.filter((item) => item !== id));
    } else {
      setBookmarkedIds((prev) => [...prev, id]);
    }
  };

  return (
    <BookmarkContext.Provider
      value={{
        bookmarkedIds,
        handleToggleBookmark,
        bookmarkedJobItems,
        isLoading,
      }}
    >
      {children}
    </BookmarkContext.Provider>
  );
}

export const useBookmarkContext = () => {
  const ctx = useContext(BookmarkContext);

  if (!ctx) throw new Error('bookmark context used outside of the scope');

  return ctx;
};

export default BookmarkProvider;
