import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import StarWarsContext from './StarWarsContext';
import getPlanets from '../service/starWarsAPI';

const Provider = ({ children }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const objFilter = {
    filterByName: {
      name: '',
    },
  };
  const [filters, setFilters] = useState(objFilter);

  const getName = (name) => {
    const objToFilter = { ...filters, filterByName: { name } };
    setFilters(objToFilter);
  };

  const getData = async () => {
    const planets = await getPlanets();
    setData(planets);
    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  const contextValue = { data, loading, getName, filters };
  return (
    <StarWarsContext.Provider value={ contextValue }>
      {children}
    </StarWarsContext.Provider>
  );
};

Provider.propTypes = {
  children: PropTypes.node,
}.isRequired;

export default Provider;
