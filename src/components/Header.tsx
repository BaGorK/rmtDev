import React from 'react';

type Prop = {
  children: React.ReactNode;
};

export default function Header({ children }: Prop) {
  return (
    <header className='header'>
      

      {children}
    </header>
  );
}
