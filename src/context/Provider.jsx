import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import PlanetsContext from './PlanetsContext';
import fetchPlanets from '../services/fetchPlanets';

function Provider({ children }) {
  const initialState = {
    data: [],
    loading: true,
    filters: {
      filterByName: {
        name: '',
      },
      filterByNumericValues: [
        {
          column: '',
          comparison: '',
          value: '0',
        },
      ],
    },
  };

  const [state, setState] = useState(initialState);

  function handleChange({ name, value }) {
    setState((prevState) => ({
      ...prevState,
      filters: {
        ...prevState.filters,
        filterByName: {
          ...prevState.filterByName,
          [name]: value,
        },
      },
    }));
  }

  function handleDropdown({ name, value }) {
    setState((prevState) => ({
      ...prevState,
      filters: {
        ...prevState.filters,
        filterByNumericValues: [{
          ...prevState.filters.filterByNumericValues[0],
          [name]: value,
        }],
      },
    }));
  }

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
    handleChange,
    handleDropdown,
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
