import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { fetchPlanets } from '../services/fetchPlanets';
import PlanetContext from './PlanetContext';

const PlanetProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [name, setName] = useState('');
  const [filterClicked, setFilterClicked] = useState(false);
  const [filterByNumericValues, setFilterByNumericValues] = useState([]);

  const contextValue = {
    data,
    filters: {
      filterByName: {
        name,
      },
      filterByNumericValues,
    },
    setData,
    setName,
    setFilterByNumericValues,
  };

  const fetchData = async () => {
    const response = await fetchPlanets();
    setData(response);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <PlanetContext.Provider value={ { contextValue, filterClicked, setFilterClicked } }>
      { children }
    </PlanetContext.Provider>
  );
};

PlanetProvider.propTypes = {
  children: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default PlanetProvider;
