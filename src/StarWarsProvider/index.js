import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import SWContext from '../StarWarsContext';
import services from '../services';
import utils from '../utils';

function Provider({ children }) {
  const [data, setData] = useState({});
  const [planetsToFilter, setPlanetsToFilter] = useState([]);

  const [filters, setFilters] = useState({
    filterByName: {
      name: '',
    },
    filterByNumericValues: [],
  });

  useEffect(() => {
    async function getData() {
      const dataFromApi = await services.fetchData();
      setData(dataFromApi);
      setPlanetsToFilter(dataFromApi.results);
    }
    getData();
  }, []);

  useEffect(() => {
    const { name } = filters.filterByName;
    const { filterByName } = utils;
    const filteredPlanets = filterByName(data.results, name);
    setPlanetsToFilter(filteredPlanets);
  }, [filters.filterByName]);

  useEffect(() => {
    const { filterByNumbers } = utils;
    if (filters.filterByNumericValues.length === 0) {
      setPlanetsToFilter(data.results);
    } else {
      const filteredPlanets = filterByNumbers(
        data.results, filters.filterByNumericValues,
      );
      setPlanetsToFilter(filteredPlanets);
    }
  }, [filters.filterByNumericValues]);

  const contextValue = {
    data,
    planetsToFilter,
    filters,
    setFilters,
  };

  return (
    <SWContext.Provider value={ contextValue }>
      {children}
    </SWContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.element.isRequired,
};

export default Provider;
