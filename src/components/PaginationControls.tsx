import { ArrowLeftIcon, ArrowRightIcon } from '@radix-ui/react-icons';
import { type PaginationDirection } from '../lib/types';

type Props = {
  onClick: (direction: PaginationDirection) => void;
  currentPage: number;
  totalNumPages: number;
};

export default function PaginationControls({
  onClick,
  currentPage,
  totalNumPages,
}: Props) {
  return (
    <section className='pagination'>
      {currentPage > 1 ? (
        <button
          onClick={(e) => {
            e.currentTarget.blur();
            onClick('prev');
          }}
          className='pagination__button'
        >
          <ArrowLeftIcon />
          {`Page ${currentPage - 1}`}
        </button>
      ) : (
        <div></div>
      )}
      {currentPage < totalNumPages ? (
        <button
          onClick={(e) => {
            e.currentTarget.blur();
            onClick('next');
          }}
          className='pagination__button'
        >
          {`Page ${currentPage + 1}`}
          <ArrowRightIcon />
        </button>
      ) : (
        <div></div>
      )}
    </section>
  );
}
