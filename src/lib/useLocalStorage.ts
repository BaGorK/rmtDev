import { useEffect, useState } from 'react';

export const useLocalStorage = <T>(
  key: string,
  initialValue: T
): [T, React.Dispatch<React.SetStateAction<T>>] => {
  const [value, setValue] = useState<T>(() =>
    JSON.parse(
      (localStorage.getItem(key) !== 'null' && localStorage.getItem(key)) ||
        JSON.stringify(initialValue)
    )
  );

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value, key, initialValue]);

  return [value, setValue] as const;
};
