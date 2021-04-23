import { useEffect } from 'react';

const useFetchPlanets = (func) => {
  useEffect(() => {
    func();
  }, [func]);
};

export default useFetchPlanets;
