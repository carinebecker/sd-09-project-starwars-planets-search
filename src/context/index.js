import React, { createContext } from 'react';
import PropTypes from 'prop-types';

const initialContext = {
  isFetchingPlanets: true,
  data: [],
};

const PlanetSearchContext = createContext(initialContext);

const PlanetSearchProvider = ({ children }) => (
  <PlanetSearchContext.Provider value={ initialContext }>
    { children }
  </PlanetSearchContext.Provider>
);

export {
  PlanetSearchContext,
  PlanetSearchProvider as Provider,
};

PlanetSearchProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
