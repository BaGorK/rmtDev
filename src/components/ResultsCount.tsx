export default function ResultsCount({
  numOfResults,
}: {
  numOfResults: number;
}) {
  return (
    <p className='count'>
      <span className="u-bold">{numOfResults || 0}</span> results
    </p>
  );
}
