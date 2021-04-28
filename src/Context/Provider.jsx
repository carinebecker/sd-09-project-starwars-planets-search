import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import StarWarsContext from './StarWarsContext';
import requestApiStarWars from '../services/requestApi';

function Provider({ children }) {
  const [data, setData] = useState([]);
  const [isFetching, setIsFetching] = useState(true);

  const [text, setText] = useState('');

  useEffect(() => {
    const fetchPlanetsFromApi = () => {
      setIsFetching(true);
      requestApiStarWars()
        .then(
          (response) => setData(response.results),
          (error) => console.log(error.message),
        )
        .finally(() => setIsFetching(false));
    };
    fetchPlanetsFromApi();
  }, []);

  // searchName based on => https://www.youtube.com/watch?v=d1r0aK5awWk
  const searchName = ((rows) => {
    const ONE_LESS = -1;
    return rows.filter((row) => row.name.toLowerCase().indexOf(text) > ONE_LESS);
  });

  const contextStarWars = {
    isFetching,
    data,
    text,
    setText,
    searchName,
  };

  return (
    <StarWarsContext.Provider
      value={ contextStarWars }
    >
      { children }
    </StarWarsContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
