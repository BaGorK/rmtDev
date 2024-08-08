import React from 'react';
import BookmarksButton from './BookmarksButton';
import Logo from './Logo';

type Prop = {
  children: React.ReactNode;
};

export default function Header({ children }: Prop) {
  return (
    <header className='header'>
      <div className='header__top'>
        <Logo />
        <BookmarksButton />
      </div>

      {children}
    </header>
  );
}
