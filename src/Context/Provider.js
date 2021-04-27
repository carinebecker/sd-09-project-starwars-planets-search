import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import StarWarsContext from './StarWarsContext';
import requestApiStarWars from '../services/requestApi';

function Provider({ children }) {
  const [data, setData] = useState([]);
  const [isFetching, setIsFetching] = useState(true);
  const [filters, setFilters] = useState({});
  const [filteredPlanets, setFilteredPlanets] = useState([]);

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

  const contextStarWars = {
    isFetching,
    data,
    filters,
    setFilters,
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
