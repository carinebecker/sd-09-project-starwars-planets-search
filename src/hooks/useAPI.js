import { useEffect, useContext } from 'react';
import { DataContext } from '../context/DataContext';

import fetchStars, { abortController } from '../services/starwarsAPI';

function useAPI(endpoint = '') {
  const { data, setData } = useContext(DataContext);

  useEffect(() => {
    fetchStars().then((response) => {
      setData({ data: response });
    });
    return () => abortController.abort();
  }, [endpoint]);

  return data;
}

export default useAPI;
