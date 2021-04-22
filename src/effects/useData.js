import { useEffect } from 'react';

const useData = (data, func) => {
  useEffect(() => {
    if (data === undefined) {
      func();
    }
  }, [data, func]);
};

export default useData;
