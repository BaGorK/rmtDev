import { type SortBy } from '../lib/types';

type Props = {
  onClick: (sort: 'relevant' | 'recent') => void;
  sortBy: SortBy;
};
export default function SortingControls({ onClick, sortBy }: Props) {
  return (
    <section className='sorting'>
      <i className='fa-solid fa-arrow-down-short-wide'></i>

      <button
        onClick={() => onClick('relevant')}
        className={`sorting__button sorting__button--relevant ${
          sortBy === 'relevant' ? 'sorting__button--active' : ''
        }`}
      >
        Relevant
      </button>

      <button
        onClick={() => onClick('recent')}
        className={`sorting__button sorting__button--recent ${
          sortBy === 'recent' ? 'sorting__button--active' : ''
        }`}
      >
        Recent
      </button>
    </section>
  );
}
