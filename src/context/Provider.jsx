import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import StarWarsContext from './StarWarsContext';
import fetchPlanets from '../services/fetchPlanets';

function Provider({ children }) {
  const initialState = {
    data: [],
    isLoading: true,
    filters: {
      filterByName: {
        name: '',
      },
      filterByNumericValues: [{
        column: '',
        comparison: '',
        value: '0',
      }],
    },
  };

  const [state, setState] = useState(initialState);
  const [columnOptions] = useState([
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ]);

  useEffect(() => {
    async function getPlanetsFromAPI() {
      const response = await fetchPlanets();
      setState((last) => ({ ...last, data: response, isLoading: false }));
    }
    getPlanetsFromAPI();
  }, []);

  function handleInput({ name, value }) {
    setState((lastState) => ({
      ...lastState,
      filters: {
        ...lastState.filters,
        filterByName: {
          ...lastState.filterByName,
          [name]: value,
        },
      },
    }));
  }

  function handleFilteredInputs(object) {
    // setColumnOptions(columnOptions
    //   .filter((option) => option !== state.filters.filterByNumericValues[0].column));
    setState((lastState) => ({
      ...lastState,
      filters: {
        ...lastState.filters,
        filterByNumericValues: [object],
      },
    }));
    // console.log(state.filters.filterByNumericValues);
  }

  const context = {
    ...state,
    columnOptions,
    handleInput,
    handleFilteredInputs,
  };

  return (
    <StarWarsContext.Provider value={ context }>
      {children}
    </StarWarsContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
