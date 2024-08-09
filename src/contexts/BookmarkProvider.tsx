/* eslint-disable react-refresh/only-export-components */
import { createContext, type ReactNode, useContext, useState } from 'react';

type BookmarkContextValue = {
  bookmarkedIds: number[];
  handleToggleBookmark: (id: number) => void;
};

const BookmarkContext = createContext<BookmarkContextValue | null>(null);

function BookmarkProvider({ children }: { children: ReactNode }) {
  const [bookmarkedIds, setBookmarkedIds] = useState<number[]>([]);

  const handleToggleBookmark = (id: number) => {
    if (bookmarkedIds?.includes(id)) {
      setBookmarkedIds((prev) => prev.filter((item) => item !== id));
    } else {
      setBookmarkedIds((prev) => [...prev, id]);
    }
  };
  return (
    <BookmarkContext.Provider value={{ bookmarkedIds, handleToggleBookmark }}>
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
