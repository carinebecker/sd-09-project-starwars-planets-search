import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import getPlanets from '../services/planets';
import PlanetsContext from './PlanetsContext';

const PlanetsProvider = ({ children }) => {
  const [data, dispatchData] = useState({
    isFetched: false,
    data: {},
  });

  useEffect(() => {
    if (!data.isFetched) {
      (async () => {
        const planets = await getPlanets();
        dispatchData({
          isFetched: true,
          data: planets.results,
        });
      })();
    }
  });

  return (
    <PlanetsContext.Provider value={ data }>
      { children }
    </PlanetsContext.Provider>
  );
};

PlanetsProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node]).isRequired,
};

export default PlanetsProvider;
