export default function ResultsCount({
  numOfResults,
}: {
  numOfResults: number;
}) {
  return (
    <p className='count'>
      <span className='u-bold'>{numOfResults}</span> results
    </p>
  );
}
