import React from 'react';

type SearchFormProps = {
  searchText: string;
  handleSearchText: (text: string) => void;
};

export default function SearchForm({
  handleSearchText,
  searchText,
}: SearchFormProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit} className='search'>
      <button
        type='submit'
        // onClick={e => console.log(e)}
        // e: React.MouseEvent<HTMLButtonElement, MouseEvent>
      >
        <i className='fa-solid fa-magnifying-glass'></i>
      </button>

      <input
        value={searchText}
        // e: React.ChangeEvent<HTMLInputElement>
        onChange={(e) => handleSearchText(e.target.value)}
        spellCheck='false'
        type='text'
        required
        placeholder='Find remote developer jobs...'
      />
    </form>
  );
}
