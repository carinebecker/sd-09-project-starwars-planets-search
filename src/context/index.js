import React, { createContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import fetchPlanetsData from '../services';

const initialContext = {
  isFetchingPlanets: true,
  data: [],
  filters: {
    filterByName: {
      name: '',
    },
  },
};

const INITIAL_FETCHING = true;
const INITIAL_DATA = [];
const INITIAL_FILTERS = {
  filterByName: {
    name: '',
  },
};

const PlanetSearchContext = createContext(initialContext);

const PlanetSearchProvider = ({ children }) => {
  const [isFetchingPlanets, setFetchStatus] = useState(INITIAL_FETCHING);
  const [apiData, setApiData] = useState(INITIAL_DATA);
  const [data, setPlanetsData] = useState(INITIAL_DATA);
  const [filters, setFilters] = useState(INITIAL_FILTERS);

  useEffect(
    () => {
      setFetchStatus(true);
      fetchPlanetsData().then(({ results }) => {
        setApiData(results);
        setPlanetsData(results);
        setFetchStatus(false);
      });
    },
    [setFetchStatus, setPlanetsData],
  );

  const updateFilterByName = ({ target: { value: name } }) => {
    setFilters((currentFilters) => ({
      ...currentFilters,
      filterByName: { name },
    }));
  };

  const context = {
    isFetchingPlanets,
    apiData,
    data,
    setPlanetsData,
    filters,
    updateFilterByName,
  };

  return (
    <PlanetSearchContext.Provider value={ context }>
      { children }
    </PlanetSearchContext.Provider>
  );
};

export {
  PlanetSearchContext,
  PlanetSearchProvider as Provider,
};

PlanetSearchProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
