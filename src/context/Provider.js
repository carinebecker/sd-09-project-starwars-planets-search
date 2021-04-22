import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import StarWarsContext from './StarWarsContext';
import getPlanets from '../service/starWarsAPI';

const Provider = ({ children }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    filterByName: {
      name: '',
    },
    filterByNumericValues: [],
    order: {
      column: 'name',
      sort: 'ASC',
    },
  });

  const getName = (name) => (
    setFilters({ ...filters, filterByName: { name } })
  );

  const getNumericFilters = (columnFilters) => (
    setFilters({
      ...filters,
      filterByNumericValues: [...filters.filterByNumericValues, columnFilters],
    })
  );

  const deleteNumercFilter = (columnFilters) => (
    setFilters({
      ...filters,
      filterByNumericValues: columnFilters,
    })
  );

  const getSortFilter = (sortFilter) => (
    setFilters({
      ...filters,
      order: sortFilter,
    })
  );

  const getData = async () => {
    const planets = await getPlanets();
    setData(planets);
    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  const contextValue = {
    data,
    loading,
    getName,
    filters,
    getNumericFilters,
    deleteNumercFilter,
    getSortFilter,
  };
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
