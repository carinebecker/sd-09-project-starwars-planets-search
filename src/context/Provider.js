import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import StarWarsContext from './StarWarsContext';
import getStarWarsData from '../services/starWarsAPI';

const Provider = ({ children }) => {
  const [data, setData] = useState([]);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    setIsFetching(true);
    async function fetchData() {
      const dataStarWars = await getStarWarsData();
      setData(dataStarWars);
      setIsFetching(false);
    }
    fetchData();
  }, []);

  const context = {
    data,
    isFetching,
  };

  return (
    <StarWarsContext.Provider
      value={ context }
    >
      { children}
    </StarWarsContext.Provider>

  );
};

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
