import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import PlanetsContext from './PlanetsContext';
import fetchPlanets from '../services/fetchPlanets';

function Provider({ children }) {
  const initialState = {
    data: [],
    loading: true,
  };

  const [state, setState] = useState(initialState);

  useEffect(() => {
    async function planetsFromAPI() {
      const response = await fetchPlanets();
      setState((prevState) => ({
        ...prevState,
        data: response,
        loading: false,
      }));
    }
    planetsFromAPI();
  }, []);

  const context = {
    ...state,
  };

  return (
    <PlanetsContext.Provider value={ context }>
      {children}
    </PlanetsContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
