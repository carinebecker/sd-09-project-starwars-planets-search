import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import StarWarsContext from './StarWarsContext';
import { getStarWarsData } from '../services/starWarsAPI';

const Provider = ({ children }) => {
  const [data, setData] = useState([]);

  const getData = async () => {
    const dataStarWars = await getStarWarsData();
    setData(dataStarWars);
  };

  useEffect(() => {
    getData();
  }, []);

  const context = { data };

  return (
    <StarWarsContext.Provider
      value={ context }
    >
      { children }
    </StarWarsContext.Provider>

  );
};

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
