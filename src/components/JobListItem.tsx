import { useActiveId } from '../lib/hooks';
import { type JobItem } from '../lib/types';
import BookmarkIcon from './BookmarkIcon';

type JobListItemProps = {
  jobItem: JobItem;
};

export default function JobListItem({ jobItem }: JobListItemProps) {
  const {activeId} = useActiveId();

  return (
    <li
      className={`job-item ${
        activeId ? activeId === jobItem.id && 'job-item--active' : ''
      }`}
    >
      <a className='job-item__link' href={`#${jobItem.id}`}>
        <div className='job-item__badge'>{jobItem.badgeLetters}</div>

        <div className='job-item__middle'>
          <h3 className='third-heading'>{jobItem.title}</h3>
          <p className='job-item__company'>{jobItem.company}</p>
        </div>

        <div className='job-item__right'>
          <BookmarkIcon />
          <time className='job-item__time'>{`${jobItem.daysAgo}d`}</time>
        </div>
      </a>
    </li>
  );
}
