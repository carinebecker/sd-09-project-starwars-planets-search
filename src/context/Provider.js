import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import StarWarsContext from './StarWarsContext';
import { getStarWarsData } from '../services/starWarsAPI';

const Provider = ({ children }) => {
  const [data, setData] = useState([]);
  const [dataFilter, setDataFilter] = useState([]);
  const [filters, setFilters] = useState({ filterByName: { name: '' } });

  const getData = async () => {
    const dataStarWars = await getStarWarsData();
    setData(dataStarWars);
    setDataFilter(dataStarWars);
  };

  function saveFilters({ target }) {
    const { value } = target;
    setFilters({
      filterByName: {
        name: value.toLowerCase(),
      } });
  }

  useEffect(() => {
    const newData = data.filter(({ name }) => name.toLowerCase()
      .includes(filters.filterByName.name.toLowerCase()));
    setDataFilter(newData);
  }, [data, filters]);

  useEffect(() => {
    getData();
  }, []);

  const context = {
    dataFilter,
    filters,
    saveFilters,
  };

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
