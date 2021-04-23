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

  // function handleDropdownInput({ name, value }) {
  //   setState((lastState) => ({
  //     ...lastState,
  //     filters: {
  //       ...lastState.filters,
  //       filterByNumericValues: [
  //         {
  //           ...lastState.filters.filterByNumericValues[0],
  //           [name]: value,
  //         },
  //       ],
  //     },
  //   }));
  // }

  function handleFilteredInputs(object) {
    setState((lastState) => ({
      ...lastState,
      filters: {
        ...lastState.filters,
        filterByNumericValues: [object],
      },
    }));
  }

  const context = {
    ...state,
    handleInput,
    // handleDropdownInput,
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
