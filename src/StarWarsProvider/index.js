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

  const contextValue = {
    data,
    planetsToFilter,
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
