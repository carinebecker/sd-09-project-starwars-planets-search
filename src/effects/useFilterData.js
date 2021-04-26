import { useEffect } from 'react';

const useFilterData = (data, func) => {
  useEffect(() => {
    if (data !== undefined) {
      func(data);
    }
  }, [data, func]);
};

export default useFilterData;
