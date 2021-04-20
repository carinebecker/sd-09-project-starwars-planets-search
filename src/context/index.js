import React, { createContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import fetchPlanetsData from '../services';

const initialContext = {
  isFetchingPlanets: true,
  data: [],
};

const PlanetSearchContext = createContext(initialContext);

const PlanetSearchProvider = ({ children }) => {
  const [isFetchingPlanets, setFetchStatus] = useState(true);
  const [data, setPlanetsData] = useState([]);

  useEffect(
    () => {
      setFetchStatus(true);
      fetchPlanetsData().then(({ results }) => {
        setPlanetsData(results);
        setFetchStatus(false);
      });
    },
    [setFetchStatus, setPlanetsData],
  );

  const context = { isFetchingPlanets, data };

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
